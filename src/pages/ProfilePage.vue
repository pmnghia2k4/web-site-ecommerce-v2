<template>
  <section class="mx-auto max-w-4xl px-4">
    <button @click="goBack" class="mb-4 text-sm text-gray-500 hover:underline">
      ← Quay lại
    </button>

    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- Phần Avatar -->
      <div class="flex flex-col items-center">
        <h2 class="mb-4 text-lg font-semibold">Ảnh đại diện</h2>
        
        <div class="relative group">
          <!-- Avatar hiển thị -->
          <img
            :src="avatarPreview || defaultAvatar"
            alt="Avatar"
            class="h-48 w-48 rounded-full object-cover border-4 border-gray-200 shadow-lg"
          />

          <!-- Nút thay đổi ảnh (hiện khi hover) -->
          <label
            class="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <span class="text-white font-medium">Thay đổi</span>
            <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              class="hidden"
            />
          </label>
        </div>

        <p class="mt-3 text-sm text-gray-500">
          {{ avatarPreview ? 'Nhấn vào để thay đổi' : 'Nhấn để tải lên ảnh đại diện' }}
        </p>
      </div>

      <!-- Form thông tin cá nhân -->
      <form
        @submit.prevent="handleupdate"
        class="flex-1 space-y-4 rounded-lg border p-6 dark:border-gray-800"
      >
        <h1 class="text-xl font-semibold">Thông tin cá nhân</h1>
        
        <InputField v-model="form.name" label="Tên đăng nhập" />
        <InputField v-model="form.email" label="Email" type="email" />
        <InputField v-model="form.fullName" label="Tên đầy đủ" />
        <InputField v-model="form.phone" label="Số điện thoại" type="tel" />

        <button
          type="submit"
          class="w-full rounded bg-gray-900 px-4 py-2.5 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200 transition"
          :disabled="isUpdating"
        >
          {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật hồ sơ' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useUIStore } from "../stores/ui";
import { useRouter } from "vue-router";
import InputField from "../components/forms/InputField.vue";
import { UpdateProfile, UpdateUserAvatar } from "../utils/user_service_api";

// Avatar mặc định (Pepe OK siêu ngầu)
import defaultAvatar from "@/assets/default_user.jpg"; 

const user = useUserStore();
const ui = useUIStore();
const router = useRouter();
const isUpdating = ref(false);

// Xem trước avatar khi chọn file
// const avatarPreview = ref(user.profile?.avatar_url || "");
const avatarPreview = computed(() => {
  if (!user.profile?.avatar_url) return defaultAvatar;
  return `http://localhost:3001${user.profile.avatar_url}`;
});
const avatarFile = ref(null); // File để gửi lên server

const form = reactive({
  name: user.profile?.username ?? "",
  email: user.profile?.email ?? "",
  fullName: user.profile?.fullname ?? "",
  phone: user.profile?.phone ?? "",
});

// Khi người dùng chọn ảnh
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  }
  uploadAvatar();
};

// Hàm upload avatar riêng biệt
const uploadAvatar = async () => {
  if (!avatarFile.value) return;

  isUpdating.value = true;
  try {
    const res = await UpdateUserAvatar(user.profile.id, avatarFile.value, user.token);

    if (res.data.success) {
      // Cập nhật store → watch currentAvatarUrl sẽ tự động đổi preview
      user.updateProfile({
        avatar_url: res.data.data.avatar_url
      });

      ui.pushToast({ type: "success", message: "Đổi ảnh đại diện thành công!" });
    }
  } catch (err) {
    ui.pushToast({
      type: "error",
      message: err.response?.data?.message || "Đổi ảnh thất bại"
    });
    // Nếu lỗi → quay lại ảnh cũ
    avatarPreview.value = currentAvatarUrl.value;
  } finally {
    isUpdating.value = false;
    avatarFile.value = null; // reset để lần sau vẫn trigger onChange
  }
};

const handleupdate = async () => {
  isUpdating.value = true;
  try {
    // Tạo FormData để gửi cả text + file
    const formData = new FormData();
    formData.append("username", form.name);
    formData.append("email", form.email);
    formData.append("full_name", form.fullName);
    formData.append("phone", form.phone);
    
    // if (avatarFile.value) {
    //   formData.append("avatar", avatarFile.value);
    // }

    const res = await UpdateProfile(user.profile.id, formData, user.token);
    const result = res.data;

    if (result.success) {
      // Cập nhật store
      user.updateProfile({
        username: result.data.username,
        email: result.data.email,
        fullname: result.data.full_name,
        phone: result.data.phone,
        avatar_url: result.data.avatar_url 
        // || avatarPreview.value,
      });

      // Xóa file tạm nếu thành công
      avatarFile.value = null;

      ui.pushToast({ type: "success", message: "Cập nhật hồ sơ thành công!" });
    } else {
      ui.pushToast({
        type: "error",
        message: result.message || "Cập nhật thất bại",
      });
    }
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    ui.pushToast({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại" });
  } finally {
    isUpdating.value = false;
  }
};

function goBack() {
  router.back();
}
</script>

<style scoped>
/* Tùy chỉnh thêm nếu cần */
</style>
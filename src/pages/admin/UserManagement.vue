<template>
  <h1 class="mb-4 text-xl font-semibold">Quản lý người dùng</h1>

  <!-- Loading state -->
  <div v-if="loading" class="py-10 text-center text-gray-500">
    Đang tải danh sách người dùng...
  </div>

  <!-- Bảng dữ liệu -->
  <div v-else class="overflow-x-auto rounded-lg border dark:border-gray-800">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-left dark:bg-gray-900">
        <tr>
          <th class="p-3">ID</th>
          <th class="p-3">Tên</th>
          <th class="p-3">Email</th>
          <th class="p-3">Vai trò</th>
          <th class="p-3">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id" class="border-t dark:border-gray-800">
          <td class="p-3">#{{ u.id }}</td>
          <!-- Sửa lỗi: dùng full_name hoặc username -->
          <td class="p-3">{{ u.full_name || u.username }}</td>
          <td class="p-3">{{ u.email }}</td>
          <td class="p-3">
            <span class="px-2 py-1 rounded text-xs font-medium"
              :class="u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'">
              {{ u.role }}
            </span>
          </td>
          <td class="p-3">
            <div class="flex items-center gap-2">
              <button @click="handlePromote(u)"
                class="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7M12 3v18"/>
                </svg>
                Thăng cấp
              </button>

              <button @click="handleDelete(u)"
                class="flex items-center gap-2 rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-100">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"/>
                </svg>
                Xóa
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ← Chỉ import 1 lần
import { useUIStore } from '../../stores/ui';
import { useUserStore } from '../../stores/user';
import { getlistuser } from '../../utils/user_service_api.js';
import { updateUserRole, deleteUser } from '../../utils/user_service_api.js';
const ui = useUIStore();
const userStore = useUserStore();

// Khai báo state
const users = ref([]);
const loading = ref(true); // ← Thêm loading để UX đẹp hơn

// Hàm lấy danh sách user
const ListUser = async () => {
  loading.value = true;
  try {
    const res = await getlistuser(userStore.token);
    if (res.data.success) {
      users.value = res.data.data; // ← API trả về mảng ở res.data.data
	  // Trong ListUser(), sau khi gán dữ liệu sort theo ID tăng dần:
      users.value = res.data.data.sort((a, b) => a.id - b.id);
    } else {
      ui.pushToast({ type: 'error', message: res.data.message || 'Lỗi tải dữ liệu' });
    }
  } catch (error) {
    ui.pushToast({ type: 'error', message: 'Không kết nối được server' });
  } finally {
    loading.value = false;
  }
};

// TỰ ĐỘNG TẢI KHI VÀO TRANG – Chỉ gọi 1 lần!
onMounted(() => {
  ListUser();
});

// Tạm thời chỉ đổi trên frontend (sau này sẽ gọi API thật)
// function promote(u) {
  
//   ui.pushToast({ type: 'success', message: `Đã thăng cấp ${u.full_name || u.username} thành Admin` });
// }

const handlePromote = async (user) => {
  try {
    const res = await updateUserRole(user.id, { role: "admin" }, userStore.token);
    if (res.data.success) {
      ui.pushToast({ type: 'success', message: `Đã thăng cấp ${user.id|| user.username} thành Admin` });
      await ListUser(); // Cập nhật lại danh sách người dùng
    } else {
      ui.pushToast({ type: 'error', message: res.data.message || 'Lỗi thăng cấp người dùng' });
    }
  } catch (error) {
    ui.pushToast({ type: 'error', message: 'Không kết nối được server' });
  }
};

// function deleteUser(u) {
//   ui.pushToast({ type: 'success', message: `Đã xóa ${u.full_name || u.username}` });
// }
const handleDelete = async (user) => {
  try {
    const res = await deleteUser(user.id, userStore.token);
    if (res.data.success) {
      ui.pushToast({ type: 'success', message: `Đã xóa ${user.id || user.username}` });
      await ListUser(); // Cập nhật lại danh sách người dùng
    } else {
      ui.pushToast({ type: 'error', message: res.data.message || 'Lỗi xóa người dùng' });
    }
  } catch (error) {
    ui.pushToast({ type: 'error', message: 'Không kết nối được server' });
  }
};
</script>
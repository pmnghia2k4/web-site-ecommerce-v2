<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Quản lý banner</h1>
				<p class="mt-1 text-gray-600 dark:text-gray-400">Quản lý hình ảnh và video banner</p>
			</div>
			<button 
				@click="openCreateModal"
				class="rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 px-4 py-2 text-white font-medium transition-colors"
			>
				+ Thêm banner
			</button>
		</div>

		<!-- Banner Grid -->
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<div 
				v-for="b in banners" 
				:key="b.id" 
				class="group relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow"
			>
				<!-- Media Preview -->
				<div class="relative aspect-[3/1] overflow-hidden bg-gray-200 dark:bg-gray-900">
					<img 
						v-if="b.type === 'image'"
						:src="b.media"
						:alt="b.title"
						class="w-full h-full object-cover"
					/>
					<video 
						v-else
						:src="b.media"
						class="w-full h-full object-cover"
						@mouseenter="$event.target.play()"
						@mouseleave="$event.target.pause()"
					/>
					<!-- Type Badge -->
					<span class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
						{{ b.type === 'image' ? '🖼️ Ảnh' : '🎬 Video' }}
					</span>
				</div>

				<!-- Banner Info -->
				<div class="p-3">
					<h3 class="font-medium text-gray-900 dark:text-white">{{ b.title }}</h3>
					<p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ b.description }}</p>
				</div>

				<!-- Action Buttons -->
				<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
					<button
						@click="editBanner(b)"
						class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
						title="Sửa"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
					</button>
					<button
						@click="deleteBanner(b)"
						class="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
						title="Xóa"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Create/Edit Modal -->
		<div v-if="showModal" class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div class="p-6">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
							{{ editingId ? 'Sửa banner' : 'Thêm banner mới' }}
						</h2>
						<button 
							@click="closeModal"
							class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<form @submit.prevent="saveBanner" class="space-y-4">
						<!-- Title -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiêu đề *</label>
							<input 
								v-model="formData.title"
								type="text"
								placeholder="Nhập tiêu đề banner"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>

						<!-- Description -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mô tả</label>
							<textarea 
								v-model="formData.description"
								placeholder="Nhập mô tả banner"
								rows="2"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							></textarea>
						</div>

						<!-- Media Type Selector -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loại nội dung *</label>
							<div class="flex gap-4">
								<label class="flex items-center">
									<input 
										type="radio"
										v-model="formData.type"
										value="image"
										class="mr-2"
									/>
									<span class="text-gray-700 dark:text-gray-300">🖼️ Ảnh</span>
								</label>
								<label class="flex items-center">
									<input 
										type="radio"
										v-model="formData.type"
										value="video"
										class="mr-2"
									/>
									<span class="text-gray-700 dark:text-gray-300">🎬 Video</span>
								</label>
							</div>
						</div>

						<!-- Media Upload -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{{ formData.type === 'image' ? 'Tải ảnh' : 'Tải video' }} *
							</label>

							<!-- Preview -->
							<div v-if="formData.media" class="mb-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/50">
								<img 
									v-if="formData.type === 'image'"
									:src="formData.media"
									:alt="formData.title"
									class="w-full h-40 object-cover rounded"
								/>
								<video 
									v-else
									:src="formData.media"
									controls
									class="w-full h-40 object-cover rounded"
								/>
							</div>

							<!-- Upload Options -->
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								<!-- File Upload -->
								<div>
									<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
										{{ formData.type === 'image' ? 'Tải từ máy (JPG, PNG, GIF)' : 'Tải từ máy (MP4, WebM)' }}
									</label>
									<input 
										type="file"
										:accept="formData.type === 'image' ? 'image/*' : 'video/*'"
										@change="handleMediaUpload"
										class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
									/>
									<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
										{{ formData.type === 'image' ? 'Max 5MB' : 'Max 50MB' }}
									</p>
								</div>

								<!-- URL Input -->
								<div>
									<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
										Hoặc nhập URL
									</label>
									<input 
										v-model="formData.media"
										type="url"
										:placeholder="formData.type === 'image' ? 'https://...' : 'https://...'"
										class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>

						<!-- Link (Optional) -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Liên kết (tuỳ chọn)</label>
							<input 
								v-model="formData.link"
								type="url"
								placeholder="https://example.com"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Người dùng sẽ được dẫn tới đây khi click banner</p>
						</div>

						<!-- Buttons -->
						<div class="flex gap-3 pt-4 border-t dark:border-gray-700">
							<button 
								type="button"
								@click="closeModal"
								class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
							>
								Hủy
							</button>
							<button 
								type="submit"
								class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
							>
								{{ editingId ? 'Cập nhật' : 'Thêm banner' }}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Delete Confirmation Modal -->
		<div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full">
				<div class="p-6">
					<div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
						<svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0a9 9 0 11-9-9m9 9a9 9 0 109-9" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">Xác nhận xóa</h3>
					<p class="text-gray-600 dark:text-gray-400 text-center mb-6">
						Bạn chắc chắn muốn xóa banner <span class="font-semibold text-gray-900 dark:text-white">"{{ bannerToDelete?.title }}"</span>?
					</p>
					<div class="flex gap-3">
						<button 
							@click="showDeleteModal = false"
							class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
						>
							Hủy
						</button>
						<button 
							@click="confirmDelete"
							class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
						>
							Xóa ngay
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import { useUIStore } from '../../stores/ui';

const ui = useUIStore();

const banners = ref([
	{ 
		id: 1, 
		title: 'Sale 11.11', 
		description: 'Giảm giá lên đến 50%',
		type: 'image',
		media: 'https://picsum.photos/1200/400?1',
		link: '/'
	},
	{ 
		id: 2, 
		title: 'Xmas Special', 
		description: 'Khuyến mãi mùa Giáng sinh',
		type: 'image',
		media: 'https://picsum.photos/1200/400?2',
		link: '/'
	}
]);

// Load persisted banners from localStorage if present
onMounted(() => {
	try {
		const raw = localStorage.getItem('admin_banners');
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) banners.value = parsed;
		}
	} catch (e) {
		console.error('Failed to load banners from localStorage', e);
	}
});

const showModal = ref(false);
const showDeleteModal = ref(false);
const editingId = ref(null);
const bannerToDelete = ref(null);

const formData = reactive({
	title: '',
	description: '',
	type: 'image',
	media: '',
	link: ''
});

function openCreateModal() {
	editingId.value = null;
	formData.title = '';
	formData.description = '';
	formData.type = 'image';
	formData.media = '';
	formData.link = '';
	showModal.value = true;
}

function editBanner(banner) {
	editingId.value = banner.id;
	formData.title = banner.title;
	formData.description = banner.description;
	formData.type = banner.type;
	formData.media = banner.media;
	formData.link = banner.link || '';
	showModal.value = true;
}

function closeModal() {
	showModal.value = false;
	editingId.value = null;
}

function handleMediaUpload(event) {
	const file = event.target.files?.[0];
	if (!file) return;

	const maxSize = formData.type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
	if (file.size > maxSize) {
		const sizeInMB = Math.round(maxSize / 1024 / 1024);
		ui.pushToast({ type: 'error', message: `File quá lớn (max ${sizeInMB}MB)` });
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		formData.media = e.target?.result || '';
		ui.pushToast({ type: 'success', message: 'Tải file thành công' });
	};
	reader.readAsDataURL(file);
}

function saveBanner() {
	if (!formData.title || !formData.media) {
		ui.pushToast({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin' });
		return;
	}

	try {
		if (editingId.value) {
			// Edit existing
			const idx = banners.value.findIndex(b => b.id === editingId.value);
			if (idx !== -1) {
				banners.value[idx] = {
					id: editingId.value,
					title: formData.title,
					description: formData.description,
					type: formData.type,
					media: formData.media,
					link: formData.link
				};
				ui.pushToast({ type: 'success', message: 'Cập nhật banner thành công' });
			}
		} else {
			// Add new
			banners.value.unshift({
				id: crypto.randomUUID(),
				title: formData.title,
				description: formData.description,
				type: formData.type,
				media: formData.media,
				link: formData.link
			});
			ui.pushToast({ type: 'success', message: 'Thêm banner thành công' });
		}

		// Save to localStorage
		localStorage.setItem('admin_banners', JSON.stringify(banners.value));
		closeModal();
	} catch (e) {
		console.error('Error saving banner:', e);
		ui.pushToast({ type: 'error', message: 'Lỗi khi lưu banner' });
	}
}

function deleteBanner(banner) {
	bannerToDelete.value = banner;
	showDeleteModal.value = true;
}

function confirmDelete() {
	if (bannerToDelete.value) {
		banners.value = banners.value.filter(b => b.id !== bannerToDelete.value.id);
		localStorage.setItem('admin_banners', JSON.stringify(banners.value));
		ui.pushToast({ type: 'success', message: 'Xóa banner thành công' });
		showDeleteModal.value = false;
		bannerToDelete.value = null;
	}
}
</script>



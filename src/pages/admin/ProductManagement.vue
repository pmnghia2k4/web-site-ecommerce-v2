<template>
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-xl font-semibold">Quản lý sản phẩm</h1>
		<button class="rounded bg-gray-900 px-3 py-2 text-white dark:bg-gray-100 dark:text-black" @click="openCreate">Thêm sản phẩm</button>
	</div>
	<div class="mb-4 grid gap-3 md:grid-cols-3">
		<InputField v-model="filters.q" placeholder="Tìm theo tên..." />
		<SelectDropdown v-model="filters.status" :options="statusOptions" />
		<button class="rounded border px-3 py-2 dark:border-gray-700" @click="load">Lọc</button>
	</div>
	<div class="overflow-x-auto rounded-lg border dark:border-gray-800">
		<table class="min-w-full text-sm">
			<thead class="bg-gray-50 text-left dark:bg-gray-900">
				<tr>
					<th class="p-3">ID</th>
					<th class="p-3">Tên</th>
					<th class="p-3">Giá</th>
					<th class="p-3">Hành động</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="p in items" :key="p.id" class="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
					<td class="p-3">#{{ p.id }}</td>
					<td class="p-3">{{ p.name }}</td>
					<td class="p-3">{{ formatCurrency(p.price) }}</td>
					<td class="p-3">
						<div class="flex items-center gap-2">
							<!-- Edit Button -->
							<button 
								@click="edit(p)"
								class="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg font-medium text-sm transition-colors"
								title="Sửa sản phẩm"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Sửa
							</button>

							<!-- Delete Button -->
							<button 
								@click="openDeleteConfirm(p)"
								class="inline-flex items-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium text-sm transition-colors"
								title="Xóa sản phẩm"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Xóa
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- Edit Product Modal -->
	<div v-if="showEditModal" class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
			<div class="p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ isCreating ? 'Thêm sản phẩm' : 'Sửa sản phẩm' }}</h2>
					<button 
						@click="closeEditModal"
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form @submit.prevent="onSubmit" class="space-y-4">
					<!-- Thư viện ảnh sản phẩm -->
					<div>
						<div class="flex items-center justify-between mb-2">
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Thư viện ảnh sản phẩm</label>
							<span class="text-xs text-gray-500 dark:text-gray-400">({{ editFormData.images?.length || 0 }}/10)</span>
						</div>

						<!-- Gallery Grid -->
						<div v-if="editFormData.images && editFormData.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
							<div 
								v-for="(img, idx) in editFormData.images"
								:key="idx"
								class="relative group"
							>
								<img 
									:src="img"
									:alt="`Ảnh ${idx + 1}`"
									class="w-full h-24 object-cover rounded-lg border-2 transition-all"
									:class="idx === editFormData.thumbnailIndex ? 'border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700' : 'border-gray-300 dark:border-gray-600'"
								/>
								<!-- Badge chính -->
								<span v-if="idx === editFormData.thumbnailIndex" class="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">Ảnh chính</span>
								
								<!-- Action buttons on hover -->
								<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center gap-2">
									<button
										type="button"
										@click="setThumbnail(idx)"
										v-if="idx !== editFormData.thumbnailIndex"
										class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
										title="Đặt làm ảnh chính"
									>
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
										</svg>
									</button>
									<button
										type="button"
										@click="removeImage(idx)"
										class="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
										title="Xóa ảnh"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>
						</div>

						<!-- Empty state -->
						<div v-else class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-4 bg-gray-50 dark:bg-gray-700/50">
							<svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<p class="text-gray-500 dark:text-gray-400 text-sm">Chưa có ảnh</p>
						</div>

						<!-- Upload area -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
							<!-- Upload file -->
							<div>
								<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Tải ảnh từ máy</label>
								<input 
									type="file"
									multiple
									accept="image/*"
									@change="handleMultipleImageUpload"
									:disabled="editFormData.images && editFormData.images.length >= 10"
									class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
								/>
								<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG, GIF (max 5MB mỗi file)</p>
							</div>

							<!-- URL ảnh -->
							<div class="space-y-2">
								<label class="block text-xs font-medium text-gray-600 dark:text-gray-400">Hoặc nhập URL ảnh</label>
								<div class="flex gap-2">
									<input 
										v-model="newImageUrl"
										type="url"
										placeholder="https://example.com/image.jpg"
										class="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<button 
										type="button"
										@click="addImageFromUrl"
										:disabled="editFormData.images && editFormData.images.length >= 10"
										class="px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Thêm
									</button>
								</div>
							</div>
						</div>
					</div>

					<hr class="dark:border-gray-700" />

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<!-- ID (read-only) -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
							<input 
								type="text" 
								:value="editFormData.id"
								disabled
								class="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-400"
							/>
						</div>

						<!-- Tên sản phẩm -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên sản phẩm *</label>
							<input 
								v-model="editFormData.name"
								type="text"
								placeholder="Nhập tên sản phẩm"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
					</div>

					<!-- Mô tả -->
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mô tả</label>
						<textarea 
							v-model="editFormData.description"
							placeholder="Nhập mô tả sản phẩm"
							rows="3"
							class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<!-- Giá -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Giá (VNĐ) *</label>
							<input 
								v-model.number="editFormData.price"
								type="number"
								placeholder="0"
								min="0"
								step="0.01"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>

						<!-- Số lượng -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số lượng *</label>
							<input 
								v-model.number="editFormData.quantity"
								type="number"
								placeholder="0"
								min="0"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>

						<!-- Trạng thái -->
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trạng thái</label>
							<select 
								v-model="editFormData.status"
								class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="active">Đang bán</option>
								<option value="inactive">Tạm ẩn</option>
							</select>
						</div>
					</div>

					<!-- Danh mục (tuỳ chọn) -->
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Danh mục</label>
						<input 
							v-model="editFormData.category"
							type="text"
							placeholder="Nhập danh mục"
							class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<!-- Màu sắc sản phẩm -->
					<div>
						<div class="flex items-center justify-between mb-2">
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Màu sắc có sẵn</label>
							<span class="text-xs text-gray-500 dark:text-gray-400">({{ editFormData.colors?.length || 0 }} màu)</span>
						</div>

						<!-- Color Display -->
						<div v-if="editFormData.colors && editFormData.colors.length > 0" class="mb-3 flex flex-wrap gap-2">
							<div 
								v-for="(color, idx) in editFormData.colors"
								:key="idx"
								class="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
							>
								<div 
									class="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600"
									:style="{ backgroundColor: color.hex }"
									:title="color.name"
								/>
								<span class="text-sm text-gray-900 dark:text-white font-medium">{{ color.name }}</span>
								<span class="text-xs text-gray-500 dark:text-gray-400">{{ color.hex }}</span>
								<button
									type="button"
									@click="removeColor(idx)"
									class="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
									title="Xóa màu"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
									</svg>
								</button>
							</div>
						</div>

						<!-- Add Color Form -->
						<div class="space-y-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
							<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
								<!-- Color Input -->
								<div>
									<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Mã màu</label>
									<div class="flex gap-2">
										<input 
											v-model="newColor.hex"
											type="color"
											class="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
										/>
										<input 
											v-model="newColor.hex"
											type="text"
											placeholder="#FF5733"
											class="flex-1 px-2 py-2 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>

								<!-- Color Name -->
								<div>
									<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tên màu</label>
									<input 
										v-model="newColor.name"
										type="text"
										placeholder="Đỏ, Xanh, Đen..."
										class="w-full px-2 py-2 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								<!-- Add Button -->
								<div class="flex items-end">
									<button
										type="button"
										@click="addColor"
										class="w-full px-3 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium rounded-lg transition-colors text-sm"
									>
										+ Thêm màu
									</button>
								</div>
							</div>

							<!-- Preset Colors -->
							<div>
								<label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Màu thường dùng:</label>
								<div class="flex flex-wrap gap-2">
									<button
										v-for="preset in colorPresets"
										:key="preset.hex"
										type="button"
										@click="() => { newColor.hex = preset.hex; newColor.name = preset.name; }"
										class="flex items-center gap-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
										:title="preset.name"
									>
										<div 
											class="w-4 h-4 rounded"
											:style="{ backgroundColor: preset.hex }"
										/>
										<span class="text-xs text-gray-700 dark:text-gray-300">{{ preset.name }}</span>
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Buttons -->
					<div class="flex gap-3 pt-4 border-t dark:border-gray-700">
						<button 
							type="button"
							@click="closeEditModal"
							class="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
						>
							Hủy
						</button>
						<button 
							type="submit"
							class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
						>
							{{ isCreating ? 'Tạo sản phẩm' : 'Lưu thay đổi' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Delete Confirmation Modal -->
	
	<!-- Create Product Modal (simple) -->
	<!-- Create modal removed: reuse the Edit modal for creating (openCreate sets isCreating + shows edit modal) -->
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
					Bạn chắc chắn muốn xóa sản phẩm <span class="font-semibold text-gray-900 dark:text-white">"{{ productToDelete?.name }}"</span>? Hành động này không thể hoàn tác.
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
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import InputField from '../../components/forms/InputField.vue';
import SelectDropdown from '../../components/forms/SelectDropdown.vue';
import { formatCurrency } from '../../utils/helpers';
import api from '../../utils/api';
import { useUIStore } from '../../stores/ui';

const ui = useUIStore();
const items = ref([]);
const filters = reactive({ q: '', status: 'all' });
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const isCreating = ref(false);
const productToDelete = ref(null);
const newImageUrl = ref('');
const newColor = reactive({ hex: '#000000', name: '' });
const colorPresets = [
	{ name: 'Đỏ', hex: '#FF0000' },
	{ name: 'Xanh dương', hex: '#0000FF' },
	{ name: 'Xanh lá', hex: '#00AA00' },
	{ name: 'Vàng', hex: '#FFFF00' },
	{ name: 'Cam', hex: '#FF8800' },
	{ name: 'Tím', hex: '#AA00AA' },
	{ name: 'Hồng', hex: '#FF69B4' },
	{ name: 'Đen', hex: '#000000' },
	{ name: 'Trắng', hex: '#FFFFFF' },
	{ name: 'Xám', hex: '#808080' },
	{ name: 'Nâu', hex: '#A52A2A' },
	{ name: 'Bạc', hex: '#C0C0C0' }
];
const editFormData = reactive({
	id: '',
	name: '',
	description: '',
	price: 0,
	quantity: 0,
	status: 'active',
	category: '',
	images: [],
	thumbnailIndex: 0,
	colors: []
});
const statusOptions = [
	{ value: 'all', label: 'Tất cả' },
	{ value: 'active', label: 'Đang bán' },
	{ value: 'inactive', label: 'Tạm ẩn' }
];

async function load() {
	try {
		// Thử tải từ localStorage trước
		const savedData = localStorage.getItem('admin_products');
		if (savedData) {
			items.value = JSON.parse(savedData);
			return;
		}
	} catch (e) {
		console.error('Lỗi tải localStorage:', e);
	}

	// Nếu không có saved data, tải từ API
	try {
		const { data } = await api.get('/products?limit=20');
		items.value = (data.products ?? data ?? []).map((p) => ({
			id: p.id,
			name: p.title ?? p.name,
			description: p.description || '',
			price: p.price,
			quantity: p.quantity || 0,
			status: p.status || 'active',
			category: p.category || '',
			images: p.images && Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
			image: p.image || p.thumbnail || p.url || '',
			thumbnailIndex: 0
		}));
		
		// Lưu vào localStorage
		localStorage.setItem('admin_products', JSON.stringify(items.value));
	} catch (e) {
		console.error('Lỗi tải API:', e);
	}
}
function openCreate() {
	// Reset form for creating new product
	editFormData.id = '';
	editFormData.name = '';
	editFormData.description = '';
	editFormData.price = 0;
	editFormData.quantity = 0;
	editFormData.status = 'active';
	editFormData.category = '';
	editFormData.images = [];
	editFormData.thumbnailIndex = 0;
	editFormData.colors = [];
	newImageUrl.value = '';
	newColor.hex = '#000000';
	newColor.name = '';
	isCreating.value = true;
	showEditModal.value = true;
}
function edit(p) {
	// Tải dữ liệu sản phẩm vào form
	editFormData.id = p.id;
	editFormData.name = p.name;
	editFormData.description = p.description || '';
	editFormData.price = p.price || 0;
	editFormData.quantity = p.quantity || 0;
	editFormData.status = p.status || 'active';
	editFormData.category = p.category || '';
	editFormData.colors = p.colors && Array.isArray(p.colors) ? [...p.colors] : [];
	// Nếu có danh sách ảnh, sử dụng; nếu não, chuyển ảnh đơn thành mảng
	editFormData.images = p.images && p.images.length > 0 ? [...p.images] : (p.image ? [p.image] : []);
	editFormData.thumbnailIndex = 0;
	newImageUrl.value = '';
	newColor.hex = '#000000';
	newColor.name = '';
	isCreating.value = false;
	showEditModal.value = true;
}
function saveProduct() {
	// Kiểm tra có ảnh không
	if (!editFormData.images || editFormData.images.length === 0) {
		ui.pushToast({ type: 'error', message: 'Vui lòng thêm ít nhất 1 ảnh' });
		return;
	}

	// Tìm sản phẩm trong items và cập nhật
	const productIndex = items.value.findIndex(p => p.id === editFormData.id);
	if (productIndex !== -1) {
		const updatedProduct = {
			...items.value[productIndex],
			name: editFormData.name,
			description: editFormData.description,
			price: editFormData.price,
			quantity: editFormData.quantity,
			status: editFormData.status,
			category: editFormData.category,
			images: editFormData.images,
			image: editFormData.images[editFormData.thumbnailIndex],
			thumbnailIndex: editFormData.thumbnailIndex
		};
		updatedProduct.colors = editFormData.colors;
		
		items.value[productIndex] = updatedProduct;
		
		// Lưu vào localStorage
		try {
			const productsData = JSON.stringify(items.value);
			localStorage.setItem('admin_products', productsData);
		} catch (e) {
			console.error('Lỗi lưu localStorage:', e);
		}
		
		ui.pushToast({ type: 'success', message: `Cập nhật sản phẩm "${editFormData.name}" thành công` });
		showEditModal.value = false;
		newImageUrl.value = '';
	}
}

function createProduct() {
	// Basic validation
	if (!editFormData.name || editFormData.name.trim() === '') {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập tên sản phẩm' });
		return;
	}
	if (!editFormData.images || editFormData.images.length === 0) {
		ui.pushToast({ type: 'error', message: 'Vui lòng thêm ít nhất 1 ảnh' });
		return;
	}

	// Build new product object
	const newProduct = {
		id: editFormData.id || `p_${Date.now()}`,
		name: editFormData.name,
		description: editFormData.description,
		price: editFormData.price,
		quantity: editFormData.quantity,
		status: editFormData.status,
		category: editFormData.category,
		images: [...(editFormData.images || [])],
		image: (editFormData.images && editFormData.images[editFormData.thumbnailIndex]) || '',
		thumbnailIndex: editFormData.thumbnailIndex || 0,
		colors: Array.isArray(editFormData.colors) ? [...editFormData.colors] : []
	};

	// parse tempColors textarea into colors if provided
	if (tempColors.value && tempColors.value.trim() !== '') {
		const lines = tempColors.value.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
		const parsed = [];
		const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		lines.forEach(line => {
			const parts = line.split(/\s+/);
			if (parts.length >= 1) {
				const hex = parts[0];
				const name = parts.slice(1).join(' ') || hex;
				if (hexPattern.test(hex)) parsed.push({ hex, name });
			}
		});
		if (parsed.length) newProduct.colors = parsed;
	}

	// Add to items and persist
	items.value.unshift(newProduct);
	try {
		localStorage.setItem('admin_products', JSON.stringify(items.value));
	} catch (e) {
		console.error('Lỗi lưu localStorage:', e);
	}

	ui.pushToast({ type: 'success', message: `Tạo sản phẩm "${newProduct.name}" thành công` });
	// close edit modal (we reuse edit modal for create)
	showEditModal.value = false;
}

function onSubmit() {
	if (isCreating.value) {
		createProduct();
	} else {
		saveProduct();
	}
}

function handleMultipleImageUpload(event) {
	const files = Array.from(event.target.files || []);
	if (files.length === 0) return;

	let successCount = 0;
	const maxImages = 10;
	const currentCount = editFormData.images?.length || 0;
	const remainingSlots = maxImages - currentCount;

	files.forEach((file, idx) => {
		if (idx >= remainingSlots) {
			ui.pushToast({ type: 'warning', message: `Chỉ có thể thêm tối đa ${maxImages} ảnh` });
			return;
		}

		// Kiểm tra kích thước file (max 5MB)
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			ui.pushToast({ type: 'error', message: `Ảnh "${file.name}" quá lớn (max 5MB)` });
			return;
		}

		// Kiểm tra định dạng file
		if (!file.type.startsWith('image/')) {
			ui.pushToast({ type: 'error', message: `"${file.name}" không phải tệp ảnh` });
			return;
		}

		// Chuyển đổi file thành Data URL (Base64)
		const reader = new FileReader();
		reader.onload = (e) => {
			editFormData.images.push(e.target?.result || '');
			successCount++;
			if (successCount === files.length || idx === files.length - 1) {
				ui.pushToast({ type: 'success', message: `Tải thành công ${successCount} ảnh` });
			}
		};
		reader.readAsDataURL(file);
	});

	// Reset input
	event.target.value = '';
}

function addImageFromUrl() {
	if (!newImageUrl.value.trim()) {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập URL ảnh' });
		return;
	}

	const maxImages = 10;
	if (editFormData.images && editFormData.images.length >= maxImages) {
		ui.pushToast({ type: 'error', message: `Chỉ có thể thêm tối đa ${maxImages} ảnh` });
		return;
	}

	editFormData.images.push(newImageUrl.value);
	ui.pushToast({ type: 'success', message: 'Thêm ảnh từ URL thành công' });
	newImageUrl.value = '';
}

function removeImage(idx) {
	editFormData.images.splice(idx, 1);
	// Nếu xóa ảnh chính, chuyển sang ảnh đầu tiên
	if (editFormData.thumbnailIndex >= editFormData.images.length) {
		editFormData.thumbnailIndex = 0;
	}
	ui.pushToast({ type: 'success', message: 'Xóa ảnh thành công' });
}

function setThumbnail(idx) {
	editFormData.thumbnailIndex = idx;
	ui.pushToast({ type: 'success', message: 'Đặt ảnh chính thành công' });
}

function addColor() {
	const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

	// Validação
	if (!newColor.hex.match(hexPattern)) {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập mã hex hợp lệ (ví dụ: #FF0000)' });
		return;
	}

	if (newColor.name.trim() === '') {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập tên màu' });
		return;
	}

	// Kiểm tra trùng lặp
	if (editFormData.colors.some(c => c.hex.toUpperCase() === newColor.hex.toUpperCase())) {
		ui.pushToast({ type: 'error', message: 'Màu này đã tồn tại' });
		return;
	}

	// Thêm màu mới
	editFormData.colors.push({
		hex: newColor.hex,
		name: newColor.name.trim()
	});

	// Reset form
	newColor.hex = '#000000';
	newColor.name = '';
	ui.pushToast({ type: 'success', message: 'Màu đã được thêm' });
}

function removeColor(idx) {
	editFormData.colors.splice(idx, 1);
	ui.pushToast({ type: 'success', message: 'Màu đã được xóa' });
}
function openDeleteConfirm(p) {
	productToDelete.value = p;
	showDeleteModal.value = true;
}
function confirmDelete() {
	if (productToDelete.value) {
		const id = productToDelete.value.id;
		remove(productToDelete.value);
		showDeleteModal.value = false;
		productToDelete.value = null;
	}
}
function remove(p) {
	ui.pushToast({ type: 'success', message: `Đã xóa sản phẩm "${p.name}"` });
	items.value = items.value.filter((i) => i.id !== p.id);
	
	// Lưu vào localStorage
	try {
		const productsData = JSON.stringify(items.value);
		localStorage.setItem('admin_products', productsData);
	} catch (e) {
		console.error('Lỗi lưu localStorage:', e);
	}
}

onMounted(load);

function closeEditModal() {
	showEditModal.value = false;
	isCreating.value = false;
	newImageUrl.value = '';
	newColor.hex = '#000000';
	newColor.name = '';
}
</script>



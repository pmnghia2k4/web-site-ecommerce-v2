<template>
	<h1 class="mb-4 text-xl font-semibold">Quản lý đơn hàng</h1>
	<div class="mb-4 flex gap-3 flex-wrap items-center">
		<div>
			<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lọc theo trạng thái</label>
			<SelectDropdown v-model="status" :options="statusOptions" />
		</div>
		<div>
			<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tìm kiếm</label>
			<input 
				v-model="searchQuery"
				type="text"
				placeholder="Mã đơn, khách hàng, email..."
				class="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
			/>
		</div>
		<div class="flex items-end gap-2">
			<button @click="load" class="rounded border px-3 py-2 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Tải lại</button>
		</div>
	</div>
	<div class="overflow-x-auto rounded-lg border dark:border-gray-800">
		<table class="min-w-full text-sm">
			<thead class="bg-gray-50 text-left dark:bg-gray-900">
				<tr>
					<th class="p-3 font-semibold">Mã đơn</th>
					<th class="p-3 font-semibold">Ngày đặt</th>
					<th class="p-3 font-semibold">Khách hàng</th>
					<th class="p-3 font-semibold">Email</th>
					<th class="p-3 font-semibold">Tổng tiền</th>
					<th class="p-3 font-semibold">Trạng thái</th>
					<th class="p-3 font-semibold">Hành động</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="o in filteredOrders" :key="o.id" class="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
					<td class="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">{{ o.id }}</td>
					<td class="p-3">{{ formatDate(o.createdAt) }}</td>
					<td class="p-3">{{ o.customerName }}</td>
					<td class="p-3 text-gray-600 dark:text-gray-400">{{ o.customerEmail }}</td>
					<td class="p-3 font-semibold">{{ formatCurrency(o.total) }}</td>
					<td class="p-3">
						<span 
							:class="{
								'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300': o.status === 'pending',
								'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': o.status === 'confirmed',
								'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300': o.status === 'shipped',
								'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': o.status === 'delivered',
								'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': o.status === 'cancelled'
							}"
							class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
						>
							{{ getStatusLabel(o.status) }}
						</span>
					</td>
					<td class="p-3">
						<div class="flex items-center gap-2">
							<button 
								@click="update(o, 'shipped')" 
								aria-label="Giao hàng"
								:disabled="o.status === 'shipped' || o.status === 'delivered' || o.status === 'cancelled'"
								class="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-900/20 dark:text-blue-300"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h13l3 4v6a1 1 0 01-1 1h-1a2 2 0 11-4 0H9a2 2 0 11-4 0H4a1 1 0 01-1-1V7z"/></svg>
								Giao
							</button>

							<button 
								@click="update(o, 'cancelled')" 
								aria-label="Huỷ"
								:disabled="o.status === 'delivered' || o.status === 'cancelled'"
								class="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-900/20 dark:text-red-300"
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
								Huỷ
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- No Results -->
	<div v-if="filteredOrders.length === 0" class="mt-4 p-8 text-center text-gray-600 dark:text-gray-400">
		<svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
		</svg>
		<p>Không có đơn hàng nào</p>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SelectDropdown from '../../components/forms/SelectDropdown.vue';
import { useUIStore } from '../../stores/ui';
import { useOrderStore } from '../../stores/order';
import { formatCurrency } from '../../utils/helpers';

const ui = useUIStore();
const orderStore = useOrderStore();

const status = ref('all');
const searchQuery = ref('');
const statusOptions = [
	{ value: 'all', label: 'Tất cả' },
	{ value: 'pending', label: 'Chờ xác nhận' },
	{ value: 'confirmed', label: 'Đã xác nhận' },
	{ value: 'shipped', label: 'Đang giao' },
	{ value: 'delivered', label: 'Đã giao' },
	{ value: 'cancelled', label: 'Đã hủy' }
];

// Map store orders to view model
const orders = computed(() => {
	return orderStore.getAllOrders.map(o => {
		const shipping = o.shippingInfo || {};
		return {
			id: o.id,
			createdAt: o.createdAt || new Date().toISOString(),
			customerName: shipping.fullName || shipping.name || 'Khách lẻ',
			customerEmail: shipping.email || '',
			total: o.total || o.subtotal || 0,
			status: o.status || 'pending',
			paymentMethod: o.paymentMethod || 'cod',
			items: o.items || [],
			raw: o
		};
	});
});

// Filtered orders
const filteredOrders = computed(() => {
	let result = orders.value;

	// Status filter
	if (status.value !== 'all') {
		result = result.filter(o => o.status === status.value);
	}

	// Search filter
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		result = result.filter(o =>
			(o.id || '').toString().toLowerCase().includes(query) ||
			(o.customerName || '').toLowerCase().includes(query) ||
			(o.customerEmail || '').toLowerCase().includes(query)
		);
	}

	return result;
});

function formatDate(date) {
	if (!date) return '';
	const d = new Date(date);
	return d.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getStatusLabel(status) {
	const labels = {
		pending: 'Chờ xác nhận',
		confirmed: 'Đã xác nhận',
		shipped: 'Đang giao',
		delivered: 'Đã giao',
		cancelled: 'Đã hủy'
	};
	return labels[status] || status;
}

function load() {
	// Refresh from store (already reactive)
	ui.pushToast({ type: 'info', message: 'Đã tải lại danh sách đơn hàng' });
}

function update(o, newStatus) {
	const oldStatus = o.status;
	o.status = newStatus;
	orderStore.updateOrderStatus(o.id, newStatus);
	ui.pushToast({ type: 'success', message: `Đã cập nhật #${o.id} → ${getStatusLabel(newStatus)}` });
}
</script>



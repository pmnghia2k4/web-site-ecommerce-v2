<template>
	<div class="space-y-6">
		<!-- Header -->
		<div>
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Báo cáo kinh doanh</h1>
			<p class="text-gray-600 dark:text-gray-400">Xem tổng quan hoạt động cửa hàng</p>
		</div>

		<!-- KPI Cards -->
		<div class="grid gap-4 md:grid-cols-4">
			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 dark:text-gray-400">Tổng doanh thu</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(totalRevenue) }}</p>
					</div>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
						<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 dark:text-gray-400">Số đơn hàng</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ totalOrders }}</p>
					</div>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
						<svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 dark:text-gray-400">Sản phẩm bán</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ totalProductsSold }}</p>
					</div>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
						<svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10" />
						</svg>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 dark:text-gray-400">Giá trị trung bình</p>
						<p class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(averageOrderValue) }}</p>
					</div>
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
						<svg class="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Charts Row -->
		<div class="grid gap-4 md:grid-cols-2">
			<!-- Doanh thu theo tháng -->
			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
				<h2 class="mb-4 font-semibold text-gray-900 dark:text-white">Doanh thu theo tháng</h2>
				<div class="space-y-3">
					<div v-for="(month, idx) in revenueByMonth" :key="idx" class="flex items-end justify-between">
						<span class="text-sm text-gray-600 dark:text-gray-400">{{ month.name }}</span>
						<div class="flex flex-1 mx-3 h-6 rounded-full bg-gray-200 dark:bg-gray-700" :style="{ width: (month.value / maxRevenue * 100) + '%', backgroundColor: month.color }"></div>
						<span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(month.value) }}</span>
					</div>
				</div>
			</div>

			<!-- Sản phẩm bán chạy -->
			<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
				<h2 class="mb-4 font-semibold text-gray-900 dark:text-white">Sản phẩm bán chạy</h2>
				<div class="space-y-3">
					<div v-for="(product, idx) in topProducts" :key="idx" class="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-700/50 p-3">
						<div class="flex-1">
							<p class="font-medium text-gray-900 dark:text-white">{{ product.name }}</p>
							<p class="text-sm text-gray-600 dark:text-gray-400">{{ product.quantity }} bán</p>
						</div>
						<div class="flex flex-col items-end">
							<span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(product.revenue) }}</span>
							<span class="text-xs text-green-600">+{{ product.trend }}%</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Orders Status -->
		<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
			<h2 class="mb-4 font-semibold text-gray-900 dark:text-white">Trạng thái đơn hàng</h2>
			<div class="grid gap-4 md:grid-cols-5">
				<div v-for="status in orderStatus" :key="status.name" class="text-center">
					<div class="flex justify-center mb-2">
						<div class="relative w-16 h-16">
							<svg class="w-16 h-16" viewBox="0 0 36 36">
								<circle cx="18" cy="18" r="15.915" fill="none" class="text-gray-200 dark:text-gray-700" stroke="currentColor" stroke-width="3"/>
								<circle
									cx="18"
									cy="18"
									r="15.915"
									fill="none"
									:stroke="status.color"
									stroke-width="3"
									stroke-dasharray="100"
									:stroke-dashoffset="100 - status.percentage"
									stroke-linecap="round"
									transform="rotate(-90 18 18)"
								/>
							</svg>
							<div class="absolute inset-0 flex items-center justify-center">
								<span class="text-lg font-bold text-gray-900 dark:text-white">{{ status.percentage }}%</span>
							</div>
						</div>
					</div>
					<p class="font-medium text-gray-900 dark:text-white">{{ status.name }}</p>
					<p class="text-sm text-gray-600 dark:text-gray-400">{{ status.count }} đơn</p>
				</div>
			</div>
		</div>

		<!-- Recent Orders -->
		<div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
			<h2 class="mb-4 font-semibold text-gray-900 dark:text-white">Đơn hàng gần đây</h2>
			<div class="overflow-x-auto">
				<table class="min-w-full text-sm">
					<thead>
						<tr class="border-b dark:border-gray-700">
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Mã đơn</th>
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Ngày đặt</th>
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Khách hàng</th>
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Số lượng</th>
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Tổng tiền</th>
							<th class="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-400">Trạng thái</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="order in recentOrders" :key="order.id" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
							<td class="py-3 px-4 font-mono text-gray-900 dark:text-white">{{ order.id }}</td>
							<td class="py-3 px-4 text-gray-600 dark:text-gray-400">{{ formatDate(order.date) }}</td>
							<td class="py-3 px-4 text-gray-900 dark:text-white">{{ order.customer }}</td>
							<td class="py-3 px-4 text-gray-600 dark:text-gray-400">{{ order.quantity }}</td>
							<td class="py-3 px-4 font-semibold text-gray-900 dark:text-white">{{ formatCurrency(order.total) }}</td>
							<td class="py-3 px-4">
								<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors" :style="{ backgroundColor: order.statusColor + '20', color: order.statusColor }">
									{{ order.status }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import { formatCurrency } from '../../utils/helpers';

// Sample data
const revenueByMonth = ref([
	{ name: 'Tháng 1', value: 15000000, color: '#3B82F6' },
	{ name: 'Tháng 2', value: 18000000, color: '#3B82F6' },
	{ name: 'Tháng 3', value: 22000000, color: '#3B82F6' },
	{ name: 'Tháng 4', value: 25000000, color: '#3B82F6' },
	{ name: 'Tháng 5', value: 28000000, color: '#3B82F6' },
	{ name: 'Tháng 6', value: 32000000, color: '#10B981' },
]);

const topProducts = ref([
	{ name: 'Laptop Dell XPS 13', quantity: 48, revenue: 48000000, trend: 12 },
	{ name: 'iPhone 15 Pro', quantity: 65, revenue: 65000000, trend: 18 },
	{ name: 'Samsung Galaxy S24', quantity: 42, revenue: 42000000, trend: 8 },
	{ name: 'Sony WH-1000XM5', quantity: 127, revenue: 25400000, trend: 25 },
	{ name: 'Apple Watch Series 9', quantity: 89, revenue: 17800000, trend: 15 },
]);

const orderStatus = ref([
	{ name: 'Pending', count: 24, percentage: 15, color: '#FBBF24' },
	{ name: 'Processing', count: 38, percentage: 24, color: '#3B82F6' },
	{ name: 'Shipped', count: 54, percentage: 34, color: '#8B5CF6' },
	{ name: 'Delivered', count: 38, percentage: 24, color: '#10B981' },
	{ name: 'Cancelled', count: 6, percentage: 3, color: '#EF4444' },
]);

const recentOrders = ref([
	{ id: 'ORD-001', date: new Date('2025-11-23'), customer: 'Nguyễn Văn A', quantity: 2, total: 2500000, status: 'Delivered', statusColor: '#10B981' },
	{ id: 'ORD-002', date: new Date('2025-11-22'), customer: 'Trần Thị B', quantity: 1, total: 1200000, status: 'Shipped', statusColor: '#8B5CF6' },
	{ id: 'ORD-003', date: new Date('2025-11-22'), customer: 'Phạm Văn C', quantity: 3, total: 3800000, status: 'Processing', statusColor: '#3B82F6' },
	{ id: 'ORD-004', date: new Date('2025-11-21'), customer: 'Lê Thị D', quantity: 1, total: 850000, status: 'Pending', statusColor: '#FBBF24' },
	{ id: 'ORD-005', date: new Date('2025-11-21'), customer: 'Hoàng Văn E', quantity: 4, total: 4500000, status: 'Delivered', statusColor: '#10B981' },
]);

// Computed properties
const maxRevenue = computed(() => Math.max(...revenueByMonth.value.map(m => m.value)));

const totalRevenue = computed(() => revenueByMonth.value.reduce((sum, m) => sum + m.value, 0));

const totalOrders = computed(() => orderStatus.value.reduce((sum, s) => sum + s.count, 0));

const totalProductsSold = computed(() => topProducts.value.reduce((sum, p) => sum + p.quantity, 0));

const averageOrderValue = computed(() => totalRevenue.value / totalOrders.value);

// Utilities
function formatDate(date) {
	return new Date(date).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
</script>



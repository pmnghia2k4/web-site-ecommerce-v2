<template>
	<h1 class="mb-4 text-xl font-semibold">Tổng quan</h1>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border p-4 dark:border-gray-800">
			<p class="text-sm text-gray-500">Doanh thu hôm nay</p>
			<p class="mt-2 text-2xl font-bold">12.500.000₫</p>
		</div>
		<div class="rounded-lg border p-4 dark:border-gray-800">
			<p class="text-sm text-gray-500">Đơn hàng</p>
			<p class="mt-2 text-2xl font-bold">58</p>
		</div>
		<div class="rounded-lg border p-4 dark:border-gray-800">
			<p class="text-sm text-gray-500">Người dùng</p>
			<p class="mt-2 text-2xl font-bold">1.204</p>
		</div>
		<div class="rounded-lg border p-4 dark:border-gray-800">
			<p class="text-sm text-gray-500">Tỷ lệ chuyển đổi</p>
			<p class="mt-2 text-2xl font-bold">3.1%</p>
		</div>
	</div>
	<div class="mt-6 rounded-lg border p-4 dark:border-gray-800">
		<p class="mb-3 font-semibold">Đơn hàng gần đây</p>
		<div class="overflow-x-auto">
			<table class="min-w-full text-sm">
				<thead class="text-left text-gray-500">
					<tr>
						<th class="py-2">Mã</th>
						<th class="py-2">Ngày</th>
						<th class="py-2">Khách</th>
						<th class="py-2">Tổng</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="o in recent" :key="o.id" class="border-t dark:border-gray-800">
						<td class="py-2">#{{ o.id }}</td>
						<td class="py-2">{{ o.date }}</td>
						<td class="py-2">{{ o.customer }}</td>
						<td class="py-2">{{ o.total }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import AdminLayout from '../../components/layout/AdminLayout.vue';
const recent = [
	{ id: 201, date: '2025-11-11', customer: 'Nguyễn A', total: '1.250.000₫' },
	{ id: 202, date: '2025-11-11', customer: 'Trần B', total: '560.000₫' }
];
</script>



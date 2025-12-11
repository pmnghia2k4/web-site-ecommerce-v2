<template>
	<section>
		<button @click="goBack" class="mb-2 text-sm text-gray-500 hover:underline">← Quay lại</button>
		<h1 class="mb-4 text-xl font-semibold">Chi tiết đơn #{{ id }}</h1>
		<div class="grid gap-6 md:grid-cols-[1fr_320px]">
			<div class="space-y-3">
				<div class="rounded-lg border p-4 dark:border-gray-800">
					<p class="font-semibold">Trạng thái</p>
					<p class="text-sm text-gray-500">{{ order.status }}</p>
				</div>
				<div class="rounded-lg border p-4 dark:border-gray-800">
					<p class="mb-2 font-semibold">Sản phẩm</p>
					<ul class="space-y-2 text-sm">
						<li v-for="it in order.items" :key="it.id" class="flex items-center justify-between">
							<span>{{ it.name }} × {{ it.quantity }}</span>
							<span>{{ formatCurrency(it.price * it.quantity) }}</span>
						</li>
					</ul>
				</div>
			</div>
			<aside class="rounded-lg border p-4 dark:border-gray-800">
				<p class="mb-2 font-semibold">Tổng tiền</p>
				<p class="text-xl font-bold">{{ formatCurrency(total) }}</p>
			</aside>
		</div>
	</section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatCurrency } from '../utils/helpers';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const order = ref({ status: 'Processing', items: [] });
onMounted(() => {
	order.value = {
		status: 'Processing',
		items: [
			{ id: 1, name: 'Product A', quantity: 1, price: 200000 },
			{ id: 2, name: 'Product B', quantity: 2, price: 150000 }
		]
	};
});
const total = computed(() => order.value.items.reduce((s, it) => s + it.price * it.quantity, 0));
function goBack() {
	router.back();
}
</script>



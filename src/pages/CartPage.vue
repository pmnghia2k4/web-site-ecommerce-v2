<template>
	<section>
		<button @click="goBack" class="mb-2 text-sm text-gray-500 hover:underline">← Quay lại</button>
		<h1 class="mb-4 text-xl font-semibold">Giỏ hàng</h1>
		<div v-if="!items.length" class="rounded-lg border p-8 text-center dark:border-gray-800">
			Giỏ hàng trống. <RouterLink to="/products" class="underline">Tiếp tục mua sắm</RouterLink>
		</div>
		<div v-else class="grid gap-6 md:grid-cols-[1fr_320px]">
			<ul class="space-y-4">
				<li v-for="it in items" :key="it.id" class="flex items-center gap-4 rounded-lg border p-3 dark:border-gray-800">
					<img :src="it.image" class="h-20 w-20 rounded object-cover" />
					<div class="flex-1">
						<p class="font-medium">{{ it.name }}</p>
						<p class="text-sm text-gray-500">{{ formatCurrency(it.price) }}</p>
					<div class="mt-2 flex items-center gap-2">
						<input type="number" min="1" class="w-20 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900" :value="it.quantity" @input="updateQty(it.id, $event.target.value)" />
						<button @click="remove(it.id)" aria-label="Xóa sản phẩm" title="Xóa" class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-gray-800 dark:text-red-400 p-2 shadow-sm">
							<img :src="trashIcon" alt="Xóa" class="h-5 w-5" />
							<span class="sr-only">Xóa</span>
						</button>
					</div>
					</div>
				</li>
			</ul>
			<aside class="rounded-lg border p-4 dark:border-gray-800">
				<h2 class="mb-3 font-semibold">Tạm tính</h2>
				<p class="mb-4 text-xl font-bold">{{ formatCurrency(subtotal) }}</p>
				<RouterLink to="/checkout" class="block rounded bg-gray-900 px-4 py-2 text-center text-white dark:bg-gray-100 dark:text-black">Thanh toán</RouterLink>
			</aside>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';
import { formatCurrency } from '../utils/helpers';
import trashIcon from '../assets/delete.png';

const cart = useCartStore();
const items = computed(() => cart.items);
const subtotal = computed(() => cart.subtotal);
const router = useRouter();

function updateQty(id, q) {
	const num = Number(q || 1);
	cart.updateQuantity(id, num);
}
function remove(id) {
	cart.removeItem(id);
}
function goBack() {
	router.back();
}
</script>



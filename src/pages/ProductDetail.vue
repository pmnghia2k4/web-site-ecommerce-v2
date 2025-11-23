<template>
	<section v-if="product">
		<button @click="goBack" class="mb-2 text-sm text-gray-500 hover:underline">← Quay lại</button>
		<nav class="mb-4 text-sm text-gray-500">
			<RouterLink to="/" class="hover:underline">Trang chủ</RouterLink> / 
			<RouterLink to="/products" class="hover:underline">Sản phẩm</RouterLink> / 
			<span class="text-gray-700 dark:text-gray-300">{{ product.name }}</span>
		</nav>
		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<div class="overflow-hidden rounded-lg">
					<img :src="currentImage" :alt="product.name" class="w-full object-cover transition-transform duration-300 transform hover:scale-105 border dark:border-gray-800" />
				</div>
			</div>
			<div>
				<h1 class="text-2xl font-semibold">{{ product.name }}</h1>
				<!-- Swatches for product images (moved under product name) -->
				<div v-if="product.images && product.images.length" class="mt-2 flex items-center gap-2">
					<button
						v-for="(img, i) in product.images"
						:key="i"
						@click="selectImage(img)"
						:class="['h-8 w-8 rounded-full overflow-hidden border', currentImage === img ? 'ring-2 ring-offset-1 ring-gray-900' : '']"
						:style="{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
						aria-label="Chọn ảnh"
					/>
				</div>
				<p class="mt-2 text-gray-500">{{ product.brand }}</p>
				<p class="mt-4 text-2xl font-bold">{{ formatCurrency(product.price) }}</p>
				<p class="mt-4 text-sm text-gray-600 dark:text-gray-300">{{ product.description }}</p>
				<div class="mt-5 flex gap-3">
					<input v-model.number="qty" type="number" min="1" class="w-20 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900" />
					<button class="rounded bg-gray-900 px-4 py-2 text-white dark:bg-gray-100 dark:text-black" @click="addToCart">Thêm vào giỏ</button>
					<button class="rounded border px-4 py-2 dark:border-gray-700">Yêu thích</button>
				</div>
			</div>
		</div>
		<div class="mt-10">
			<h2 class="mb-3 text-lg font-semibold">Mô tả chi tiết</h2>
			<div class="prose max-w-none dark:prose-invert">
				<p>{{ product.longDescription ?? 'Đang cập nhật...' }}</p>
			</div>
		</div>
	</section>
	<div v-else class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import api from '../utils/api';
import { formatCurrency } from '../utils/helpers';

const route = useRoute();
const router = useRouter();
const cart = useCartStore();
const product = ref(null);
const qty = ref(1);
const currentImage = ref('');

function goBack() {
	// Try to go back in history, fallback to products list
	if (typeof window !== 'undefined' && window.history.length > 1) {
		router.back();
	} else {
		router.push('/products');
	}
}

onMounted(async () => {
	const id = route.params.id;
	const { data } = await api.get(`/products/${id}`);
	const p = data ?? {};
	product.value = {
		id: p.id,
		name: p.title ?? p.name,
		price: p.price,
		brand: p.brand ?? 'Brand',
		description: p.description ?? 'Mô tả ngắn sản phẩm',
		longDescription: p.description ?? 'Chi tiết sản phẩm sẽ được cập nhật sớm',
		images: p.images ?? (p.thumbnail ? [p.thumbnail] : []),
		image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/800')
	};
	// set current image for main display
	currentImage.value = product.value.image || (product.value.images && product.value.images[0]) || '';
});

function addToCart() {
	if (!product.value) return;
	cart.addItem(product.value, qty.value || 1);
}

function selectImage(url) {
	if (!url) return;
	currentImage.value = url;
}
</script>



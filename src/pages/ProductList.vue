<template>
	<section>
		<h1 class="mb-4 text-xl font-semibold">Danh sách sản phẩm</h1>
		<div class="grid gap-6 md:grid-cols-[240px_1fr]">
			<aside class="space-y-4">
				<InputField v-model="filters.q" label="Từ khóa" placeholder="Tìm kiếm..." />
				<SelectDropdown v-model="filters.sort" label="Sắp xếp" :options="sortOptions" />
				<InputField v-model="filters.min" label="Giá từ" type="number" />
				<InputField v-model="filters.max" label="Giá đến" type="number" />
				<button class="w-full rounded bg-gray-900 px-3 py-2 text-white dark:bg-gray-100 dark:text-black" @click="applyFilters">
					Lọc
				</button>
			</aside>
			<div>
				<div v-if="loading" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<div v-for="i in 8" :key="i" class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
				</div>
				<div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<ProductCard v-for="p in items" :key="p.id" :product="p" @add="addToCart" />
				</div>
				<div class="mt-6 flex items-center justify-center space-x-3">
					<button
						@click="prevPage"
						:disabled="currentPage === 1"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
					>
						<span class="sr-only">Trang trước</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
						Trang <span class="font-bold">{{ currentPage }}</span> / <span class="font-bold">{{ totalPages }}</span>
					</span>
					<button
						@click="nextPage"
						:disabled="currentPage === totalPages"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
					>
						<span class="sr-only">Trang kế tiếp</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, reactive, computed, ref, watch } from 'vue';
import { useProductsStore } from '../stores/products';
import { useCartStore } from '../stores/cart';
import InputField from '../components/forms/InputField.vue';
import SelectDropdown from '../components/forms/SelectDropdown.vue';
import ProductCard from '../components/common/ProductCard.vue';
import { formatCurrency } from '../utils/helpers';

const products = useProductsStore();
const cart = useCartStore();
const loading = computed(() => products.loading);
const items = computed(() =>
	products.items.map((p) => ({
		id: p.id,
		name: p.title ?? p.name,
		price: p.price,
		brand: p.brand ?? 'Brand',
		image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/400')
	}))
);

const filters = reactive({ q: '', sort: 'newest', min: '', max: '' });
const sortOptions = [
	{ value: 'newest', label: 'Mới nhất' },
	{ value: 'price_asc', label: 'Giá tăng dần' },
	{ value: 'price_desc', label: 'Giá giảm dần' }
];

const currentPage = ref(1);
const itemsPerPage = ref(24);
const totalPages = computed(() => Math.ceil(products.total / itemsPerPage.value));

async function fetchProducts() {
	const params = {
		limit: itemsPerPage.value,
		skip: (currentPage.value - 1) * itemsPerPage.value
	};
	if (filters.q) params.q = filters.q;
	// TODO: Add sorting params if backend supports it
	await products.fetchList(params);
}

onMounted(fetchProducts);
watch(currentPage, fetchProducts);

function applyFilters() {
	currentPage.value = 1;
	fetchProducts();
}

function addToCart(p) {
	cart.addItem(p, 1);
}

function nextPage() {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
}

function prevPage() {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
}
</script>



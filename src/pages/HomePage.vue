<template>
	<section>
		<div class="mb-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
			<h1 class="text-2xl font-bold">Khám phá ưu đãi hôm nay</h1>
			<p class="mt-1 text-white/80">Giảm giá đến 50% cho nhiều mặt hàng</p>
		</div>

		<h2 class="mb-3 flex items-center justify-between text-lg font-semibold">
			<span>Sản phẩm</span>
			<div class="text-sm text-gray-500">Trang {{ page }} / {{ totalPages }}</div>
		</h2>

		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<ProductCard
				v-for="p in productsList"
				:key="p.id"
				:product="p"
				@add="addToCart"
				@wishlist="addWishlist"
			/>
		</div>

		<!-- Pagination (compact center input showing current / total) -->
		<div class="mt-6 flex items-center justify-center">
			<div class="inline-flex items-center gap-6">
				<button
					@click="prevPage"
					:disabled="page === 1"
					class="px-5 py-3 rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-md hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Trước
				</button>

				<div class="flex items-center justify-center rounded-full bg-gray-700/80 px-6 py-2 shadow-inner w-48">
					<div class="flex items-center justify-center gap-2">
						<input
							v-model.number="pageInput"
							@keydown.enter.prevent="gotoInputPage"
							type="number"
							min="1"
							:max="totalPages"
							class="w-14 bg-transparent text-center text-lg font-semibold text-white border-0 focus:outline-none focus:ring-0 appearance-textfield"
							aria-label="Số trang"
						/>
						<span class="text-lg font-semibold text-gray-300">/</span>
						<span class="text-lg font-semibold text-gray-300">{{ totalPages }}</span>
					</div>
				</div>

				<button
					@click="nextPage"
					:disabled="page === totalPages"
					class="px-5 py-3 rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-md hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Kế tiếp
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import ProductCard from '../components/common/ProductCard.vue';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';

const cart = useCartStore();
const productsStore = useProductsStore();

const page = ref(1);
const pageSize = 12;
const productsList = ref([]);

const totalPages = computed(() => Math.max(1, Math.ceil((productsStore.total || 0) / pageSize)));

const pages = computed(() => {
	const p = totalPages.value;
	const arr = [];
	// show up to first 5 pages in buttons (we always have a direct '1' and input for others)
	for (let i = 1; i <= Math.min(p, 5); i++) arr.push(i);
	return arr;
});

async function loadPage() {
	const skip = (page.value - 1) * pageSize;
	await productsStore.fetchList({ limit: pageSize, skip });
	const items = productsStore.items ?? [];
	productsList.value = (items ?? []).map((p) => ({
		id: p.id,
		name: p.title ?? p.name,
		price: p.price,
		brand: p.brand ?? 'Brand',
		images: p.images ?? (p.thumbnail ? [p.thumbnail] : []),
		image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/400')
	}));
	// Scroll to top after loading a new page so user sees the top of product list
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}

// page input handling
const pageInput = ref(page.value);
function gotoInputPage() {
	const n = Number(pageInput.value) || 1;
	const target = Math.min(Math.max(1, Math.floor(n)), totalPages.value || 1);
	page.value = target;
	pageInput.value = target;
}

function addToCart(p) {
	cart.addItem(p, 1);
}
function addWishlist() {
	/* no-op demo */
}

function goToPage(p) {
	if (p === page.value) return;
	page.value = p;
}
function prevPage() {
	if (page.value > 1) page.value -= 1;
}
function nextPage() {
	if (page.value < totalPages.value) page.value += 1;
}

watch(page, () => {
	loadPage();
	pageInput.value = page.value;
});

onMounted(async () => {
	await loadPage();
});
</script>

<style scoped>
/* Hide number input spinners (up/down) for Chrome, Edge, Safari */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
/* Hide number input spinner for Firefox */
input[type=number] {
	appearance: textfield;
	-moz-appearance: textfield;
}
</style>



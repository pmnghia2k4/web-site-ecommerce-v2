<template>
	<section>
		<h1 class="mb-4 text-xl font-semibold">Kết quả tìm kiếm cho "{{ q }}"</h1>

		<div v-if="loading" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<div v-for="i in 8" :key="i" class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
		</div>

		<div v-else-if="!items.length" class="rounded-lg border p-8 text-center text-sm text-gray-500 dark:border-gray-800">Không tìm thấy sản phẩm</div>

		<div v-else class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<ProductCard v-for="p in items" :key="p.id" :product="p" @add="addToCart" />
		</div>

		<!-- Pagination controls (compact center input showing current / total) -->
		<div v-if="totalPages > 1" class="mt-6 flex items-center justify-center">
			<div class="inline-flex items-center gap-6">
				<button @click="prevPage" :disabled="page === 1" class="px-5 py-3 rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-md hover:brightness-105 disabled:opacity-50">Trước</button>

				<div class="flex items-center justify-center rounded-full bg-gray-700/80 px-6 py-2 shadow-inner w-48">
					<div class="flex items-center justify-center gap-2">
						<input v-model.number="pageInput" @keydown.enter.prevent="gotoInputPage" type="number" min="1" :max="totalPages" class="w-14 bg-transparent text-center text-lg font-semibold text-white border-0 focus:outline-none focus:ring-0 appearance-textfield" />
						<span class="text-lg font-semibold text-gray-300">/</span>
						<span class="text-lg font-semibold text-gray-300">{{ totalPages }}</span>
					</div>
				</div>

				<button @click="nextPage" :disabled="page === totalPages" class="px-5 py-3 rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-md hover:brightness-105 disabled:opacity-50">Kế tiếp</button>
			</div>
		</div>
	</section>
</template>

<script setup>
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

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard.vue';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cart = useCartStore();
const q = ref('');
const loading = ref(false);
const items = ref([]);
const total = ref(0);

const page = ref(1);
const pageSize = 12;
const pageInput = ref(1);

const totalPages = computed(() => Math.max(1, Math.ceil((total.value || 0) / pageSize)));

async function loadSearch() {
	q.value = String(route.query.q || '');
	if (!q.value) {
		items.value = [];
		total.value = 0;
		return;
	}
	loading.value = true;
	try {
		const skip = (page.value - 1) * pageSize;
		const { data } = await api.get(`/products/search?q=${encodeURIComponent(q.value)}&limit=${pageSize}&skip=${skip}`);
		total.value = data.total ?? data.total ?? 0;
		items.value = (data.products ?? []).map((p) => ({
			id: p.id,
			name: p.title,
			price: p.price,
			brand: p.brand ?? 'Brand',
			images: p.images ?? (p.thumbnail ? [p.thumbnail] : []),
			image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/400')
		}));
		// Scroll to top after loading search results page
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	} finally {
		loading.value = false;
	}
}

watch(() => route.query.q, () => {
	page.value = 1;
	pageInput.value = 1;
	loadSearch();
});

watch(page, () => {
	pageInput.value = page.value;
	loadSearch();
});

function addToCart(p) {
	cart.addItem(p, 1);
}

function goToPage(p) {
	const t = Math.min(Math.max(1, Math.floor(p)), totalPages.value);
	if (t === page.value) return;
	page.value = t;
}
function prevPage() {
	if (page.value > 1) page.value -= 1;
}
function nextPage() {
	if (page.value < totalPages.value) page.value += 1;
}
function gotoInputPage() {
	const n = Number(pageInput.value) || 1;
	goToPage(n);
}

</script>



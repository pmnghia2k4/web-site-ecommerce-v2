<template>
	<section>
		<BannerCarousel :slides="bannerData" class="mb-6" />

		<!-- Voucher Section -->
		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-extrabold">ƯU ĐÃI NỔI BẬT</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="(v, i) in vouchers"
					:key="i"
					class="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4 shadow-sm"
				>
					<div>
						<h3 class="text-lg font-semibold">{{ v.title }}</h3>
						<p class="text-sm text-gray-600 mt-1">{{ v.desc }}</p>
						<p class="mt-3 text-sm text-gray-700"><span class="font-medium">HSD:</span> {{ v.expiry }}</p>
						<p class="text-sm text-gray-500">{{ v.condition }}</p>
					</div>
					<button class="ml-4 rounded bg-gray-800 px-4 py-2 text-white">Dùng mã</button>
				</div>
			</div>
		</section>

		<!-- Category Filter -->
		<section class="mb-6">
			<h2 class="mb-3 flex items-center justify-between text-lg font-semibold">
				<span class="text-2xl font-extrabold">SẢN PHẨM MỚI</span>
			</h2>
			<div class="mb-4 flex flex-wrap gap-3">
				<button
					v-for="cat in categories"
					:key="cat.value"
					@click="selectCategory(cat.value)"
					:class="['rounded border px-4 py-2 text-sm', selectedCategory === cat.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700']"
				>
					{{ cat.label }}
				</button>
			</div>
		</section>

		<h2 class="mb-3 flex items-center justify-between text-lg font-semibold">
			<span>Sản phẩm</span>
		</h2>

		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<ProductCard
				v-for="p in displayedProducts"
				:key="p.id"
				:product="p"
				@add="addToCart"
				@wishlist="addWishlist"
			/>
		</div>

		<!-- Pagination -->
		<div class="mt-8 flex items-center justify-center gap-6">
			<button
				@click="prevPage"
				:disabled="page === 1"
				aria-label="Trang trước"
				class="px-4 py-3 rounded-2xl bg-gray-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<div class="flex items-center gap-3">
				<input
					v-model.number="page"
					@change="goToPage"
					type="number"
					min="1"
					:step="1"
					:max="totalPages"
					class="w-24 rounded-2xl bg-gray-800/70 border border-gray-600 px-4 py-3 text-center text-lg font-semibold text-white caret-white placeholder-gray-400 no-spin"
				/>
				<span class="text-gray-400 text-lg">/ {{ totalPages }}</span>
			</div>

			<button
				@click="nextPage"
				:disabled="page === totalPages"
				aria-label="Trang kế tiếp"
				class="px-4 py-3 rounded-2xl bg-gray-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
</section>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import ProductCard from '../components/common/ProductCard.vue';
import BannerCarousel from '../components/common/BannerCarousel.vue';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';

const bannerData = ref([
	{
		type: 'image',
		src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop',
		title: 'Bộ sưu tập mùa hè',
		subtitle: 'Giảm giá đặc biệt cho tất cả các mặt hàng.'
	},
	{
		type: 'video',
		src: 'https://videos.pexels.com/video-files/854171/854171-hd_1920_1080_25fps.mp4',
		title: 'Phong cách mới, Năng lượng mới',
		subtitle: 'Khám phá ngay.'
	},
	{
		type: 'image',
		src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
		title: 'Siêu giảm giá cuối tuần',
		subtitle: 'Đừng bỏ lỡ các ưu đãi tuyệt vời.'
	}
]);

const cart = useCartStore();
const productsStore = useProductsStore();

const page = ref(1);
const pageSize = 12;
const productsList = ref([]);

// Voucher sample data
const vouchers = ref([
	{ title: 'Voucher 50K', desc: 'Giảm 50k cho đơn từ 999k', expiry: '2025-12-31', condition: 'Điều kiện' },
	{ title: 'Voucher 80K', desc: 'Giảm 80k cho đơn Online đầu tiên từ 399k', expiry: '2025-12-31', condition: 'Điều kiện' }
]);

// Category filter
const categories = ref([
	{ label: 'TẤT CẢ', value: 'all' },
	{ label: 'NỮ', value: 'nu' },
	{ label: 'NAM', value: 'nam' },
	{ label: 'BÉ GÁI', value: 'begai' },
	{ label: 'BÉ TRAI', value: 'betrai' }
]);
const selectedCategory = ref('all');

function selectCategory(val) {
	selectedCategory.value = val;
	// optionally reset to first page when changing category
	page.value = 1;
}

const totalPages = computed(() => Math.max(1, Math.ceil((productsStore.total || 0) / pageSize)));

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
		image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/400'),
		// try to surface category/gender information if available
		category: (p.category || p.type || '')?.toString(),
		gender: (p.gender || p.sex || '')?.toString()
	}));
	// Scroll to top after loading a new page so user sees the top of product list
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}

function addToCart(p) {
	cart.addItem(p, 1);
}
function addWishlist() {
	/* no-op demo */
}

function prevPage() {
	if (page.value > 1) page.value -= 1;
}
function nextPage() {
	if (page.value < totalPages.value) page.value += 1;
}

function goToPage() {
	const v = Number(page.value) || 1;
	const clamped = Math.min(Math.max(1, Math.floor(v)), totalPages.value || 1);
	page.value = clamped;
}

watch(page, () => {
	loadPage();
});

onMounted(async () => {
	await loadPage();
});

// computed filtered products based on selected category
const displayedProducts = computed(() => {
	if (selectedCategory.value === 'all') return productsList.value;
	const cat = selectedCategory.value;
	return productsList.value.filter((p) => {
		const name = (p.name || '').toLowerCase();
		const category = (p.category || '').toLowerCase();
		const gender = (p.gender || '').toLowerCase();
		if (category && category.includes(cat)) return true;
		if (gender && gender.includes(cat)) return true;
		if (cat === 'nu') return name.includes('nữ') || name.includes('nu');
		if (cat === 'nam') return name.includes('nam');
		if (cat === 'begai') return name.includes('bé') && (name.includes('gái') || name.includes('gaí') || name.includes('gai'));
		if (cat === 'betrai') return name.includes('bé') && (name.includes('trai') || name.includes('boy'));
		return false;
	});
});
</script>

<style scoped>
/* hide number input spinner for webkit */
input[type=number].no-spin::-webkit-outer-spin-button,
input[type=number].no-spin::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
/* hide number input spinner for firefox */
input[type=number].no-spin {
	-moz-appearance: textfield;
}
</style>

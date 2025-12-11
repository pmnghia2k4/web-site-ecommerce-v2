<template>
	<section v-if="product">
		<nav class="mb-4 text-sm text-gray-500">
			<RouterLink to="/" class="hover:underline">Trang chủ</RouterLink> / 
			<RouterLink to="/products" class="hover:underline">Sản phẩm</RouterLink> / 
			<span class="text-gray-700 dark:text-gray-300">{{ product.name }}</span>
		</nav>
		<div class="grid gap-8 md:grid-cols-2">
			<!-- Product Images -->
			<div>
				<!-- Main Image with Navigation -->
				<div class="relative">
					<img :src="selectedImage" :alt="product.name" class="w-full rounded-lg border object-cover dark:border-gray-800" />
					
					<!-- Previous Button -->
					<button 
						v-if="productImages.length > 1"
						@click="previousImage"
						class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
						title="Ảnh trước (←)"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					
					<!-- Next Button -->
					<button 
						v-if="productImages.length > 1"
						@click="nextImage"
						class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
						title="Ảnh tiếp theo (→)"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>

					<!-- Image Counter -->
					<div v-if="productImages.length > 1" class="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
						{{ currentImageIndex + 1 }}/{{ productImages.length }}
					</div>
				</div>

				<!-- Thumbnail Gallery -->
				<div v-if="productImages.length > 1" class="mt-4 flex gap-2 overflow-x-auto">
					<img 
						v-for="(img, idx) in productImages" 
						:key="idx"
						:src="img" 
						:alt="`Product ${idx}`"
						@click="selectImageByIndex(idx)"
						class="h-20 w-20 shrink-0 cursor-pointer rounded border object-cover transition-all dark:border-gray-700"
						:class="{ 'ring-2 ring-gray-900 dark:ring-gray-100': selectedImage === img }"
					/>
				</div>
			</div>

			<!-- Product Info -->
			<div>
				<h1 class="text-2xl font-semibold">{{ product.name }}</h1>
				<p class="mt-2 text-gray-500">{{ product.brand }}</p>
				
				<!-- Rating -->
				<div class="mt-3 flex items-center gap-2">
					<div class="flex items-center">
						<span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
					</div>
					<span class="text-sm text-gray-600 dark:text-gray-400">({{ product.reviews ?? 23 }} đánh giá)</span>
				</div>

				<p class="mt-4 text-2xl font-bold">{{ formatCurrency(product.price) }}</p>

				<!-- Color Selection -->
				<div class="mt-6">
					<label class="block text-sm font-semibold">Màu sắc: <span class="text-gray-600">{{ selectedColor }}</span></label>
					<div class="mt-2 flex gap-3">
						<button
							v-for="color in product.colors"
							:key="color"
							@click="selectedColor = color"
							class="h-8 w-8 rounded-full border-2 transition-all"
							:style="{ backgroundColor: color }"
							:class="{ 'ring-2 ring-offset-2 ring-gray-900 dark:ring-gray-100': selectedColor === color }"
							:title="color"
						/>
					</div>
				</div>

				<!-- Size Selection -->
				<div class="mt-6">
					<label class="block text-sm font-semibold">Kích cỡ: <span class="text-gray-600">{{ selectedSize }}</span></label>
					<div class="mt-2 flex gap-2">
						<button
							v-for="size in product.sizes"
							:key="size"
							@click="selectedSize = size"
							class="rounded border px-4 py-2 font-medium transition-all dark:border-gray-700"
							:class="{ 
								'bg-gray-900 text-white dark:bg-gray-100 dark:text-black': selectedSize === size,
								'border-gray-300 hover:border-gray-400 dark:hover:border-gray-600': selectedSize !== size
							}"
						>
							{{ size }}
						</button>
					</div>
				</div>

				<!-- Product Description -->
				<p class="mt-6 text-sm text-gray-600 dark:text-gray-300">{{ product.description }}</p>

				<!-- Stock Status -->
				<div class="mt-4">
					<p v-if="product.inStock" class="text-sm font-semibold text-green-600 dark:text-green-400">Còn {{ product.stock ?? 'nhiều' }} hàng</p>
					<p v-else class="text-sm font-semibold text-red-600 dark:text-red-400">Hết hàng</p>
				</div>

				<!-- Quantity & Buttons -->
				<div class="mt-6 flex gap-3">
					<div class="flex items-center rounded border dark:border-gray-700">
						<button @click="qty = Math.max(1, qty - 1)" class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">−</button>
						<input v-model.number="qty" type="number" min="1" class="w-16 border-0 bg-transparent text-center" />
						<button @click="qty += 1" class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">+</button>
					</div>
					<button 
						:disabled="!product.inStock"
						class="flex-1 rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200" 
						@click="addToCart"
					>
						THÊM VÀO GIỎ HÀNG
					</button>
					<button 
						@click="toggleWishlist"
						:class="{ 'text-red-500': wishlist.isInWishlist(product.id) }"
						class="rounded border px-4 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
						:title="wishlist.isInWishlist(product.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'"
					>
						{{ wishlist.isInWishlist(product.id) ? '♥' : '♡' }}
					</button>
				</div>

				<!-- Additional Info -->
				<div class="mt-6 border-t pt-4 dark:border-gray-700">
					<p class="text-sm text-blue-600 dark:text-blue-400">
						<a href="#" class="hover:underline">Tìm sản phẩm còn hàng trong của hàng</a>
					</p>
				</div>
			</div>
		</div>

		<!-- Product Details Section -->
		<div class="mt-12 border-t pt-8 dark:border-gray-800">
			<div class="flex gap-4 border-b dark:border-gray-800">
				<button 
					@click="activeTab = 'description'"
					class="px-4 py-2 font-semibold"
					:class="{ 'border-b-2 border-gray-900 dark:border-gray-100': activeTab === 'description' }"
				>
					Mô tả
				</button>
				<button 
					@click="activeTab = 'reviews'"
					class="px-4 py-2 font-semibold"
					:class="{ 'border-b-2 border-gray-900 dark:border-gray-100': activeTab === 'reviews' }"
				>
					Đánh giá ({{ product.reviews ?? 23 }})
				</button>
				<button 
					@click="activeTab = 'tryon'"
					class="px-4 py-2 font-semibold"
					:class="{ 'border-b-2 border-gray-900 dark:border-gray-100': activeTab === 'tryon' }"
				>
					Thử đồ
				</button>
			</div>

			<!-- Description Tab -->
			<div v-if="activeTab === 'description'" class="mt-6">
				<h3 class="mb-3 text-lg font-semibold">Mô tả chi tiết</h3>
				<div class="prose max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
					<p>{{ product.longDescription ?? 'Đang cập nhật...' }}</p>
				</div>
			</div>

			<!-- Reviews Tab -->
			<div v-else-if="activeTab === 'reviews'" class="mt-6">
				<h3 class="mb-6 text-lg font-semibold">Đánh giá sản phẩm</h3>
				
				<!-- Review Summary -->
				<div class="mb-8 flex gap-8">
					<div>
						<p class="text-3xl font-bold">5.0</p>
						<div class="mt-2 flex items-center">
							<span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
						</div>
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ product.reviews ?? 23 }} đánh giá</p>
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-2">
							<span class="w-8 text-sm">{{ rating }}★</span>
							<div class="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
								<div class="h-full rounded-full bg-yellow-400" :style="{ width: (rating === 5 ? 80 : rating === 4 ? 15 : 5) + '%' }"></div>
							</div>
							<span class="w-8 text-right text-sm text-gray-600 dark:text-gray-400">{{ rating === 5 ? 19 : rating === 4 ? 3 : 1 }}</span>
						</div>
					</div>
				</div>

				<!-- Individual Reviews -->
				<div class="space-y-4 border-t pt-6 dark:border-gray-700">
					<div v-for="review in productReviews" :key="review.id" class="border-b pb-4 dark:border-gray-700">
						<div class="flex items-start justify-between">
							<div>
								<p class="font-semibold">{{ review.author }}</p>
								<div class="mt-1 flex items-center gap-2">
									<span v-for="i in review.rating" :key="i" class="text-sm text-yellow-400">★</span>
									<span v-for="i in (5 - review.rating)" :key="i" class="text-sm text-gray-300">★</span>
								</div>
							</div>
							<span class="text-sm text-gray-500">{{ review.date }}</span>
						</div>
						<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
					</div>
				</div>
			</div>

			<!-- Try On Tab -->
			<div v-else-if="activeTab === 'tryon'" class="mt-6">
				<h3 class="mb-6 text-lg font-semibold">Thử đồ với AI</h3>
				<p class="mb-6 text-sm text-gray-600 dark:text-gray-400">Tải ảnh của bạn lên và chọn sản phẩm để xem cách nó trông trên bạn</p>
				
				<div class="grid gap-8 md:grid-cols-2">
					<!-- Upload Image Section -->
					<div>
						<div class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
							<svg v-if="!tryOnImage" class="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
							<img v-else :src="tryOnImage" alt="Your image" class="mx-auto mb-4 max-h-64 rounded" />
							
							<p v-if="!tryOnImage" class="mb-4 text-gray-600 dark:text-gray-400">
								Kéo và thả ảnh của bạn vào đây hoặc
							</p>
							
							<input 
								ref="fileInput"
								type="file" 
								accept="image/*"
								@change="handleImageUpload"
								class="hidden"
							/>
							
							<button 
								@click="$refs.fileInput.click()"
								class="inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
							>
								{{ tryOnImage ? 'Thay ảnh' : 'Chọn ảnh' }}
							</button>
							
							<button 
								v-if="tryOnImage"
								@click="clearImage"
								class="ml-2 rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
							>
								Xóa
							</button>
						</div>
					</div>

					<!-- Selected Product Preview -->
					<div v-if="selectedTryOnProduct" class="rounded-lg border border-blue-300 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
						<h4 class="mb-4 font-semibold text-blue-900 dark:text-blue-100">Sản phẩm đã chọn</h4>
						<div class="flex gap-4">
							<img :src="selectedTryOnProduct.image" :alt="selectedTryOnProduct.name" class="h-32 w-32 rounded-lg object-cover" />
							<div class="flex-1">
								<h5 class="text-lg font-semibold">{{ selectedTryOnProduct.name }}</h5>
								<p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedTryOnProduct.brand }}</p>
								<p class="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(selectedTryOnProduct.price) }}</p>
								<button 
									@click="selectedTryOnProduct = null; tryOnSearch = ''"
									class="mt-3 rounded border border-blue-600 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-950"
								>
									Chọn sản phẩm khác
								</button>
							</div>
						</div>
					</div>

					<!-- Product Selection Section (Hidden when product selected) -->
					<div v-if="!selectedTryOnProduct">
						<h4 class="mb-4 font-semibold">Chọn sản phẩm để thử</h4>
						
						<div class="mb-4 flex gap-2">
							<input 
								v-model="tryOnSearch"
								type="text"
								placeholder="Tìm sản phẩm..."
								class="flex-1 rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
							/>
						</div>

						<div class="max-h-96 space-y-3 overflow-y-auto">
							<div v-if="loadingProducts" class="space-y-2 py-4">
								<div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
							</div>

							<div 
								v-for="prod in filteredStoreProducts"
								:key="prod.id"
								@click="selectedTryOnProduct = prod"
								class="flex cursor-pointer gap-3 rounded border border-gray-300 p-3 transition-all hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
							>
								<img :src="prod.image" :alt="prod.name" class="h-16 w-16 rounded object-cover" />
								<div class="flex-1 text-left">
									<p class="font-semibold">{{ prod.name }}</p>
									<p class="text-sm text-gray-600 dark:text-gray-400">{{ formatCurrency(prod.price) }}</p>
									<p class="mt-1 text-xs text-gray-500">{{ prod.brand }}</p>
								</div>
							</div>

							<p v-if="!loadingProducts && tryOnSearch && filteredStoreProducts.length === 0" class="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
								Không tìm thấy sản phẩm
							</p>
							
							<p v-if="!loadingProducts && storeProducts.length === 0 && !tryOnSearch" class="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
								Bắt đầu gõ để tìm kiếm sản phẩm...
							</p>
						</div>
					</div>
				</div>

				<!-- Try On Button -->
				<div class="mt-6 flex gap-3">
					<button 
						:disabled="!tryOnImage || !selectedTryOnProduct"
						class="flex-1 rounded bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
					>
						🤖 Thử đồ với AI
					</button>
					<button 
						v-if="selectedTryOnProduct"
						@click="addTryOnProductToCart"
						class="flex-1 rounded border border-gray-300 px-4 py-3 font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						Thêm vào giỏ
					</button>
				</div>
			</div>
		</div>
	</section>
	<div v-else class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { useProductsStore } from '../stores/products';
import api from '../utils/api';
import { formatCurrency } from '../utils/helpers';

const route = useRoute();
const cart = useCartStore();
const wishlist = useWishlistStore();
const productsStore = useProductsStore();
const product = ref(null);
const qty = ref(1);
const activeTab = ref('description');
const selectedColor = ref('#8b5cf6');
const selectedSize = ref('M');
const selectedImage = ref('');
const productImages = ref([]);
const currentImageIndex = ref(0);

// Try On feature
const tryOnImage = ref('');
const tryOnSearch = ref('');
const selectedTryOnProduct = ref(null);
const storeProducts = ref([]);
const loadingProducts = ref(false);
const fileInput = ref(null);

// Sample reviews data
const productReviews = ref([
	{ id: 1, author: 'Nguyễn Văn A', rating: 5, date: '2 ngày trước', comment: 'Sản phẩm tuyệt vời! Chất lượng rất tốt, giao hàng nhanh.' },
	{ id: 2, author: 'Trần Thị B', rating: 4, date: '1 tuần trước', comment: 'Rất hài lòng với mua hàng này. Size vừa vặn và màu sắc đúng như mô tả.' },
	{ id: 3, author: 'Lê Văn C', rating: 5, date: '2 tuần trước', comment: 'Tuyệt vời! Mặc rất thoải mái và ấm áp.' }
]);

// Computed for filtered products
const filteredStoreProducts = computed(() => {
	if (!tryOnSearch.value) return storeProducts.value;
	const query = tryOnSearch.value.toLowerCase();
	return storeProducts.value.filter(p => 
		p.name.toLowerCase().includes(query) || 
		p.brand.toLowerCase().includes(query)
	);
});

// Watch for search input changes - auto load products on first search
watch(tryOnSearch, (newVal) => {
	if (newVal && storeProducts.value.length === 0 && !loadingProducts.value) {
		loadStoreProducts();
	}
});

	function generateProductImages(productId, baseImage, w = 800, h = 800) {
		// Generate multiple images for testing image carousel
		// Using picsum.photos with different seeds to get different images
		// Accept width and height so generated images match the original aspect/size
		const sizeUrl = (seed) => `https://picsum.photos/${w}/${h}?random=${productId}_${seed}`;
		return [
			baseImage,
			sizeUrl(1),
			sizeUrl(2),
			sizeUrl(3),
			sizeUrl(4),
		];
	}

	onMounted(async () => {
		const productId = route.params.id;
		const { data } = await api.get(`/products/${productId}`);
		const p = data ?? {};
		const baseImage = p.thumbnail || p.images?.[0] || 'https://picsum.photos/800/800';

		// Set product basic info (immediate)
		product.value = {
			id: p.id,
			name: p.title ?? p.name,
			price: p.price,
			brand: p.brand ?? 'Brand',
			description: p.description ?? 'Mô tả ngắn sản phẩm',
			longDescription: p.description ?? 'Chi tiết sản phẩm sẽ được cập nhật sớm',
			image: p.thumbnail ?? (p.images?.[0] || 'https://picsum.photos/800'),
			colors: ['#e5e7eb', '#a78bfa', '#000000', '#d8b4fe', '#374151', '#0f766e', '#c4b5fd'],
			sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
			stock: 10,
			inStock: true,
			reviews: 23
		};

		// Try to load base image to detect natural dimensions so generated picsum images match original size
		const imgProbe = new Image();
		imgProbe.crossOrigin = 'anonymous';
		imgProbe.src = baseImage;

		imgProbe.onload = () => {
			const w = imgProbe.naturalWidth || 800;
			const h = imgProbe.naturalHeight || Math.round(w * 0.75);
			const images = generateProductImages(productId, baseImage, w, h);
			productImages.value = images;
			selectedImage.value = images[0];
			currentImageIndex.value = 0;
		};

		imgProbe.onerror = () => {
			// fallback generator
			const images = generateProductImages(productId, baseImage);
			productImages.value = images;
			selectedImage.value = images[0];
			currentImageIndex.value = 0;
		};

		// safety timeout in case image load hangs
		setTimeout(() => {
			if (!productImages.value.length) {
				const images = generateProductImages(productId, baseImage);
				productImages.value = images;
				selectedImage.value = images[0];
				currentImageIndex.value = 0;
			}
		}, 1200);


	// Listen for keyboard navigation
	window.addEventListener('keydown', handleKeyboard);
});

function nextImage() {
	if (productImages.value.length === 0) return;
	currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length;
	selectedImage.value = productImages.value[currentImageIndex.value];
}

function previousImage() {
	if (productImages.value.length === 0) return;
	currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length;
	selectedImage.value = productImages.value[currentImageIndex.value];
}

function selectImageByIndex(idx) {
	currentImageIndex.value = idx;
	selectedImage.value = productImages.value[idx];
}

function handleKeyboard(e) {
	if (e.key === 'ArrowLeft') {
		previousImage();
	} else if (e.key === 'ArrowRight') {
		nextImage();
	}
}

function addToCart() {
	if (!product.value) return;
	cart.addItem({
		...product.value,
		selectedColor: selectedColor.value,
		selectedSize: selectedSize.value
	}, qty.value || 1);
}

function toggleWishlist() {
	if (!product.value) return;
	wishlist.toggleItem({
		...product.value,
		selectedColor: selectedColor.value,
		selectedSize: selectedSize.value
	});
}

// Try On Functions
function handleImageUpload(event) {
	const file = event.target.files?.[0];
	if (!file) return;
	
	const reader = new FileReader();
	reader.onload = (e) => {
		tryOnImage.value = e.target?.result;
	};
	reader.readAsDataURL(file);
}

function clearImage() {
	tryOnImage.value = '';
	if (fileInput.value) {
		fileInput.value.value = '';
	}
}

async function loadStoreProducts() {
	loadingProducts.value = true;
	try {
		// Fetch products using the same method as ProductList.vue
		const params = {
			limit: 24,
			skip: 0
		};
		await productsStore.fetchList(params);
		
		// Map products to our format (same as ProductList.vue)
		storeProducts.value = productsStore.items.map(p => ({
			id: p.id,
			name: p.title || p.name,
			brand: p.brand || 'Brand',
			price: p.price,
			image: p.thumbnail || (p.images?.[0] || 'https://picsum.photos/400')
		}));
		
		console.log('Loaded store products:', storeProducts.value);
	} catch (error) {
		console.error('Failed to load products:', error);
	} finally {
		loadingProducts.value = false;
	}
}

function addTryOnProductToCart() {
	if (!selectedTryOnProduct.value) return;
	cart.addItem({
		...selectedTryOnProduct.value,
		selectedColor: selectedColor.value,
		selectedSize: selectedSize.value
	}, qty.value || 1);
}
</script>



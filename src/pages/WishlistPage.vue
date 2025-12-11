<template>
	<section>
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-semibold">Sản phẩm yêu thích</h1>
				<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ wishlist.itemCount }} sản phẩm</p>
			</div>
			<button 
				v-if="wishlist.itemCount > 0"
				@click="clearAll"
				class="rounded border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
			>
				Xóa tất cả
			</button>
		</div>

		<!-- Empty State -->
		<div v-if="wishlist.itemCount === 0" class="rounded-lg border p-12 text-center dark:border-gray-800">
			<p class="text-lg font-semibold text-gray-700 dark:text-gray-300">Chưa có sản phẩm yêu thích</p>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Khám phá và thêm những sản phẩm bạn thích vào danh sách yêu thích</p>
			<RouterLink 
				to="/products" 
				class="mt-4 inline-block rounded bg-gray-900 px-6 py-2 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
			>
				Tiếp tục mua sắm
			</RouterLink>
		</div>

		<!-- Wishlist Items -->
		<div v-else class="space-y-4">
			<div 
				v-for="item in wishlist.items" 
				:key="item.id"
				class="flex gap-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
			>
				<!-- Product Image -->
				<div class="relative shrink-0">
					<img 
						:src="item.image" 
						:alt="item.name"
						class="h-40 w-40 rounded-lg object-cover"
					/>
					
					<!-- Heart Badge -->
					<div class="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md dark:bg-gray-800">
						<svg class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
						</svg>
					</div>
				</div>

				<!-- Product Info -->
				<div class="flex flex-1 flex-col justify-between">
					<div>
						<!-- Brand & Title -->
						<p class="text-xs text-gray-500 dark:text-gray-400">{{ item.brand }}</p>
						<h3 class="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{{ item.name }}</h3>

						<!-- SKU -->
						<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
							Mã sản phẩm: <span class="font-semibold">{{ item.id }}</span>
						</p>

						<!-- Color & Size -->
						<div class="mt-4 space-y-2 border-t border-gray-200 pt-3 dark:border-gray-700">
							<div class="flex items-center gap-3">
								<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Màu sắc:</span>
								<div 
									class="h-6 w-6 rounded-full border-2 border-gray-300"
									:style="{ backgroundColor: item.selectedColor }"
									:title="item.selectedColor"
								/>
								<span class="text-sm text-gray-600 dark:text-gray-400">{{ item.selectedColor }}</span>
							</div>
							<div class="flex items-center gap-3">
								<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Kích cỡ:</span>
								<span class="rounded border border-gray-300 px-3 py-1 text-sm dark:border-gray-700">{{ item.selectedSize }}</span>
							</div>
						</div>
					</div>

					<!-- Price & Actions -->
					<div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
						<p class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ formatCurrency(item.price) }}</p>
						<div class="flex gap-2">
							<button 
								@click="addToCart(item)"
								class="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200"
							>
								Thêm vào giỏ
							</button>
							<button 
								@click="removeFromWishlist(item.id)"
								class="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
								title="Bỏ yêu thích"
							>
								Xóa
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { formatCurrency } from '../utils/helpers';

const cart = useCartStore();
const wishlist = useWishlistStore();

function removeFromWishlist(id) {
	wishlist.removeItem(id);
}

function clearAll() {
	if (confirm('Bạn chắc chắn muốn xóa tất cả sản phẩm yêu thích?')) {
		wishlist.clear();
	}
}

function addToCart(item) {
	cart.addItem(item, 1);
}
</script>



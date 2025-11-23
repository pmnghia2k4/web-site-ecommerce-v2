<template>
	<header class="border-b bg-white/70 backdrop-blur dark:bg-gray-900/60">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
			<RouterLink to="/" class="flex items-center" title="Trang chủ">
				<img :src="logoUrl" alt="Home" class="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
			</RouterLink>
			<div class="hidden flex-1 px-6 md:block">
				<SearchBar @search="onSearch" />
			</div>
			<nav class="flex items-center gap-3">
				<RouterLink to="/wishlist" class="hover:underline">Yêu thích</RouterLink>
				<RouterLink to="/products" class="hover:underline">Danh sách sản phẩm</RouterLink>
				<RouterLink to="/cart" class="relative hover:underline">
					Giỏ hàng
					<span v-if="cartCount" class="absolute -right-3 -top-2 rounded-full bg-red-600 px-2 text-xs text-white">{{ cartCount }}</span>
				</RouterLink>
				<RouterLink v-if="!isAuth" to="/auth" class="hover:underline">Đăng nhập</RouterLink>
				<div v-else class="flex items-center gap-2">
					<RouterLink to="/profile" class="hover:underline">{{ userName }}</RouterLink>
					<button @click="logout" class="text-sm text-gray-500 hover:underline">Thoát</button>
				</div>
				<button class="ml-2 text-sm" @click="toggleTheme">{{ isDark ? '🌙' : '☀️' }}</button>
			</nav>
		</div>
		<div class="px-4 pb-3 md:hidden">
			<SearchBar @search="onSearch" />
		</div>
	</header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useUserStore } from '../../stores/user';
import { useUIStore } from '../../stores/ui';
import { APP_NAME } from '../../utils/constants';
import SearchBar from '../forms/SearchBar.vue';

// Vite-friendly import for static asset; replace `src/assets/logo.svg.jpg` to change logo
const logoUrl = new URL('../../assets/logo.svg.jpg', import.meta.url).href;

const router = useRouter();
const cart = useCartStore();
const user = useUserStore();
const ui = useUIStore();

const appName = APP_NAME;
const cartCount = computed(() => cart.itemCount);
const isAuth = computed(() => user.isAuthenticated);
const userName = computed(() => user.profile?.name ?? 'User');
const isDark = computed(() => ui.isDarkMode);

function onSearch(q) {
	router.push({ path: '/search', query: { q } });
}
function toggleTheme() {
	ui.setTheme(ui.isDarkMode ? 'light' : 'dark');
}
function logout() {
	user.logout();
	router.push('/');
}
</script>



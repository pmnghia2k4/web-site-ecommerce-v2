<template>
	<header class="relative z-20 border-b bg-white/70 backdrop-blur dark:bg-gray-900/60">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
			<RouterLink to="/" class="flex items-center" title="Trang chủ">
				<img :src="logoUrl" alt="Home" class="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
			</RouterLink>
			<div class="hidden flex-1 px-6 md:block">
				<SearchBar @search="onSearch" />
			</div>
			<nav class="flex items-center gap-4">
				<RouterLink to="/cart" class="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
					<span v-if="cartCount" class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">{{ cartCount }}</span>
				</RouterLink>
				<RouterLink v-if="!isAuth" to="/auth" class="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
					Đăng nhập
				</RouterLink>
				<div v-else class="relative">
					<!-- Dropdown Trigger -->
					<button @click="isDropdownOpen = !isDropdownOpen" class="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
					</button>

					<!-- Dropdown Panel -->
					<div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 z-10">
						<RouterLink to="/wishlist" @click="isDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Yêu thích</RouterLink>
						<RouterLink to="/products" @click="isDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Danh sách sản phẩm</RouterLink>
						<RouterLink to="/profile" @click="isDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Trang cá nhân</RouterLink>
						<button @click="logoutAndClose" class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Đăng xuất</button>
					</div>
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useUserStore } from '../../stores/user';
import { useUIStore } from '../../stores/ui';
import { APP_NAME } from '../../utils/constants';
import SearchBar from '../forms/SearchBar.vue';

// Vite-friendly import for static asset; replace `src/assets/logo.svg.jpg` to change logo
const logoUrl = new URL('../../assets/logoweb.png', import.meta.url).href;

const router = useRouter();
const cart = useCartStore();
const user = useUserStore();
const ui = useUIStore();

const appName = APP_NAME;
const cartCount = computed(() => cart.itemCount);
const isAuth = computed(() => user.isAuthenticated);
const userName = computed(() => user.profile?.name ?? 'User');
const isDark = computed(() => ui.isDarkMode);
const isDropdownOpen = ref(false);

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
function logoutAndClose() {
	isDropdownOpen.value = false;
	logout();
}
</script>



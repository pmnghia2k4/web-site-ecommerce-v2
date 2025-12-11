<template>
	<div class="min-h-screen lg:flex">
		<!-- Desktop sidebar -->
		<aside class="hidden lg:flex lg:h-screen lg:w-64 lg:flex-col lg:gap-6 lg:py-6 lg:px-4 bg-white border-r dark:bg-gray-900 dark:border-gray-800">
			<div class="flex items-center gap-3 px-2">
				<div class="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">A</div>
				<div>
					<div class="text-lg font-semibold">Admin</div>
					<div class="text-xs text-gray-500">Control Panel</div>
				</div>
			</div>

			<nav class="mt-4 flex flex-1 flex-col gap-1">
				<RouterLink
					to="/admin"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path === '/admin' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 6h18M3 18h18"/></svg>
					Dashboard
				</RouterLink>

				<RouterLink
					to="/admin/products"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/products') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
					Products
				</RouterLink>

				<RouterLink
					to="/admin/orders"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/orders') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v4H3zM3 10h18v11H3z"/></svg>
					Orders
				</RouterLink>

				<RouterLink
					to="/admin/invoices"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/invoices') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
					Invoices
				</RouterLink>

				<RouterLink
					to="/admin/users"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/users') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
					Users
				</RouterLink>

				<RouterLink
					to="/admin/banners"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/banners') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
					Banners
				</RouterLink>

				<RouterLink
					to="/admin/reports"
					class="group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
					:class="$route.path.startsWith('/admin/reports') ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''"
				>
					<svg class="h-5 w-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V3m0 8a8 8 0 100 16 8 8 0 000-16z"/></svg>
					Reports
				</RouterLink>
			</nav>

			<div class="mt-auto px-2">
				<button @click="logout" class="w-full rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:opacity-95 dark:bg-gray-100 dark:text-black">Đăng xuất</button>
			</div>
		</aside>

		<!-- Mobile header + optional sidebar overlay -->
		<div class="lg:hidden border-b bg-white dark:bg-gray-900 dark:border-gray-800">
			<div class="flex items-center justify-between px-4 py-3">
				<div class="flex items-center gap-3">
					<button @click="showSidebar = true" aria-label="Open menu" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
						<svg class="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
					</button>
					<RouterLink to="/" class="text-sm text-gray-600 dark:text-gray-300">← Quay lại trang chủ</RouterLink>
				</div>
				<button @click="logout" class="rounded bg-gray-900 px-3 py-1 text-white text-sm dark:bg-gray-100 dark:text-black">Đăng xuất</button>
			</div>

			<!-- mobile off-canvas -->
			<transition name="fade">
				<div v-if="showSidebar" class="fixed inset-0 z-40 flex">
					<div class="w-64 bg-white p-4 dark:bg-gray-900 border-r dark:border-gray-800">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<div class="h-8 w-8 rounded-md bg-indigo-500 flex items-center justify-center text-white">A</div>
								<div class="text-sm font-medium">Admin</div>
							</div>
							<button @click="showSidebar = false" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
								<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
							</button>
						</div>
						<nav class="mt-4 flex flex-col gap-1">
							<RouterLink @click="showSidebar = false" to="/admin" class="py-2">Dashboard</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/products" class="py-2">Products</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/orders" class="py-2">Orders</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/invoices" class="py-2">Invoices</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/users" class="py-2">Users</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/banners" class="py-2">Banners</RouterLink>
							<RouterLink @click="showSidebar = false" to="/admin/reports" class="py-2">Reports</RouterLink>
						</nav>
					</div>
					<div @click="showSidebar = false" class="flex-1 bg-black/40" />
				</div>
			</transition>
		</div>

		<!-- Main content -->
		<div class="flex-1">
			<main class="px-4 py-6 lg:ml-0">
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useRouter, useRoute } from 'vue-router';

const user = useUserStore();
const router = useRouter();
const $route = useRoute();
const showSidebar = ref(false);

function logout() {
	user.logout();
	router.push('/');
}
</script>



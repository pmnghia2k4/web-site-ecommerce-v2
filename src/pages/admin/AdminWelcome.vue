<template>
	<section class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
		<div class="max-w-2xl mx-auto text-center">
			<!-- Logo/Icon -->
			<div class="mb-8">
				<div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-600 dark:bg-blue-700 shadow-lg">
					<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
			</div>

			<!-- Welcome Heading -->
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Chào mừng đến với Trang Quản Trị
			</h1>

			<!-- Subheading -->
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
				Xin chào, <span class="font-semibold text-blue-600 dark:text-blue-400">{{ adminName }}</span>!
			</p>

			<!-- Description -->
			<p class="text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
				Bạn có quyền truy cập vào các công cụ quản lý toàn diện. Từ quản lý sản phẩm, đơn hàng, người dùng đến các báo cáo chi tiết. 	
			</p>

			<!-- Features Preview -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<div class="mb-3">
						<svg class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Quản lý Sản phẩm</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Thêm, sửa, xóa sản phẩm</p>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<div class="mb-3">
						<svg class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Quản lý Đơn hàng</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Xem và xử lý đơn hàng</p>
				</div>

				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<div class="mb-3">
						<svg class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Quản lý Người dùng</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Quản lý tài khoản người dùng</p>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<RouterLink 
					to="/admin"
					class="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors shadow-md"
				>
					Tiếp tục đến Bảng Điều Khiển
				</RouterLink>
				<!-- <RouterLink 
					to="/"
					class="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
				>
					Quay lại Trang chủ
				</RouterLink> -->
			</div>

			<!-- Footer Note -->
			<div class="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
				<!-- <p class="text-sm text-gray-600 dark:text-gray-400">
					Bạn đã đăng nhập với quyền quản trị viên. Vui lòng sử dụng các công cụ một cách có trách nhiệm.
				</p> -->
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '../../stores/user';

const user = useUserStore();

const adminName = computed(() => {
	return user.profile?.username || 'admin';
});
</script>

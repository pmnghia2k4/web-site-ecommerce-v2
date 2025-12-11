<template>
	<footer class="bg-gray-900 text-white py-12 mt-12">
		<div class="mx-auto max-w-7xl px-4">
			<!-- Footer Grid -->
			<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-5 mb-8">
		<!-- Về chúng tôi -->
		<div>
			<h3 class="mb-4 text-lg font-semibold">Về chúng tôi</h3>
			<ul class="space-y-2 text-sm text-gray-300">
				<li><RouterLink to="/about" class="hover:text-white">Thông tin</RouterLink></li>
				<li><RouterLink to="/about" class="hover:text-white">Danh sách cửa hàng</RouterLink></li>
				<li><RouterLink to="/about" class="hover:text-white">Cơ Hội Nghề Nghiệp</RouterLink></li>
			</ul>
		</div>				<!-- Trợ giúp -->
				<div>
					<h3 class="mb-4 text-lg font-semibold">Trợ giúp</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><a href="#" class="hover:text-white">FAQ</a></li>
						<li><a href="#" class="hover:text-white">Chính sách trả hàng</a></li>
						<li><a href="#" class="hover:text-white">Chính sách bảo mật</a></li>
						<li><a href="#" class="hover:text-white">Tiếp cận</a></li>
					</ul>
				</div>

				<!-- Tài khoản -->
				<div>
					<h3 class="mb-4 text-lg font-semibold">Tài khoản</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><RouterLink to="/profile" class="hover:text-white">Tư cách thành viên</RouterLink></li>
						<li><a href="#" class="hover:text-white">Hồ sơ</a></li>
						<li><a href="#" class="hover:text-white">Coupons</a></li>
					</ul>
				</div>

				<!-- Bản tin điện tử -->
				<div>
					<h3 class="mb-4 text-lg font-semibold">Bản tin điện tử</h3>
					<p class="mb-4 text-sm text-gray-300">Đăng ký ngay và là người đầu tiên năm được thông tin khi có mặt hàng mới, khuyến mại, các sự kiện sắp diễn ra tại cửa hàng và nhiều thông tin hữu ích khác.</p>
					<RouterLink to="/auth" class="inline-block bg-white text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">ĐĂNG KÝ NGAY</RouterLink>
				</div>

				<!-- Tài khoản xã hội -->
				<div>
					<h3 class="mb-4 text-lg font-semibold">Tài khoản xã hội UNIQLO</h3>
					<div class="flex gap-4">
						<a href="https://facebook.com" target="_blank" rel="noopener" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 transition-colors" title="Facebook">
							<svg class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
						</a>
						<a href="https://instagram.com" target="_blank" rel="noopener" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 transition-colors" title="Instagram">
							<svg class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.88.266-1.5.578-2.122 1.201-.623.623-.935 1.242-1.2 2.122-.266.788-.467 1.658-.527 2.936C.008 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.528 2.936.266.879.578 1.5 1.201 2.122.623.623 1.242.935 2.122 1.2.788.267 1.658.468 2.936.528 1.28.058 1.687.072 4.947.072s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.936-.528.879-.266 1.5-.578 2.122-1.201.623-.623.935-1.242 1.2-2.122.267-.788.468-1.658.528-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.528-2.936-.266-.879-.578-1.5-1.201-2.122-.623-.623-1.242-.935-2.122-1.2-.788-.267-1.658-.468-2.936-.528C15.667.008 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.561.217.96.477 1.382.896.419.42.679.821.896 1.381.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.561-.477.96-.896 1.382-.42.419-.821.679-1.381.896-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.561-.217-.96-.477-1.382-.896-.419-.42-.679-.821-.896-1.381-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.561.477-.96.896-1.382.42-.419.821-.679 1.381-.896.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
						</a>
						<a href="https://youtube.com" target="_blank" rel="noopener" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 transition-colors" title="YouTube">
							<svg class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
						</a>
						<a href="https://tiktok.com" target="_blank" rel="noopener" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 transition-colors" title="TikTok">
							<svg class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M19.498 6.186a3.016 3.016 0 0 1-2.122-2.136C16.505 3.545 12 3.545 12 3.545s0 0 0 0V12s0 0 0 0c-3.314 0-6-2.686-6-6s2.686-6 6-6c1.566 0 3.031.6 4.122 1.678.366.366.366.96 0 1.326-.366.366-.96.366-1.326 0-.823-.823-1.92-1.275-3.122-1.275-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c1.934 0 3.61-1.22 4.26-2.93h-4.26v-1.885h6.5c.275 1.84.275 3.84-.183 5.74-.824 3.456-3.71 5.932-7.317 5.932-4.142 0-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5c1.566 0 3.031.6 4.122 1.678.366.366.96.366 1.326 0 .366-.366.366-.96 0-1.326C15.508 2.6 13.932 2.045 12 2.045 7.858 2.045 4.5 5.403 4.5 9.545s3.358 7.5 7.5 7.5c3.607 0 6.493-2.476 7.317-5.932.458-1.9.458-3.9.183-5.74h-1.502V6.186z"/></svg>
						</a>
					</div>
				</div>
			</div>

			<!-- Divider -->
			<div class="border-t border-gray-700 pt-6">
				<p class="text-center text-sm text-gray-400">© {{ new Date().getFullYear() }} {{ appName }}. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { APP_NAME } from '../../utils/constants';
const appName = APP_NAME;
</script>



<template>
	<div class="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4 py-12">
		<div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

			<!-- Left promo panel (hidden on small screens) -->
			<div class="hidden md:flex flex-col justify-center rounded-2xl overflow-hidden shadow-lg bg-cover bg-center" style="background-image: url('/src/assets/logoweb.png')">
				<div class="bg-black/45 p-8 h-full flex flex-col justify-center">
					<img src="/src/assets/logoweb.png" alt="Logo" class="h-12 mb-4 w-auto opacity-95" />
					<h2 class="text-3xl font-bold text-white mb-2">Phong cách & Chất lượng</h2>
					<p class="text-sm text-white/90 mb-4">Khám phá bộ sưu tập quần áo thời thượng - thiết kế tinh tế, chất liệu cao cấp.</p>
					<ul class="space-y-3 text-sm text-white/90">
						<li class="flex items-start gap-3"><span class="text-amber-300">●</span> Thiết kế hiện đại</li>
						<li class="flex items-start gap-3"><span class="text-amber-300">●</span> Chất liệu cao cấp</li>
						<li class="flex items-start gap-3"><span class="text-amber-300">●</span> Giao hàng nhanh & an toàn</li>
					</ul>
				</div>
			</div>

			<!-- Right - Auth form card -->
			<div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border dark:border-gray-800 overflow-hidden">
				<div class="px-6 py-6">
					<div class="flex items-center justify-center mb-4">
						<img src="/src/assets/logoweb.png" alt="Logo" class="h-14 w-auto" />
					</div>

					<!-- Social login -->
					<div class="flex flex-col gap-3 mb-4">
						<button class="w-full inline-flex items-center justify-center gap-3 border rounded-md px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
							<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
							<span class="flex-1 text-left">Tiếp tục với Google</span>
						</button>
					</div>

					<div class="flex items-center gap-3 mb-4">
						<div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
						<div class="text-xs text-gray-500 dark:text-gray-400">hoặc</div>
						<div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
					</div>

					<!-- Form Content -->
					<div>
						<form v-if="isLogin" class="space-y-4" @submit.prevent="handleLogin">
							<div>
								<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Email hoặc Tên đăng nhập</label>
								<div class="relative">
									<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zM2 20a8 8 0 0116 0"></path></svg>
									</span>
									<input v-model="loginForm.username" type="text" placeholder="Nhập email hoặc tên đăng nhập" class="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Mật khẩu</label>
								<div class="relative">
									<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m0-10a4 4 0 10-8 0v2h8V5z"></path></svg>
									</span>
									<input v-model="loginForm.password" type="password" placeholder="Nhập mật khẩu" class="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
							</div>

							<div class="flex items-center justify-between text-sm">
								<label class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
									<input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
									<span>Ghi nhớ tôi</span>
								</label>
								<button @click.prevent="showForgot = true" class="text-sm text-gray-600 dark:text-gray-300 hover:underline">Quên mật khẩu?</button>
							</div>

							<button type="submit" class="w-full py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded hover:bg-black transition dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200">Đăng nhập</button>
						</form>

						<form v-else class="space-y-4" @submit.prevent="handleRegister">
							<div class="grid grid-cols-2 gap-3">
								<div>
									<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Tên đầy đủ</label>
									<input v-model="registerForm.fullName" type="text" placeholder="Họ và tên" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Tên đăng nhập</label>
									<input v-model="registerForm.username" type="text" placeholder="Tên đăng nhập" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Email</label>
								<input v-model="registerForm.email" type="email" placeholder="example@email.com" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Số điện thoại</label>
								<input v-model="registerForm.phone" type="tel" placeholder="0901234567" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
							</div>

							<div class="grid grid-cols-2 gap-3">
								<div>
									<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Mật khẩu</label>
									<input v-model="registerForm.password" type="password" placeholder="Tối thiểu 6 ký tự" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">Xác nhận mật khẩu</label>
									<input v-model="registerForm.confirm" type="password" placeholder="Nhập lại mật khẩu" class="w-full px-4 py-2.5 border border-gray-300 rounded text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100" required />
								</div>
							</div>

							<button type="submit" class="w-full py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded hover:bg-black transition dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200">Tạo tài khoản</button>
						</form>
					</div>

					<div class="mt-5 text-center text-sm">
						<button v-if="isLogin" @click.prevent="toggleMode" class="text-gray-600 dark:text-gray-300 hover:underline">
							Chưa có tài khoản? <span class="font-semibold">Đăng ký ngay</span>
						</button>
						<button v-else @click.prevent="toggleMode" class="text-gray-600 dark:text-gray-300 hover:underline">
							Đã có tài khoản? <span class="font-semibold">Đăng nhập</span>
						</button>
					</div>

					<div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">Bằng việc đăng ký bạn đồng ý với Điều khoản &amp; Chính sách của chúng tôi.</div>
				</div>
			</div>

		</div>

		<!-- Forgot Password Modal Markup -->
		<div v-if="showForgot" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Quên mật khẩu</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.</p>
				<div class="mb-4">
					<input v-model="forgotEmail" type="email" placeholder="Email của bạn" class="w-full px-4 py-2 border rounded dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" />
				</div>
				<div class="flex justify-end gap-3">
					<button @click="showForgot = false" class="px-4 py-2 rounded border text-sm">Hủy</button>
					<button @click="handleForgotPassword" class="px-4 py-2 rounded bg-gray-900 text-white text-sm">Gửi</button>
				</div>
			</div>
		</div>


	</div>
</template>



<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useUIStore } from '../stores/ui';
import { Login, Register } from '../utils/user_service_api';
import axios from 'axios';
// Verify modal removed per user request

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const ui = useUIStore();

const isLogin = ref(true);
const loginForm = reactive({ username: '', password: '' });
const registerForm = reactive({
	fullName: '',
	username: '',
	email: '',
	phone: '',
	password: '',
	confirm: '',
	avatar_url: 'heheheh',
	role: 'customer',
	status: 'active'
});

const showForgot = ref(false);
const forgotEmail = ref('');

function toggleMode() {
	isLogin.value = !isLogin.value;
}

const handleLogin = async () => {
	loginForm.username = loginForm.username.trim();

	if (!loginForm.username || !loginForm.password) {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập đầy đủ thông tin' });
		return;
	}

	try {
		const res = await Login({
			username: loginForm.username,
			email: loginForm.username,
			password: loginForm.password,
		});

		const result = res.data;

		if (result.success) {
			user.login({
				token: result.data.token,
				profile: {
					id: result.data.user.id,
					username: result.data.user.username,
					email: result.data.user.email,
					fullname: result.data.user.full_name,
					phone: result.data.user.phone,
					avatar_url: result.data.user.avatar_url,
					role: result.data.user.role,
				},
				role: result.data.user.role
			});

			ui.pushToast({ type: 'success', message: result.message || 'Đăng nhập thành công!' });

			loginForm.username = '';
			loginForm.password = '';

			const redirect = route.query.redirect || '/';

			if (result.data.user.role === 'admin') {
				router.replace('/admin/welcome');
			} else {
				router.replace(redirect);
			}

		} else {
			ui.pushToast({ type: 'error', message: result.message || 'Đăng nhập thất bại' });
		}

	} catch (err) {
		console.error('Login error:', err);

		let errorMsg = 'Lỗi kết nối đến server';

		if (err.response?.data?.message) {
			errorMsg = err.response.data.message;
		} else if (err.response?.status === 401) {
			errorMsg = 'Tài khoản hoặc mật khẩu không đúng';
		} else if (err.response?.status === 400) {
			errorMsg = 'Dữ liệu gửi lên không hợp lệ';
		}

		ui.pushToast({ type: 'error', message: errorMsg });
	}
};

// Verify modal handlers removed

const handleRegister = async () => {
	registerForm.username = registerForm.username.trim();
	registerForm.email = registerForm.email.trim();
	registerForm.phone = registerForm.phone.trim();
	registerForm.fullName = registerForm.fullName.trim();

	if (!registerForm.fullName || !registerForm.username || !registerForm.email ||
		!registerForm.phone || !registerForm.password || !registerForm.confirm) {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập đầy đủ thông tin' });
		return;
	}

	if (registerForm.password !== registerForm.confirm) {
		ui.pushToast({ type: 'error', message: 'Mật khẩu xác nhận không khớp' });
		return;
	}

	if (registerForm.password.length < 6) {
		ui.pushToast({ type: 'error', message: 'Mật khẩu phải từ 6 ký tự trở lên' });
		return;
	}

	try {
		const res = await Register({
			username: registerForm.username,
			email: registerForm.email,
			password: registerForm.password,
			full_name: registerForm.fullName,
			phone: registerForm.phone,
			role: ""
		});

		const result = res.data;

		if (result.success) {
					ui.pushToast({ type: 'success', message: 'Đăng ký thành công!' });

					user.login({
						token: result.data.token,
						profile: {
							id: result.data.user.id,
							username: result.data.user.username,
							email: result.data.user.email,
							name: result.data.user.full_name,
							phone: result.data.user.phone,
							avatar: result.data.user.avatar_url,
							role: result.data.user.role,
						},
						role: result.data.user.role
					});

					registerForm.fullName = '';
					registerForm.username = '';
					registerForm.email = '';
					registerForm.phone = '';
					registerForm.password = '';
					registerForm.confirm = '';

					router.replace('/');
		}

	} catch (err) {
		console.error(err);
		const msg = err.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại';
		ui.pushToast({ type: 'error', message: msg });
	}
};

const handleForgotPassword = async () => {
	const email = String(forgotEmail.value || '').trim();
	if (!email) {
		ui.pushToast({ type: 'error', message: 'Vui lòng nhập email' });
		return;
	}

	try {
		// Attempt to call backend forgot-password endpoint; if backend not available this will fail silently
		await axios.post('http://localhost:3000/api/v1/users/forgot-password', { email });
		ui.pushToast({ type: 'success', message: 'Yêu cầu đặt lại mật khẩu đã được gửi (kiểm tra email)' });
		showForgot.value = false;
		forgotEmail.value = '';
	} catch (err) {
		console.error('Forgot password error:', err);
		const msg = err.response?.data?.message || 'Không thể gửi yêu cầu, vui lòng thử lại sau';
		ui.pushToast({ type: 'error', message: msg });
	}
};
</script>

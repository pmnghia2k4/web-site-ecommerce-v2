<template>
	<div class="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
		<!-- Header -->
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h1>
				<p class="text-gray-600">Bạn có {{ orders.length }} đơn hàng</p>
			</div>
			<RouterLink
				to="/"
				class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
			>
				← Tiếp tục mua sắm
			</RouterLink>
		</div>

		<!-- Orders List -->
		<div v-if="orders.length > 0" class="space-y-4">
			<div
				v-for="order in orders"
				:key="order.id"
				class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
			>
				<!-- Order Header -->
				<div class="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
					<div class="flex-1">
						<div class="flex items-center gap-3 mb-2">
							<h3 class="text-lg font-semibold text-gray-900">{{ order.id }}</h3>
							<span
								:class="[
									'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
									statusBadgeClass(order.status)
								]"
							>
								{{ getStatusLabel(order.status) }}
							</span>
						</div>
						<p class="text-sm text-gray-600">Ngày đặt: {{ order.createdAt }}</p>
					</div>
				</div>

				<!-- Order Items -->
				<div class="mb-4 pb-4 border-b border-gray-200">
					<p class="text-sm font-medium text-gray-700 mb-3">Sản phẩm ({{ order.items.length }})</p>
					<div class="space-y-2">
						<div
							v-for="item in order.items"
							:key="item.id"
							class="flex items-center justify-between text-sm"
						>
							<div class="flex items-center gap-2 flex-1">
								<img
									v-if="item.image"
									:src="item.image"
									:alt="item.name"
									class="w-12 h-12 object-cover rounded"
								/>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{{ item.name }}</p>
									<p class="text-xs text-gray-600">x{{ item.quantity }}</p>
								</div>
							</div>
							<p class="font-medium text-gray-900">{{ formatCurrency(item.price) }}</p>
						</div>
					</div>
				</div>

				<!-- Order Details -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
					<div>
						<p class="text-xs text-gray-600 uppercase tracking-wider mb-1">Phương thức thanh toán</p>
						<p class="font-semibold text-gray-900">{{ getPaymentLabel(order.paymentMethod) }}</p>
					</div>
					<div>
						<p class="text-xs text-gray-600 uppercase tracking-wider mb-1">Tổng sản phẩm</p>
						<p class="font-semibold text-gray-900">{{ order.items.length }}</p>
					</div>
					<div>
						<p class="text-xs text-gray-600 uppercase tracking-wider mb-1">Tổng tiền</p>
						<p class="font-semibold text-lg text-blue-600">{{ formatCurrency(order.subtotal) }}</p>
					</div>
					<div>
						<p class="text-xs text-gray-600 uppercase tracking-wider mb-1">Cập nhật lúc</p>
						<p class="font-semibold text-gray-900 text-sm">{{ order.updatedAt }}</p>
					</div>
				</div>

				<!-- Shipping Address -->
				<div class="mb-4 pb-4 border-b border-gray-200">
					<p class="text-sm font-medium text-gray-700 mb-2">Địa chỉ giao hàng</p>
					<p class="text-sm text-gray-600">
						{{ order.shippingInfo.fullName }}<br />
						{{ order.shippingInfo.address }}, {{ order.shippingInfo.ward }},
						{{ order.shippingInfo.district }}, {{ order.shippingInfo.province }}<br />
						📞 {{ order.shippingInfo.phone }} | 📧 {{ order.shippingInfo.email }}
					</p>
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-3">
					<RouterLink
						:to="`/orders/${order.id}`"
						class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
					>
						Xem chi tiết
					</RouterLink>
					<button
						@click="reorderItems(order)"
						class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
					>
						Đặt lại
					</button>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else class="text-center py-16">
			<div class="mb-4">
				<svg
					class="w-16 h-16 mx-auto text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
			</div>
			<h3 class="text-lg font-medium text-gray-900 mb-2">Không có đơn hàng nào</h3>
			<p class="text-gray-600 mb-6">Bạn chưa có lịch sử mua hàng</p>
			<RouterLink
				to="/"
				class="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
			>
				Tiếp tục mua sắm
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';
import { formatCurrency } from '@/utils/helpers';

const orderStore = useOrderStore();
const cartStore = useCartStore();
const uiStore = useUIStore();

// `orderStore.getAllOrders` is already a computed ref in the store,
// use it directly so template unwrap works as an array.
const orders = orderStore.getAllOrders;

const statusBadgeClass = (status) => {
	const statusClasses = {
		pending: 'bg-yellow-100 text-yellow-800',
		processing: 'bg-blue-100 text-blue-800',
		shipped: 'bg-purple-100 text-purple-800',
		delivered: 'bg-green-100 text-green-800',
		cancelled: 'bg-red-100 text-red-800'
	};
	return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status) => {
	const statusLabels = {
		pending: 'Đang xử lý',
		processing: 'Đang chuẩn bị',
		shipped: 'Đang giao',
		delivered: 'Đã giao',
		cancelled: 'Đã hủy'
	};
	return statusLabels[status] || status;
};

const getPaymentLabel = (method) => {
	const paymentLabels = {
		cod: 'Thanh toán khi nhận hàng',
		momo: 'Ví MoMo'
	};
	return paymentLabels[method] || method;
};

const reorderItems = (order) => {
	cartStore.reset();
	order.items.forEach(item => {
		cartStore.addToCart({
			id: item.id,
			name: item.name,
			price: item.price,
			image: item.image,
			quantity: item.quantity,
			color: item.color,
			size: item.size,
			sku: item.sku
		});
	});
	uiStore.pushToast({
		type: 'success',
		message: `Đã thêm ${order.items.length} sản phẩm vào giỏ hàng`
	});
};
</script>



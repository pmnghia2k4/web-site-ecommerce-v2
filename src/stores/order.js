import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useOrderStore = defineStore('order', () => {
	const orders = ref([]);

	const getOrderById = (orderId) => {
		return orders.value.find(o => o.id === orderId);
	};

	const addOrder = (orderData) => {
		const newOrder = {
			id: `ORD-${Date.now()}`,
			items: orderData.items || [],
			shippingInfo: orderData.shippingInfo || {},
			paymentMethod: orderData.paymentMethod || 'cod',
			subtotal: orderData.subtotal || 0,
			status: 'pending', // pending, processing, shipped, delivered, cancelled
			createdAt: new Date().toLocaleString('vi-VN'),
			updatedAt: new Date().toLocaleString('vi-VN')
		};
		orders.value.unshift(newOrder);
		return newOrder;
	};

	const updateOrderStatus = (orderId, status) => {
		const order = getOrderById(orderId);
		if (order) {
			order.status = status;
			order.updatedAt = new Date().toLocaleString('vi-VN');
		}
	};

	const getAllOrders = computed(() => orders.value);

	const getOrdersByStatus = (status) => {
		return computed(() => orders.value.filter(o => o.status === status));
	};

	const getTotalOrders = computed(() => orders.value.length);

	return {
		orders,
		getOrderById,
		addOrder,
		updateOrderStatus,
		getAllOrders,
		getOrdersByStatus,
		getTotalOrders
	};
}, {
	persist: {
		paths: ['orders']
	}
});

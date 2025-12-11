import { defineStore } from 'pinia';
import { useUIStore } from './ui';

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: [] // { id, name, price, image, quantity }
	}),
	getters: {
		itemCount: (state) => state.items.reduce((sum, it) => sum + it.quantity, 0),
		subtotal: (state) => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
	},
	actions: {
		addItem(product, quantity = 1) {
			const existing = this.items.find((i) => i.id === product.id);
			if (existing) {
				existing.quantity += quantity;
			} else {
				this.items.push({ ...product, quantity });
			}
			useUIStore().pushToast({ type: 'success', message: 'Đã thêm vào giỏ hàng' });
		},
		removeItem(id) {
			this.items = this.items.filter((i) => i.id !== id);
		},
		updateQuantity(id, quantity) {
			const it = this.items.find((i) => i.id === id);
			if (it) it.quantity = Math.max(1, quantity);
		},
		clear() {
			this.items = [];
		}
	},
	persist: {
		paths: ['items']
	}
});



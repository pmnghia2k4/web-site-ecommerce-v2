import { defineStore } from 'pinia';
import { useUIStore } from './ui';

export const useWishlistStore = defineStore('wishlist', {
	state: () => ({
		items: [] // { id, name, price, image, brand, selectedColor, selectedSize, ... }
	}),
	getters: {
		itemCount: (state) => state.items.length,
		isInWishlist: (state) => (productId) => state.items.some((i) => i.id === productId)
	},
	actions: {
		addItem(product) {
			if (!this.isInWishlist(product.id)) {
				this.items.push({ ...product });
				useUIStore().pushToast({ type: 'success', message: 'Đã thêm vào yêu thích' });
			}
		},
		removeItem(id) {
			this.items = this.items.filter((i) => i.id !== id);
			useUIStore().pushToast({ type: 'success', message: 'Đã xóa khỏi yêu thích' });
		},
		toggleItem(product) {
			if (this.isInWishlist(product.id)) {
				this.removeItem(product.id);
			} else {
				this.addItem(product);
			}
		},
		clear() {
			this.items = [];
		}
	},
	persist: {
		paths: ['items']
	}
});

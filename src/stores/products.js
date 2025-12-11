import { defineStore } from 'pinia';
import api from '../utils/api';

export const useProductsStore = defineStore('products', {
	state: () => ({
		loading: false,
		items: [],
		total: 0
	}),
	actions: {
		async fetchList(params = {}) {
			this.loading = true;
			try {
				// Mocked endpoint shape; replace when backend is ready
				const { data } = await api.get('/products', { params });
				// Handle both { items: [] } and { products: [] } formats
				this.items = data.items ?? data.products ?? data ?? [];
				this.total = data.total ?? this.items.length;
			} finally {
				this.loading = false;
			}
		},
		async fetchById(id) {
			const { data } = await api.get(`/products/${id}`);
			return data;
		}
	}
});



import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
	state: () => ({
		theme: 'system', // 'light' | 'dark' | 'system'
		toasts: [] // { id, type, message }
	}),
	getters: {
		isDarkMode(state) {
			if (state.theme === 'dark') return true;
			if (state.theme === 'light') return false;
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	},
	actions: {
		initTheme() {
			const root = document.documentElement;
			if (this.isDarkMode) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		},
		setTheme(theme) {
			this.theme = theme;
			this.initTheme();
		},
		pushToast(payload) {
			const id = crypto.randomUUID();
			this.toasts.push({ id, type: payload.type ?? 'info', message: payload.message });
			setTimeout(() => this.removeToast(id), payload.timeout ?? 2500);
		},
		removeToast(id) {
			this.toasts = this.toasts.filter((t) => t.id !== id);
		}
	},
	persist: {
		paths: ['theme']
	}
});



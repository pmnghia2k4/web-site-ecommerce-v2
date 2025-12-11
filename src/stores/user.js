import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: null,
		profile: null, // { id, name, email }
		role: 'guest' // 'guest' | 'customer' | 'admin'
	}),
	getters: {
		isAuthenticated: (state) => Boolean(state.token)
	},
	actions: {
		login({ token, profile, role = 'customer' }) {
			this.token = token;
			this.profile = profile;
			this.role = role;
		},
		logout() {
			this.token = null;
			this.profile = null;
			this.role = 'guest';
		},
		updateProfile(patch) {
			this.profile = { ...(this.profile ?? {}), ...patch };
		},
		setRole(role) {
			this.role = role;
		}
	},
	persist: {
		paths: ['token', 'profile', 'role']
	}
});



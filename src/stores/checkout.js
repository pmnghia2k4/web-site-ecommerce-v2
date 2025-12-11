import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore('checkout', {
	state: () => ({
		currentStep: 1, // 1: Review, 2: Shipping, 3: Payment, 4: Complete
		shippingInfo: {
			fullName: '',
			email: '',
			phone: '',
			address: '',
			ward: '',
			district: '',
			province: '',
			note: ''
		},
		paymentMethod: 'cod', // cod, bank_transfer, wallet
		orderData: null
	}),
	getters: {
		isShippingValid: (state) => {
			const info = state.shippingInfo;
			return (
				info.fullName.trim() !== '' &&
				info.email.trim() !== '' &&
				info.phone.trim() !== '' &&
				info.address.trim() !== '' &&
				info.ward.trim() !== '' &&
				info.district.trim() !== '' &&
				info.province.trim() !== ''
			);
		},
		canProceedToPayment: (state) => state.currentStep === 2,
		completedSteps: (state) => {
			const steps = [];
			if (state.currentStep >= 1) steps.push(1);
			if (state.currentStep >= 2) steps.push(2);
			if (state.currentStep >= 3) steps.push(3);
			if (state.currentStep >= 4) steps.push(4);
			return steps;
		}
	},
	actions: {
		setShippingInfo(info) {
			this.shippingInfo = { ...this.shippingInfo, ...info };
		},
		updateShippingField(field, value) {
			this.shippingInfo[field] = value;
		},
		goToStep(step) {
			// Validate before moving to next step
			if (step > this.currentStep && this.currentStep === 2) {
				if (!this.isShippingValid) {
					return false; // Cannot proceed
				}
			}
			this.currentStep = step;
			return true;
		},
		nextStep() {
			if (this.currentStep === 2 && !this.isShippingValid) {
				return false;
			}
			// Allow advancing up to step 4 (complete)
			if (this.currentStep < 4) {
				this.currentStep += 1;
				return true;
			}
			return false;
		},
		previousStep() {
			if (this.currentStep > 1) {
				this.currentStep -= 1;
				return true;
			}
			return false;
		},
		setPaymentMethod(method) {
			this.paymentMethod = method;
		},
		completeOrder(orderData) {
			this.orderData = orderData;
			this.currentStep = 4;
		},
		reset() {
			this.currentStep = 1;
			this.shippingInfo = {
				fullName: '',
				email: '',
				phone: '',
				address: '',
				ward: '',
				district: '',
				province: '',
				note: ''
			};
			this.paymentMethod = 'cod';
			this.orderData = null;
		}
	},
	persist: {
		paths: ['shippingInfo', 'paymentMethod']
	}
});

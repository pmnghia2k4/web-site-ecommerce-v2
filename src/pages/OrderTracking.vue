<template>
	<section>
		<h1 class="mb-4 text-xl font-semibold">Theo dõi đơn #{{ orderId }}</h1>
		<ol class="relative border-l pl-6 dark:border-gray-800">
			<li v-for="(s, i) in steps" :key="s.label" class="mb-6">
				<span class="absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full" :class="i <= currentStep ? 'bg-emerald-600' : 'bg-gray-300'"></span>
				<p class="font-medium">{{ s.label }}</p>
				<p class="text-sm text-gray-500">{{ s.time }}</p>
			</li>
		</ol>
	</section>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.params.orderId;
const currentStep = ref(2);
const steps = ref([
	{ label: 'Đã đặt hàng', time: '2025-11-10 09:00' },
	{ label: 'Đóng gói', time: '2025-11-10 12:00' },
	{ label: 'Đang vận chuyển', time: '2025-11-11 10:00' },
	{ label: 'Giao thành công', time: '-' }
]);
</script>



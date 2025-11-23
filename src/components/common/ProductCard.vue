<template>
	<div class="group rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
		<RouterLink :to="`/product/${product.id}`" class="block">
			<div class="relative overflow-hidden rounded-md">
				<img :src="currentImage" :alt="product.name" class="aspect-square w-full object-cover transition-transform duration-300 transform group-hover:scale-105" />
			</div>
			<h3 class="mt-3 line-clamp-1 font-medium">{{ product.name }}</h3>
		</RouterLink>

		<!-- color/image swatches (click to change image) placed under product name -->
		<div v-if="product.images && product.images.length > 1" class="mt-2 flex items-center gap-2">
			<button
				v-for="(img, idx) in product.images.slice(0,6)"
				:key="idx"
				@click="selectImage(img)"
				class="h-6 w-6 rounded-full border-2 border-white shadow-sm overflow-hidden"
				:class="currentImage === img ? 'ring-2 ring-offset-1 ring-gray-900' : ''"
				:style="{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
				aria-label="Chọn màu"
			/>
		</div>
		<p class="mt-1 text-sm text-gray-500">{{ product.brand }}</p>
		<div class="mt-2 flex items-center justify-between">
			<p class="font-semibold">{{ formatCurrency(product.price) }}</p>
			<div class="flex gap-2">
				<button @click="$emit('wishlist', product)" class="rounded border px-2 py-1 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">♥</button>
				<button @click="$emit('add', product)" class="rounded bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black dark:bg-gray-100 dark:text-black">Thêm</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { formatCurrency } from '../../utils/helpers';
import { ref, toRef } from 'vue';

const props = defineProps({
	product: {
		type: Object,
		required: true
	}
});
const product = toRef(props, 'product');
defineEmits(['add', 'wishlist']);

const currentImage = ref('');
// initialize currentImage from product prop safely
currentImage.value = (product.value && (product.value.image || (product.value.images && product.value.images[0]))) || '';

function selectImage(url) {
	if (!url) return;
	currentImage.value = url;
}
</script>



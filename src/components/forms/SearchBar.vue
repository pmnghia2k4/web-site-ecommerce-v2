<template>
	<form @submit.prevent="submit" class="relative">
		<input
			v-model="q"
			@input="onInput"
			@focus="showSuggestions = true"
			@blur="closeSuggestions"
			type="search"
			placeholder="Tìm kiếm sản phẩm..."
			class="w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
		/>
		<span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>

		<!-- Suggestions dropdown -->
		<transition name="fade">
			<div
				v-if="showSuggestions && filteredSuggestions.length > 0"
				class="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
			>
				<div v-for="(product, index) in filteredSuggestions" :key="product.id" class="border-b border-gray-100 last:border-b-0 dark:border-gray-700">
					<button
						type="button"
						@click="selectSuggestion(product)"
						@mousedown.prevent
						class="group flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<div class="h-10 w-10 overflow-hidden rounded">
							<img :src="product.thumbnail" :alt="product.title" class="h-10 w-10 object-cover transition-transform duration-200 transform group-hover:scale-110" />
						</div>
						<div class="flex-1">
							<p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ product.title }}</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">{{ product.price ? `$${product.price}` : 'N/A' }}</p>
						</div>
						<span class="text-xs text-gray-400">→</span>
					</button>
				</div>

				<!-- Show all results option -->
				<button
					type="button"
					@click="submit"
					@mousedown.prevent
					v-if="filteredSuggestions.length > 0"
					class="w-full bg-gray-50 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				>
					Xem tất cả kết quả ({{ filteredSuggestions.length }})
				</button>
			</div>
		</transition>
	</form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '../../stores/products';

const products = useProductsStore();
const q = ref('');
const showSuggestions = ref(false);
const emit = defineEmits(['search']);

onMounted(async () => {
	if (products.items.length === 0) {
		await products.fetchList({ limit: 100 });
	}
});

const filteredSuggestions = computed(() => {
	if (!q.value?.trim()) return [];
	
	const query = q.value.trim().toLowerCase();
	const items = products.items && products.items.length > 0 ? products.items : [];
	
	// Filter and sort by relevance
	const filtered = items.filter(product => {
		const title = product.title?.toLowerCase() || '';
		const name = product.name?.toLowerCase() || '';
		const category = product.category?.toLowerCase() || '';
		
		return title.includes(query) || name.includes(query) || category.includes(query);
	});
	
	// Sort by relevance - exact match at start gets higher priority
	const sorted = filtered.sort((a, b) => {
		const aTitle = a.title?.toLowerCase() || a.name?.toLowerCase() || '';
		const bTitle = b.title?.toLowerCase() || b.name?.toLowerCase() || '';
		const query_lower = query.toLowerCase();
		
		const aStartsWith = aTitle.startsWith(query_lower) ? 0 : 1;
		const bStartsWith = bTitle.startsWith(query_lower) ? 0 : 1;
		
		return aStartsWith - bStartsWith;
	});
	
	return sorted.slice(0, 8); // Limit to 8 suggestions
});

function onInput() {
	showSuggestions.value = true;
}

function closeSuggestions() {
	// Delay to allow click on suggestion to register
	setTimeout(() => {
		showSuggestions.value = false;
	}, 150);
}

function selectSuggestion(product) {
	q.value = product.title;
	showSuggestions.value = false;
	emit('search', product.title);
}

function submit() {
	if (!q.value?.trim()) return;
	showSuggestions.value = false;
	emit('search', q.value.trim());
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>



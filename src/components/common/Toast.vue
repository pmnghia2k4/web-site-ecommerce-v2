<template>
	<div class="pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4">
		<div class="flex w-full max-w-sm flex-col gap-2">
			<TransitionGroup name="toast" tag="div">
				<div
					v-for="t in toasts"
					:key="t.id"
					class="pointer-events-auto flex items-center justify-between rounded-md border p-3 shadow-md"
					:class="t.type === 'error' ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200' : 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'"
				>
					<p class="text-sm">{{ t.message }}</p>
					<button class="ml-3 text-xs underline" @click="remove(t.id)">Đóng</button>
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUIStore } from '../../stores/ui';
const ui = useUIStore();
const { toasts } = storeToRefs(ui);
function remove(id) {
	ui.removeToast(id);
}
</script>

<style>
.toast-enter-active,
.toast-leave-active {
	transition: all 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateY(8px);
}
</style>



<template>
	<div class="relative w-screen left-1/2 -translate-x-1/2 aspect-video md:aspect-[2.4/1] overflow-hidden">
		<!-- Slides container -->
		<div
			class="flex h-full transition-transform duration-500 ease-in-out"
			:style="{ transform: `translateX(-${currentIndex * 100}%)` }"
		>
			<div v-for="(slide, index) in slides" :key="index" class="h-full w-full flex-shrink-0">
				<video
					v-if="slide.type === 'video'"
					class="h-full w-full object-cover"
					:src="slide.src"
					autoplay
					loop
					muted
					playsinline
				></video>
				<img v-else class="h-full w-full object-cover" :src="slide.src" :alt="slide.alt || 'Banner image'" />
				<div class="absolute inset-0 bg-black/30"></div>
				<div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
					<h2 class="text-3xl md:text-5xl font-extrabold drop-shadow-md">{{ slide.title }}</h2>
					<p v-if="slide.subtitle" class="mt-2 text-lg md:text-xl font-medium drop-shadow">{{ slide.subtitle }}</p>
				</div>
			</div>
		</div>

		<!-- Navigation Buttons -->
		<button
			@click="prev"
			class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
		</button>
		<button
			@click="next"
			class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
		</button>

		<!-- Dot Indicators -->
		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
			<button
				v-for="(_, index) in slides"
				:key="index"
				@click="goTo(index)"
				class="h-3 w-3 rounded-full transition"
				:class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
			></button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
	slides: {
		type: Array,
		required: true,
		default: () => []
	},
	interval: {
		type: Number,
		default: 5000 // 5 seconds
	}
});

const currentIndex = ref(0);
let slideInterval = null;

const totalSlides = computed(() => props.slides.length);

function next() {
	currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
}

function prev() {
	currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
}

function goTo(index) {
	currentIndex.value = index;
}

function startAutoPlay() {
	slideInterval = setInterval(next, props.interval);
}

function stopAutoPlay() {
	clearInterval(slideInterval);
	slideInterval = null;
}

onMounted(() => {
	if (props.slides.length > 1) {
		startAutoPlay();
	}
});

onUnmounted(() => {
	stopAutoPlay();
});
</script>

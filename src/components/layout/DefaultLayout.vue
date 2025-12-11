<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="mx-auto max-w-7xl px-4 py-6 flex-1">
			<slot />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '../common/Header.vue';
import Footer from '../common/Footer.vue';
</script>



<script>
	import '../app.pcss';

	import Navbar from '../lib/Navbar.svelte';
</script>

<div class="mainContainer">
	<Navbar></Navbar>
	<slot></slot>
</div>

<style>
	.mainContainer {
		min-height: 100vh;
		background: whitesmoke;
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>

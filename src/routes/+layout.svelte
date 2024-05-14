<script>
	import '../app.pcss';

</script>

<div class="mainContainer">
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

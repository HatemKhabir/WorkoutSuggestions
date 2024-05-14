<script>
	import { Button } from 'flowbite-svelte';
	import { myExercises, removeExercise } from '../../store/stores.js';
</script>

	<div class="slide-container">
		{#each $myExercises as exercice}
		<div class="wrapper">
			<div class="clash-card">
				<div class="content">
				<div class="clash-card__image clash-card__image--barbarian">
					<img src={exercice.imgSrc} alt={exercice.exerciceName} />
				</div>
				<div class="clash-card__unit-name">{exercice.exerciceName}</div>
					<button class="btn rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300" tabindex="0" on:click={()=>{removeExercise({exerciceName:exercice.exerciceName,imgSrc:exercice.imgSrc})}}>Remove</button>
				</div>
			</div>
		</div>
	{/each}
	
</div>

<style lang="scss">

	@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

	$border-radius-size: 14px;
	$barbarian: #ec9b3b;
	$bp-md: 600px;
    $bp-lg: 800px;
	*,
	*:before,
	*:after {
		overflow: hidden;
	}

	.slide-container {
	    display: flex;
		flex-wrap: wrap;
		gap: 30px;
		margin: auto;
		text-align: center;
	}

	.clash-card__unit-name,
.clash-card__image {
  opacity: 1; // Always visible
}

.btn {
  opacity: 0; // Hidden by default
  visibility: hidden;
  max-height: 0px;
  transition: opacity 0.5s ease; // Smooth transition
}

.clash-card:hover .btn {
	margin-top:10px ;
	max-height: 300px;
 visibility:visible;
	opacity: 1; // Visible on hover
}

	.clash-card {
		background: white;
		width: 300px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		margin: auto;
		position: relative;
		border-radius: $border-radius-size + 5;
		position: relative;
		text-align: center;
		box-shadow: -1px 15px 30px -12px black;
		z-index: 9999;
		
}
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: transform var(--d) var(--e);

}
.clash-card__image {
		position: relative;
		margin-top: 10px;
		height: 230px;
		margin-bottom: 35px;
		border-top-left-radius: $border-radius-size;
		border-top-right-radius: $border-radius-size;
	}

	.clash-card__level {
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 700;
		margin-bottom: 3px;
	}

	.clash-card__unit-name {
		color: black;
		font-size: 1.3rem;
        font-weight: bold;
        line-height: 1.2;
  &::first-letter{
	text-transform: capitalize;
  }
 
	}


	
	
</style>

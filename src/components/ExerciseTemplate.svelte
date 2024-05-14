<script>
    export let imgSource;
    export let exerciceName;
    import { Button } from 'flowbite-svelte';
    import { addExercise, removeExercise } from '../store/stores.js';

    let isAdded = false;

    // Use Svelte's reactive statements for reactive button text
    $: buttonText = isAdded ? "Added" : "Add";

    function toggleExercise() {
        isAdded = !isAdded;
        if (isAdded) {
            addExercise({ exerciceName, imgSrc: imgSource });
        } 
    }


</script>

<div class="exercise-container">
    <img src={imgSource} alt={exerciceName}>
    <p>{exerciceName}</p>
    <Button class="hover:scale-110 transition-all duration-300 transform"
        on:click={toggleExercise}
        type="button">
        {buttonText}
    </Button>
</div>
<style>
    .exercise-container {
        border: 2px solid black;
        display: flex;
        align-items: center; /* if you want to align items vertically */
        gap: 10px; /* adjust as needed */
    }
</style>

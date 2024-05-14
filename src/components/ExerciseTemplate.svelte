<script>
    export let imgSource;
    export let exerciceName; 
    import { Button, Checkbox } from 'flowbite-svelte';
    import {addExercise,removeExercise} from '../store/stores.js'

let isAdded=false;
let buttonText=isAdded ? "Added":"Add";

</script>
<div class="exercise-container">
    <img src={imgSource} alt={exerciceName}>
    <p>{exerciceName}</p>
    <Button class="hover:scale-110 transition-all duration-300 transform" 
    on:click={()=>{
        isAdded=!isAdded
        if (isAdded)
        addExercise({exerciceName:exerciceName,imgSrc:imgSource})
        else removeExercise({exerciceName:exerciceName,imgSrc:imgSource})

        }} 
    on:mouseenter={()=>{if (isAdded) buttonText="Remove"}} 
    on:mouseleave={()=>{if (isAdded) {buttonText="Added"} else {buttonText="Add"}}} type="button">{buttonText}</Button>
</div>
<style>
    .exercise-container {
        border: 2px solid black;
        display: flex;
        align-items: center; /* if you want to align items vertically */
        gap: 10px; /* adjust as needed */
    }
</style>

<script>
    import { ButtonGroup, Button,GradientButton } from 'flowbite-svelte';

  </script>
  
  <nav class="navbar">
    <h1>Gym Exercices</h1>
   <ul>
    <ButtonGroup class=" justify-between">
    <GradientButton color="redToYellow" class="h-full mr-1  hover:scale-125 hover:mr-2"><a href="/dashboard"> Home</a></GradientButton>
    <GradientButton color="redToYellow" class="h-full  hover:scale-125 hover:ml-3"><a href="/exercices">Your Exercices</a></GradientButton>
</ButtonGroup>   
</ul>
</nav>

<style>
    .navbar{
        display: flex;
        height: 55px;
        flex-direction: row;
        justify-content: space-between;
        background: linear-gradient(to right,#fdbbf2,#dfc49d);
        border-bottom: 5px solid whitesmoke;
    }
    .navbar >h1{
        font-weight: bolder;
        font-size: 25px;
        color: black;
        margin: 6px;
    }
    ul{
        display: flex;
        list-style: none;
    }
    
 


</style>
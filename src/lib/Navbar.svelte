<script>
    import { ButtonGroup, Button,GradientButton } from 'flowbite-svelte';

    async function logout() {
        try {
            const response = await fetch('/api/check-session', {
                method: 'DELETE',
                credentials: 'include' // Make sure cookies are included
            });
            if (response.ok) {
                // Assuming the server clears the session and the authToken cookie
                console.log('Logout successful');
                window.location.href = '/'; // Redirect to the homepage or login page
            } else {
                console.error('Logout failed');
                // Handle errors or show a message
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
  </script>
  
  <nav class="navbar">
    <h1>Gym Exercices</h1>
   <ul>
    <ButtonGroup class=" justify-between">
    <p class="mt-3 mr-6 text-xl text-transparent bg-clip-text transition-colors duration-1000 ease-in-out bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-200 hover:text-2xl"><a href="/dashboard"> Home</a></p>
    <p class=" mr-2 mt-3 text-xl text-transparent bg-clip-text bg-white hover:bg-gradient-to-l to-pink-500 from-yellow-200   hover:text-2xl"><a href="/myexercices">Your Exercices</a></p>
    <button class=" mr-2 ml-6 mt-2 text-l text-transparent bg-clip-text hover:mr-4 bg-black hover:font-extrabold hover:bg-gradient-to-l to-slate-800 from-stone-800  hover:text-xl transition-all delay-200" on:click={logout}><a href="/">Logout</a></button>
</ButtonGroup>   
</ul>
</nav>

<style>
    .navbar{
        display: flex;
        width:100%;
        height: 55px;
        flex-direction: row;
        justify-content: space-between;
        background: linear-gradient(to right,#f087ba,#dfc49d);
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
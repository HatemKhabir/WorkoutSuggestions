<script>
	import { onMount } from "svelte";
	import Cards from "../../lib/Cards.svelte";
import Navbar from "../../lib/Navbar.svelte";

let isAuthenticated = false;

    onMount(async () => {
        const response = await fetch('/api/check-session');
        const data = await response.json();
        isAuthenticated = data.authenticated;
        console.log('Authenticated:', isAuthenticated);
		if (!isAuthenticated) {
            window.location.href='/'
            console.log('No authentication token found.');
        }
	});
</script>
  
    <main>
        <Cards/>
    </main>


<style>
    main{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        gap: 24px;
        margin: 20px auto;
    }
  
</style>
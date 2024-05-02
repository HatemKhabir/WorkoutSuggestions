<script>
	let email = '';
	let password = '';
	let confirmPass = '';
	let error = false;
	let register = true;
	function handleAuth() {
		if (!email || !password || (register && !confirmPass)) {
			error = true;
			return;
		}
	}
    function handleRegister(){
        register=!register
    }
</script>

<div class="authContainer">
	<form>
		<h1>{register ? 'Register' : 'Login'}</h1>
		{#if error}
			<p class="error">Credintials are incorrect !</p>
		{/if}
        {#if register}
		<label>
			<p class={email ? 'above' : 'center'}>Email</p>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<p class={password ? 'above' : 'center'}>Password</p>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>

		<label>
			<p class={confirmPass ? 'above' : 'center'}>Confirm Password</p>
			<input bind:value={confirmPass} type="Confirm Password" placeholder="Confirm Password" />
		</label>
		<button type="button">Register</button>
	    {:else}
        <label>
			<p class={email ? 'above' : 'center'}>Email</p>
			<input bind:value={email} type="email" placeholder="Email" />
		</label>
		<label>
			<p class={password ? 'above' : 'center'}>Password</p>
			<input bind:value={password} type="password" placeholder="Password" />
		</label>
        <button type="button">Login</button>       
        {/if}
    </form>
	<div class="options">
		<p>Or</p>
		{#if register}
			<div>
				<p>Already Have An Account ?</p>
				<span class="login" on:click={handleRegister} on:keydown={()=>{}} >Login</span>
			</div>
		{:else}
			<div>
				<p>Don't Have An Account ?</p>
				<span class="login" on:click={handleRegister} on:keydown={()=>{}}>Register</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.login {
		text-decoration-line: underline;
		cursor: pointer;
	}
	.authContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 24px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	form,
	.options {
		width: 400px;
		max-width: 100%;
		margin: 0 auto;
	}
	form input {
		padding: 10px;
		width: 100%;
		height: 40px;
		border: 1px solid black;
		border-radius: 8px;
		background: transparent;
		color: white;
	}
	form input:focus {
		transform: scale(1.1);
		border: 3px solid rgb(99, 28, 28);
		outline: none;
	}
	h1 {
		text-align: center;
	}
	form label {
		position: relative;
	}

	form button {
		background: linear-gradient(-45deg, red, rgba(255, 0, 0, 0));
		color: white;
		border: none;
		width: 50%;
		margin-left: 25%;
		padding: 14px 0;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		transition: all 0.3s ease-out;
	}

	form button:hover {
		transform: scale(1.2);
	}
	.above,
	.center {
		position: absolute;
		transform: translateY(-50%);
		pointer-events: none;
		border-radius: 4px;
		color: grey;
		padding: 0 6px;
		font-size: 0.8rem;
		z-index: 33;
	}
	.above {
		top: 0;
		left: 24px;
		background-color: rgba(255, 255, 255, 1);
		border: 1px solid rgb(122, 39, 39);
		font-size: 0.85rem;
	}
	.center {
		top: 50%;
		left: 6px;
		border: 1px solid transparent;
		opacity: 0;
	}
	.options {
		padding: 14px 0;
		overflow: hidden;
		font-size: 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.options > p {
		color: black;
		position: relative;
		text-align: center;
		width: fit-content;
		margin: 0 auto;
		padding: 0 8px;
	}

	.options > p::after,
	.options > p::before {
		color: black;
		position: absolute;
		content: '';
		top: 50%;
		transform: translateY(-50%);
		width: 100vw;
		height: 1.5px;
		background: black;
	}

	.options > p::after {
		right: 100%;
	}

	.options > p::before {
		left: 100%;
	}

	.options div {
		color: black;
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
	}

	.error {
		color: coral;
		font-size: 0.9rem;
	}
</style>

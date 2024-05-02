<script>
	export let defaultModal; // boolean
    import { Button } from 'flowbite-svelte';

	let dialog; // HTMLDialogElement

	$: if (dialog && defaultModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (defaultModal = false)}
	on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
        <div class="container">
            <slot name="header" />
            <hr />
            <div class="slot-container">
                <slot name="content"/>
            </div>
            <hr />
            <div class="button-container">
                <slot name="button"/>
                <Button color="dark" autofocus on:click={() => dialog.close()}>Close</Button>
            </div>
    </div>
</dialog>

<style>
       .container {
        display: flex;
        flex-direction: column;
    }
       .slot-container{
        margin: 10px;
    }
    .button-container {
        display: flex;
        justify-content: space-between;
    }
	dialog {
        left: 35%;
        top: 35%;
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
</style>

<script>
    import { Button } from 'flowbite-svelte';
    import Modal from '../components/Modal.svelte';
    const bodyParts = [
      'Pectorals Exercises',
      'Upper Back Exercises',
      'Lats Exercises',
      'Biceps Exercises',
      'Glutes Exercises',
      'Quads Exercises',
      'Hamstring Exercises',
      'Calves Exercises',
      'Triceps Exercises',
      'Delts Exercises',
      'ABS Exercises'
    ];
    const bodyPartsImages = [
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Chest.jpg?v=1601050935',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Back.jpg?v=1601050704',
    'https://www.peakptfitness.com/wp-content/uploads/2017/04/Fotolia_110740543_S.jpg',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Biceps.jpg?v=1601051495',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Glutes.jpg?v=1601050628',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Quadriceps.jpg?v=1601051118',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_hamstrings.jpg?v=1601051184',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Calves.jpg?v=1601051316',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Triceps.jpg?v=1601051412',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Shoulders.jpg?v=1601051035',
		'https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Abs.jpg?v=1601051622'
	];
  let defaultModal=false;
  const url = 'https://exercisedb.p.rapidapi.com/exercises/target';  
  let exercices=[]
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6deab34226msh36d2f80451a16e6p158b96jsn6aa9bee33abc',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};
  async function fetchExercices(bodyPartName){
    console.log(bodyPartName)
    const offset = `${Math.floor(Math.random() * 50) + 1}`;
    try {
	const response = await fetch(`${url}/${bodyPartName}?limit=10&offset=${offset}`, options).then((res)=>(res.json()));
  exercices = response;
  exercices=[...exercices];
} catch (error) {
	console.error(error);
}
  }
  let selectedPart="";
  </script>

  <div class="container" >
    {#each bodyParts as part, i}
    <div
    role="button"
    tabindex="0"
    on:keydown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        defaultModal = true;}}} 
    on:click={() => { defaultModal = true;
      selectedPart=part
     }}
    aria-label="Open modal"
    class="card">
    
        <img src={bodyPartsImages[i]} alt={part}>
        <h1>{part}</h1>
      </div>
    {/each}
  </div>
  <Modal bind:defaultModal>
    <h3 slot="header">
     Exercices For {selectedPart}
    </h3>
    <div slot="content">
     {#each exercices as exercice,i }
     <h2>{exercice.name}</h2>      
     {/each}
    </div>
    <Button slot="button" on:click={()=>{fetchExercices(selectedPart.split(' E')[0].toLowerCase())}}>Fetch</Button>
  </Modal>
  
  
  <style>
    :root {
      --primary-color: #5f5555;
    }
  
    
    .container {
      display: grid;
      margin-top: 50px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
  
    @media screen and (max-width: 600px) {
      .container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
  
    @media screen and (min-width: 601px) and (max-width: 900px) {
      .container {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  
    @media screen and (min-width: 901px) {
      .container {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      }
    }
  
    .card {
		width: 92%;
		height: 300px;
		max-width: 340px;
		margin: 18px auto;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--primary-color);
		color: #fff;
		cursor: pointer;
		margin-bottom: 60px;
	}
    
    .card:hover{
        scale: 1.1;
        transition: 400ms;
    }

	.card h1 {
		position: relative;
		left: 25%;
        top: 30%;
        width: 100%;
        font-size: larger;	
    }

	.card > img {
		width: 90%;
        height: 90%;
		position: absolute;
		top: -20%;
	}
  </style>
import { writable } from "svelte/store";
export const myExercises=writable([])
export const loggedInUser=writable({
    username:null,
    password:null,
    loading:true,
    exercices:[]
})
export function addExercise(exercice){
    myExercises.update(currentExercices=>{
        const newExercises=[...currentExercices,exercice]
        return newExercises;
    })
}
export function removeExercise(exerciceToRemove){
    myExercises.update(items=>{
        return items.filter(exercise=> exercise.exerciceName !== exerciceToRemove.exerciceName || 
            exercise.imgSrc !== exerciceToRemove.imgSrc)
    })
}
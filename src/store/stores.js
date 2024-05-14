import { writable } from "svelte/store";
import { browser } from '$app/environment';

export const myExercises=writable([])
export const loggedInUser=writable({
    username:"",
    userId:"",
})

// Function to fetch exercises from the server
export function fetchExercises() {
    if (browser) {
        fetch('/api/myexercises', {
            method: 'GET',
            credentials: 'include' // Ensure cookies are sent
        })
        .then(response => response.json())
        .then(data => {
            myExercises.set(data);
        })
        .catch(error => console.error('Error fetching exercises:', error));
    }
}

// Function to remove an exercise
export function removeExercise(exerciseId) {
    console.log(exerciseId)
    if (browser) {
        fetch('/api/myexercises', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exerciseId }),
            credentials: 'include' // Ensure cookies are sent
        })
        .then(response => {
            if (response.ok) {
                fetchExercises(); // Refresh the list after deletion
            } else {
                console.error('Failed to delete the exercise');
            }
        })
        .catch(error => console.error('Error deleting exercise:', error));
    }
}
export function addExercise(exercise) {
    if (browser) {
        fetch('/api/myexercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise),
            credentials: 'include' // Ensures cookies are sent
        })
        .then(response => {
            if (response.ok) {
                myExercises.update(currentExercises => {
                    return [...currentExercises, exercise];
                });
            } else {
                console.error('Failed to add the exercise');
            }
        })
        .catch(error => console.error('Error adding exercise:', error));
    }
}
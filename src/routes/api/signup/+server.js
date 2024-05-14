// Import necessary modules
import { mysqlConnect } from '../../../database/db.js';
import bcrypt from "bcryptjs";
import { redirect } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        // Parse the request body to get username and password
        const formData = await request.formData();
        const username = formData.get('username')?.toString() ?? '';
        const password = formData.get('password')?.toString() ?? '';

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get MySQL connection
        const db = mysqlConnect();

        // Insert the new user into the database
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(sql, [username, hashedPassword], (err) => {
                if (err) {
                    reject({ status: 500, body: { error: 'Internal server error' }});
                } else {
                    resolve();
                }
            });
        });
        // Redirect the user to the home page after successful signup
        return new Response("success",{status:200})
    } catch (error) {
        return new Response(error,{status:500})
    }
}
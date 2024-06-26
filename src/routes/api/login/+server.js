// Import necessary modules
import { mysqlConnect } from '../../../database/db.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { SECRET_PHRASE } from '$env/static/private';
import { loggedInUser } from '../../../store/stores.js';
// POST function to handle login requests
export async function POST({ cookies, request }) {
    let db;
    try {
        // Parse the request body to get username and password
        const loginFormData = await request.formData();
        const username = loginFormData.get('username')?.toString() ?? '';
        const password = loginFormData.get('password')?.toString() ?? '';

        // Get MySQL connection
        db = mysqlConnect();
        
        // Prepare SQL query to retrieve the user
        const sql = 'SELECT id,username,password FROM users WHERE username = ?';

        // Execute query and process results
        const [rows] = await db.promise().query(sql, [username]);
        if (rows.length === 1) {
            const user = rows[0];

            // Compare passwords using bcrypt
            const authAttempt = await bcrypt.compare(password, user.password);
            if (authAttempt) {
                // Generate token
                const token = jwt.sign({ username: username, userId: user.id }, SECRET_PHRASE);
                // Set the token in cookies
                cookies.set('authToken', token, {
                    path: '/',
                });

                return new Response(JSON.stringify({ userId: user.id, username: user.username }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                return new Response('Invalid username or password', { status: 401 });
            }
        } else {
            return new Response('Invalid username or password', { status: 401 });
        }
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}

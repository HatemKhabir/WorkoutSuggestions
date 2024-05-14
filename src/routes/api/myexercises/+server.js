import { mysqlConnect } from '../../../database/db.js';
import jwt from 'jsonwebtoken';
import { SECRET_PHRASE } from '$env/static/private';

function verifyToken(cookies) {
    const token = cookies.get('authToken');
    try {
        const decoded = jwt.verify(token, SECRET_PHRASE);
        return { isValid: true, userId: decoded.userId, username: decoded.username };
    } catch (error) {
        console.error('Token verification failed:', error);
        return { isValid: false };
    }
}

export async function POST({ request, cookies }) {
    const { isValid,userId } = verifyToken(cookies);
    const text =await request.text()
    if (!isValid) {
        return new Response('Unauthorized', { status: 401 });
    }
    try {
        const { exerciceName, imgSrc } = JSON.parse(text);
        let db = mysqlConnect();
        const sql = 'INSERT INTO exercises (exercise_name, exercise_image, user_id) VALUES (?, ?, ?)';
        const [result] = await db.promise().query(sql, [exerciceName, imgSrc, userId]);

        // Access the ID of the newly inserted exercise
        const exerciseId = result.insertId;
        return new Response({ message: 'Exercise added successfully', exerciseId: exerciseId }, { status: 201 });

    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}

export async function GET({ cookies }) {
    const { isValid, userId } = verifyToken(cookies);

    if (!isValid) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        let db = mysqlConnect();
        const sql = 'SELECT * FROM exercises WHERE user_id = ?';
        const [rows] = await db.promise().query(sql, [userId]);
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}

export async function DELETE({ request, cookies }) {
    const { isValid,userId } = verifyToken(cookies);
    const text =await request.text()
    if (!isValid) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const {exerciseId} = JSON.parse(text);
        let db = mysqlConnect();
        const sql = 'DELETE FROM exercises WHERE exercise_id = ? AND user_id = ?';  // Ensure that users can only delete their own exercises
        await db.promise().query(sql, [exerciseId.exerciceId, userId]);
        return new Response('Exercise deleted successfully', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    }
}
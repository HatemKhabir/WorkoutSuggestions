import jwt from 'jsonwebtoken';
import { SECRET_PHRASE } from '$env/static/private';

function verifyToken(cookies) {
    const token = cookies.get('authToken');
    if (!token) {
        return { isValid: false };
    }
    try {
        const decoded = jwt.verify(token, SECRET_PHRASE);
        return { isValid: true, userId: decoded.userId, username: decoded.username };
    } catch (error) {
        console.error('Token verification failed:', error);
        return { isValid: false };
    }
}
export async function GET({ cookies }) {
    const { isValid, userId } = verifyToken(cookies); // Assuming you have a function to verify tokens

    if (isValid) {
        return new Response(JSON.stringify({ authenticated: true, userId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        return new Response(JSON.stringify({ authenticated: false }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function DELETE({cookies}){
    const token = cookies.get('authToken');
    if (!token) {
        return new Response(JSON.stringify({ success: true, message: "No token provided, nothing to log out" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    try {
        jwt.verify(token, SECRET_PHRASE);
        // Proceed to clear the token since it's valid
        cookies.delete('authToken', { path: '/' });
        return new Response(JSON.stringify({ success: true, message: "Logged out successfully" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly`
            }
        });
    } catch (error) {
        // Token is invalid but still needs to be cleared
        cookies.delete('authToken', { path: '/' });
        return new Response(JSON.stringify({ success: true, message: "Token was invalid, cleared any session" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly`
            }
        });
    }
}
// import * as pool from '$lib/db.js';

// export function GET() {
    
//     return new Response('Hello from api get');
// }
import { json } from '@sveltejs/kit';
import { query } from '$lib/db';

export const GET = async (request) => {
  try {
    const users = await query('SELECT * FROM users');
    return json(users);
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'database conn error',
      },
    };
}}

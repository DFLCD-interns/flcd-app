// import * as pool from '$lib/db.js';

// export function GET() {
    
//     return new Response('Hello from api get');
// }
import { json } from '@sveltejs/kit';
import { createUserDB, getUsersDB } from '$lib/server/db.js';

// export const GET = async (request) => {
//   try {
//     const users = await query('SELECT * FROM users');
//     return json(users);
//   } catch (error) {
//     return {
//       status: 500,
//       body: {
//         error: 'database conn error',
//       },
//     };
// }}

export async function GET(request) {
  try {
    const users = await getUsersDB();
    return json(users);
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'database conn error',
      },
    };
}}

export async function POST({ request, cookies }) {
  // console.log(request);
  try {
    const { first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level } = await request.json();
    const newUsers = await createUserDB(first_name, last_name, email, pw_hash, phone, student_number, course, department, superior_id, access_level);
    return json({newUsers}, {status: 201});
  } catch (error) {
    return json({ status: 503 })
  }
}

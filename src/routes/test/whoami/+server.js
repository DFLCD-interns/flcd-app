import { json } from '@sveltejs/kit';
import { createUserDB, getUsersDB } from '$lib/server/dbjoshua.js';
import { getUserFromSessionDB } from '../../../lib/server/dbjoshua.js';
import { SESSION_COOKIE_NAME } from '../../../lib/server/constants.js';

export async function GET({request, cookies}) {
    // console.log("test+server.js - get cookies", cookies.get(SESSION_COOKIE_NAME));
    try {
      const user = await getUserFromSessionDB(cookies.get(SESSION_COOKIE_NAME));
      return json(user);
    } catch (error) {
      return {
        status: 500,
        body: {
          error: 'database conn error',
        },
      };
  }}
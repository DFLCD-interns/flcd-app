import { connectToDB } from "$lib/db";
// import type { Handle } from "@sveltejs/kit";

// This snippet has not been running lol, I made the same mistake of adding + in +hooks.server.js, It runs only when the name is "hooks.server.js"
// export const handle = (async ({ event, resolve }) => {
//   const dbconn = await connectToDB();
//   event.locals = { dbconn };

//   const response = await resolve(event);
//   dbconn.release();

//   return response;
// })
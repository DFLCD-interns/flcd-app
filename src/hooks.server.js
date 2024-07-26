// import { connectToDB } from "$lib/db";
// import type { Handle } from "@sveltejs/kit";

// This snippet has not been running lol, I made the same mistake of adding + in +hooks.server.js, It runs only when the name is "hooks.server.js"
// export const handle = (async ({ event, resolve }) => {
//   const dbconn = await connectToDB();
//   event.locals = { dbconn };

//   const response = await resolve(event);
//   dbconn.release();

//   return response;
// })

import { authenticateUser } from "$lib/server/auth.js"
import { redirect } from "@sveltejs/kit"

export async function handle({ event, resolve }) {
	// Stage 1
	event.locals.user = await authenticateUser(event);

//   console.log("Hookie - ", event.url.pathname, event.locals.user.workgroup);

	if (event.url.pathname.startsWith("/p")) {
		console.log("pathmatch");
		if (!event.locals.user) { // a user must be logged in
			throw redirect(303, "/")
		}
    if (event.url.pathname.startsWith("/p0")) {
			if (![0].includes(event.locals.user.workgroup)) {
				// throw redirect(303, "/signout")
        return new Response("You do not have the correct access rights to view this!.");
			}
		}
		if (event.url.pathname.startsWith("/p1")) {
			if (![0,1].includes(event.locals.user.workgroup)) {
        return new Response("You do not have the correct access rights to view this!.");
			}
		}
    if (event.url.pathname.startsWith("/p2")) {
			if (![0,1,2,3].includes(event.locals.user.workgroup)) {
        return new Response("You do not have the correct access rights to view this!.");
			}
		}
    if (event.url.pathname.startsWith("/p3")) {
			if (![0,1,2,3,4,5].includes(event.locals.user.workgroup)) {
        return new Response("You do not have the correct access rights to view this!.");
        // throw redirect(303, "/signout")
			}
		}
    
	}

	const response = await resolve(event) // Stage 2

	// Stage 3

	return response
}

// import { redirect } from "@sveltejs/kit";

// // define the routes of we want to be possible to access without auth
// const public_paths = [
//   '/signup',
//   '/signin'
// ];

// // function to verify if the request path is inside the public_paths array
// function isPathAllowed(path) {
//   return public_paths.some(allowedPath =>
//     path === allowedPath || path.startsWith(allowedPath + '/')
//   );
// }

// export const handle = async ({ event, resolve}) => {
//   let user = null
//   // check if the cookie exist, and if exists, parse it to the user variable
//   if(event.cookies.get('user') != undefined && event.cookies.get('user') != null){
//     user = JSON.parse(event.cookies.get('user'))
//   }
//   const url = new URL(event.request.url);

//   // validate the user existence and if the path is acceesible
//   if (!user && !isPathAllowed(url.pathname)) {
//     throw redirect(302, '/signin');
//   }

//   if(user){
//     //set the user to the locals (i explain this later on the article)
//     event.locals.user = user

//     // redirect user if he is already logged if he try to access signin or signup
//     if(url.pathname == '/signup' || url.pathname == '/signin'){
//       throw redirect(302, '/')
//     }
//   }

//   const response = await resolve(event);

//   return response;
// }


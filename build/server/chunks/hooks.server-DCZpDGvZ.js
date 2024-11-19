import { a as authenticateUser } from './auth-BF-UdiI9.js';
import { r as redirect } from './index-DHSpIlkf.js';
import 'uuid';
import './constants-DlhdG_zK.js';
import './db-D_ZfyofE.js';
import 'pg';
import 'crypto';

async function handle({ event, resolve }) {
  event.locals.user = await authenticateUser(event);
  if (event.url.pathname.startsWith("/p")) {
    if (!event.locals.user) {
      throw redirect(303, "/");
    }
    if (event.url.pathname.startsWith("/p0")) {
      if (![0].includes(event.locals.user.access_level)) {
        return new Response("You do not have the correct access rights to view this!.");
      }
    }
    if (event.url.pathname.startsWith("/p1")) {
      if (![0, 1].includes(event.locals.user.access_level)) {
        return new Response("You do not have the correct access rights to view this!.");
      }
    }
    if (event.url.pathname.startsWith("/p2")) {
      if (![0, 1, 2, 3].includes(event.locals.user.access_level)) {
        return new Response("You do not have the correct access rights to view this!.");
      }
    }
    if (event.url.pathname.startsWith("/p3")) {
      if (![0, 1, 2, 3, 4, 5].includes(event.locals.user.access_level)) {
        return new Response("You do not have the correct access rights to view this!.");
      }
    }
  }
  const response = await resolve(event);
  return response;
}

export { handle };
//# sourceMappingURL=hooks.server-DCZpDGvZ.js.map

import { handler } from './build/handler.js';
import cors from 'cors';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

// const allowedOrigins = ['192.168.7.155', '127.0.0.1', '0.0.0.0'];
// app.use(cors({
//   origin: function(origin, callback){
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }

// }));
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.use(cors());

app.listen(3000, () => {
	console.log('listening on port 3000');
});
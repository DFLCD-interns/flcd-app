const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["1.png","2.png","3.png","favicon.png","Landing Image.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.DVFFqt5g.js","app":"_app/immutable/entry/app.CdNjj4FN.js","imports":["_app/immutable/entry/start.DVFFqt5g.js","_app/immutable/chunks/entry.B3oirdxR.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.CyH2wcdx.js","_app/immutable/entry/app.CdNjj4FN.js","_app/immutable/chunks/scheduler.DARHZdcz.js","_app/immutable/chunks/index.BOD7_7ti.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-B6klCHM3.js')),
			__memo(() => import('./chunks/1-Dte2poTu.js')),
			__memo(() => import('./chunks/2-_je59w3l.js')),
			__memo(() => import('./chunks/3-FqNFuDVv.js')),
			__memo(() => import('./chunks/4-Wq863Kse.js')),
			__memo(() => import('./chunks/5-D6iJVSpu.js')),
			__memo(() => import('./chunks/6-Bg331Rps.js')),
			__memo(() => import('./chunks/7-Cj9Sj8qB.js')),
			__memo(() => import('./chunks/8-DK5Ujbkd.js')),
			__memo(() => import('./chunks/9-B0VUt6yl.js')),
			__memo(() => import('./chunks/10-DO6moH7N.js')),
			__memo(() => import('./chunks/11-DrZjiNx0.js')),
			__memo(() => import('./chunks/12-C10E_jB3.js')),
			__memo(() => import('./chunks/13-D9qRVW6E.js')),
			__memo(() => import('./chunks/14-CYaqEeSF.js')),
			__memo(() => import('./chunks/15-DDs_Cd3S.js')),
			__memo(() => import('./chunks/16-DQAjoezn.js')),
			__memo(() => import('./chunks/17-CjTj0PgI.js')),
			__memo(() => import('./chunks/18-DVw37ZFl.js')),
			__memo(() => import('./chunks/19-DRees7GY.js')),
			__memo(() => import('./chunks/20-DwYsJ9qb.js')),
			__memo(() => import('./chunks/21-t-dBwL98.js')),
			__memo(() => import('./chunks/22-DY7VcCUY.js')),
			__memo(() => import('./chunks/23-B5jHayP0.js')),
			__memo(() => import('./chunks/24-CCbnjL0S.js')),
			__memo(() => import('./chunks/25-Da07navY.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/basic_forms/observation_requests",
				pattern: /^\/basic_forms\/observation_requests\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/csv-stuff",
				pattern: /^\/csv-stuff\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/classes",
				pattern: /^\/dashboard\/classes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/databases",
				pattern: /^\/dashboard\/databases\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/databases/classes",
				pattern: /^\/dashboard\/databases\/classes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/databases/equipments",
				pattern: /^\/dashboard\/databases\/equipments\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/databases/schedules",
				pattern: /^\/dashboard\/databases\/schedules\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/dashboard/databases/users",
				pattern: /^\/dashboard\/databases\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/dashboard/databases/venues",
				pattern: /^\/dashboard\/databases\/venues\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/dashboard/observation-form",
				pattern: /^\/dashboard\/observation-form\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/request-details/[table]-[reqid]",
				pattern: /^\/dashboard\/request-details\/([^/]+?)-([^/]+?)\/?$/,
				params: [{"name":"table","optional":false,"rest":false,"chained":false},{"name":"reqid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/requests-form",
				pattern: /^\/dashboard\/requests-form\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/p0",
				pattern: /^\/p0\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/p1",
				pattern: /^\/p1\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/p2",
				pattern: /^\/p2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/p3",
				pattern: /^\/p3\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/register/student",
				pattern: /^\/register\/student\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/register/teacher",
				pattern: /^\/register\/teacher\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/unavailableslots",
				pattern: /^\/unavailableslots\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map

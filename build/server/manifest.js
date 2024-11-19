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
		client: {"start":"_app/immutable/entry/start.B2r6ZpUD.js","app":"_app/immutable/entry/app.CNqkyKEL.js","imports":["_app/immutable/entry/start.B2r6ZpUD.js","_app/immutable/chunks/entry.DBH_V7Gc.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DELnobZO.js","_app/immutable/entry/app.CNqkyKEL.js","_app/immutable/chunks/scheduler.DOp8wpeX.js","_app/immutable/chunks/index.DWy7Bods.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-s_gsCLxo.js')),
			__memo(() => import('./chunks/1-Ba7TxRh5.js')),
			__memo(() => import('./chunks/2-Bg6XWBgh.js')),
			__memo(() => import('./chunks/3-GLtjLeuZ.js')),
			__memo(() => import('./chunks/4-Wq863Kse.js')),
			__memo(() => import('./chunks/5-C1QnDr8c.js')),
			__memo(() => import('./chunks/6-pCzKwQ7_.js')),
			__memo(() => import('./chunks/7-9doRpxXm.js')),
			__memo(() => import('./chunks/8-DKXVoZRo.js')),
			__memo(() => import('./chunks/9-BcmoUGPD.js')),
			__memo(() => import('./chunks/10-87TCr_-L.js')),
			__memo(() => import('./chunks/11-dk6HYcg4.js')),
			__memo(() => import('./chunks/12-dMI1EAFx.js')),
			__memo(() => import('./chunks/13-DlfVkzv2.js')),
			__memo(() => import('./chunks/14-wRcLmr5Q.js')),
			__memo(() => import('./chunks/15-ByezvZcv.js')),
			__memo(() => import('./chunks/16-D1MmDBMA.js')),
			__memo(() => import('./chunks/17-nVOVvdud.js')),
			__memo(() => import('./chunks/18-BxEDw9vm.js')),
			__memo(() => import('./chunks/19-BghoAtiC.js')),
			__memo(() => import('./chunks/20-CF3MzKn9.js')),
			__memo(() => import('./chunks/21-P2_Lk0oy.js')),
			__memo(() => import('./chunks/22-yfFqY7M1.js')),
			__memo(() => import('./chunks/23-BuM2pR59.js')),
			__memo(() => import('./chunks/24-CWbJOU8r.js')),
			__memo(() => import('./chunks/25-O9g_1dTk.js')),
			__memo(() => import('./chunks/26-Ba4DbdXK.js'))
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
				id: "/dashboard/equipment-requests",
				pattern: /^\/dashboard\/equipment-requests\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/dashboard/observation-form",
				pattern: /^\/dashboard\/observation-form\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard/request-details/[table]-[reqid]",
				pattern: /^\/dashboard\/request-details\/([^/]+?)-([^/]+?)\/?$/,
				params: [{"name":"table","optional":false,"rest":false,"chained":false},{"name":"reqid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/dashboard/venue-requests",
				pattern: /^\/dashboard\/venue-requests\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/p0",
				pattern: /^\/p0\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/p1",
				pattern: /^\/p1\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/p2",
				pattern: /^\/p2\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/p3",
				pattern: /^\/p3\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/register/student",
				pattern: /^\/register\/student\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/register/teacher",
				pattern: /^\/register\/teacher\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/unavailableslots",
				pattern: /^\/unavailableslots\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
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

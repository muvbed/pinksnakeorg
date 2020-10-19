import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'hash',
	routes: [
		{
			path: '/', 
			component: () => import('@/views/auth.vue')
		},
		{
			path: '/general', 
			component: () => import('@/views/general.vue')
		},
		{
			path: '/server:id',
			component: () => import('@/views/server.vue')
		}
	]
})

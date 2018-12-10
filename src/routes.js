
import App from './Components/SignUp/App.vue';
import FirstPage from './Components/First-page/First-page.vue';
import SignUp from './Components/SignUp/SignUp.vue';
import SignIn from './Components/SignUp/SignIn.vue';
import EventPage from './Components/EventsPage/EventsList.vue';
import Event from './Components/EventsPage/Event.vue'
import Profile from './Components/Profile/Profile.vue'

import ErrorNotFound from './Components/ErrorsPage/NotFound.vue'

import VueRouter from 'vue-router';


let routes = [
	{ path: '/login', component: App, children:[
		{
			path: 'signUp',
			component: SignUp
		},
		{
			path: 'signIn',
			component: SignIn
		}
	] },
	{ name:'user', path: '/Profile/:username', component: Profile, props: true},
	{ path: '/', component: FirstPage},
	{ path: '/Events', component: EventPage},
	{ path: '/Event/:id', component: Event, props: true},


	{ path: '/404', component: ErrorNotFound},
	{ path: '*', redirect: '/404'}


];

let router = new VueRouter({
	routes,
	linkExactActiveClass: 'navigation__item-active',
	linkActiveClass: 'navigation__item-active'
});

export default router;

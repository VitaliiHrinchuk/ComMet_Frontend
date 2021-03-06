
import App from './Components/SignUp/App.vue';
import FirstPage from './Components/First-page/First-page.vue';
import SignUp from './Components/SignUp/SignUp.vue';
import SignIn from './Components/SignUp/SignIn.vue';
import ConfigHelper from './Components/SignUp/ConfigHelper.vue';
import EventPage from './Components/EventsPage/EventsList.vue';
import Event from './Components/EventsPage/Event.vue'
import CreateEvent from './Components/EventsPage/CreateEvent.vue'
import Profile from './Components/Profile/Profile.vue'
import Chat from './Components/Chat/Chat.vue'

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
	{ name: 'ConfigHelper', path: '/Setting', component: ConfigHelper, meta: {requiresAuth: true} },
	{ name: 'user', path: '/Profile/:username', component: Profile, props: true, meta: {requiresAuth: true}},
	{ path: '/', component: FirstPage},
	{ name:'Events', path: '/Events', component: EventPage, meta: {requiresAuth: true, title: ' - Events'}},
	{ path: '/Event/Create', component: CreateEvent, meta: {requiresAuth: true}},
	{ name:'eventPage', path: '/Event/:id', component: Event, props: true, meta: {requiresAuth: true}},
	{ name: 'chatRoom', path: '/Chat/:id',  component: Chat, props: true, meta: {requiresAuth: true}},


	{ path: '/404', component: ErrorNotFound},
	{ path: '*', redirect: '/404'}


];

let router = new VueRouter({
	routes,
	linkExactActiveClass: 'navigation__item-active',
	linkActiveClass: 'navigation__item-active'
});

export default router;

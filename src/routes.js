
import App from './Components/SignUp/App.vue';
import FirstPage from './Components/First-page/First-page.vue';
import SignUp from './Components/SignUp/SignUp.vue';
import SignIn from './Components/SignUp/SignIn.vue';


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
	{ path: '/', component: FirstPage},


];

let router = new VueRouter({
	routes,
	linkExactActiveClass: 'navigation__item-active'
});

export default router;

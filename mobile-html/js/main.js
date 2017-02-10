import '../css/main.scss';
import login from './login/index.vue';
/*Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: login },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
  routes : routes
})


const app = new Vue({
  router : router
}).$mount('#app');*/

new Vue({
	el : '#app',
	components : { login }
});
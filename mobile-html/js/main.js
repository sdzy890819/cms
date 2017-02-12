import '../css/main.scss';
/*import _ from 'lodash';*/
import login from './login/index.vue';
import newindex from './new/index.vue';

Vue.use(VueRouter);

const Home = { template : '<router-view></router-view>'}
const Foo = { template: '<div>foo</div>' }

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes : [
		//{ path: '*', redirect: '/login' },
		{ path: '/', component: Home , 
			children: [
		        { path: '', component: newindex },
				{ path: 'new', component: newindex , children: [
				        { path: 'list', redirect: 'new' }
					]
				}
			]
		}
	]
})


const app = new Vue({
  router : router,
  template: `
    <div id="app">
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app');
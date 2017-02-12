import '../css/main.scss';
/*import _ from 'lodash';*/
import login from './login/index.vue';
import newindex from './new/index.vue';
import newList from './new/list.vue';
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'hash',
	base: __dirname,
	routes: [
		{ path: '/', redirect:'/new'},
		{ path: '/new', component: newindex,
			children: [
				{ path: '', redirect: 'list' },
				{  // new or new/list
					path: 'list', 
					component: newList, 
					alias: ['/new'] 
				},
			]
		}
		/*{ 
	        		path: '/list', 
		        	component : function(resolve){
		        		require(['./new/list.vue'],resolve)
		        	}
		    	},*/
	]
})

new Vue({
  router,
  template: `
    <div id="app">
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
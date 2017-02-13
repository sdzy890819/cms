import '../css/main.scss';
/*import _ from 'lodash';*/
import login from './login/index';
import newindex from './new/index';
import newList from './new/list';
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
				{
					path: 'add', 
					component : function(resolve){
		        		require(['./new/add'],resolve)
		        	}
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
});

new Vue({
  router,
  template: `
    <div id="app">
   		<transition name="fade" mode="in-out">
      		<router-view class="view"></router-view>
      	</transition>
    </div>
  `
}).$mount('#app')
import '../css/main.scss';
/*import _ from 'lodash';*/
import box from './common/box';
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'hash',
	base: __dirname,
	routes: [
		{ path: '/', redirect:'/new'},
		{ path: '/new', component: box,
			children: [
				{ path: '', redirect: 'list' },
				{  // new or new/list
					path: 'list', 
					component: function(resolve){
						require(['./new/list'],resolve)
					}, 
					alias: ['/new'] 
				},
				{
					path: 'add', 
					component : function(resolve){
		        		require(['./new/add'],resolve)
		        	}
				},
			]
		},
		{ path: '/image', component: box,
			children: [
				{ path: '', redirect: 'list' },
				{  // new or new/list
					path: 'list', 
					component : function(resolve){
		        		require(['./image/list'],resolve)
		        	},
					alias: ['/image'] 
				},
				{
					path: 'add', 
					component : function(resolve){
		        		require(['./image/add'],resolve)
		        	}
				},
			]
		},
		{ path: '/video', component: box,
			children: [
				{ path: '', redirect: 'list' },
				{  // new or new/list
					path: 'list', 
					component : function(resolve){
		        		require(['./video/list'],resolve)
		        	},
					alias: ['/video'] 
				},
				{
					path: 'add', 
					component : function(resolve){
		        		require(['./video/add'],resolve)
		        	}
				},
			]
		}
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
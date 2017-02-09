import '../css/main.scss'
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
debugger;
const router = new VueRouter({
  routes : routes
})
const app = new Vue({
  router : router
}).$mount('#app');
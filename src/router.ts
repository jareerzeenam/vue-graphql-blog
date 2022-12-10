import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Blogs from './views/Blogs.vue';
import Blog from './views/Blog.vue';
import Contact from './views/Contact.vue';
import Test from './views/Test.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
  },
  {
    path: '/blogs/:id',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/about',
    name: About,
    component: About,
  },
  {
    path: '/register',
    name: Register,
    component: Register,
  },
  {
    path: '/login',
    name: Login,
    component: Login,
  },
  {
    path: '/contact',
    name: Contact,
    component: Contact,
  },
  {
    path: '/test',
    name: Test,
    component: Test,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass:
    'md:text-blue-700 text-xl dark:text-yellow-50 ease-in-out duration-300 ',
});

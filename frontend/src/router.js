
import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import Posts from "./pages/Posts.vue";



const routes = [
    {path: "/login", component: Login},
    {path: "/signup", component: Signup},
    {path: "/posts", component: Posts},

];

const router = createRouter({
     history: createWebHistory(),
     routes,
});

export default router;
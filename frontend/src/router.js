import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Connection.vue";
import Signup from "./pages/Connection.vue";



const routes = [
    {path: "/login", component: Login},
    {path: "/signup", component: Signup},

];

const router = createRouter({
     history: createWebHistory(),
     routes,
});

export default router;
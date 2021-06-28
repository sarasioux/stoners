import { createRouter, createWebHistory } from "vue-router";
import Test from "../pages/Test";
import Approve from "../pages/Approve";

const routes = [
  {
    // mode: 'history',
    path: "/",
    name: "Test",
    component: Test
  },
  {
    // mode: 'history',
    path: "/approve",
    name: "Approve",
    component: Approve
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

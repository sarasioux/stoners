import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Mint from "../pages/Mint";
import Approve from "../pages/Approve";

const routes = [
  {
    // mode: 'history',
    path: "/",
    name: "Home",
    component: Home
  },
  {
    // mode: 'history',
    path: "/mint",
    name: "Mint",
    component: Mint
  },
  {
    // mode: 'history',
    path: "/test",
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

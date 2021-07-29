import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Mint from "../pages/Mint";
import Claim from "../pages/Claim";
import Approve from "../pages/Approve";
import Code from "../pages/Code";
import Art from "../pages/Art";
import Sanctuary from "../pages/Sanctuary";
import Admin from "../pages/Admin";

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
    path: "/claim",
    name: "Claim",
    component: Claim
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
  {
    // mode: 'history',
    path: "/code",
    name: "Code",
    component: Code
  },
  {
    // mode: 'history',
    path: "/art",
    name: "Art",
    component: Art
  },
  {
    // mode: 'history',
    path: "/sanctuary",
    name: "Sanctuary",
    component: Sanctuary
  },
  {
    // mode: 'history',
    path: "/admin",
    name: "Admin",
    component: Admin
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

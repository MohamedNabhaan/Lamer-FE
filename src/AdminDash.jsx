import { Outlet, redirect } from "react-router-dom";
import Navbar from "./components/AdminNav";
import { logout } from "./utils/auth";

export default function AdminDash() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export async function action() {
  return await logout();
}

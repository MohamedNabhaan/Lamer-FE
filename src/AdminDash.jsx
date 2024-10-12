import { Outlet, redirect } from "react-router-dom";
import Navbar from "./components/AdminNav";
export default function AdminDash() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export async function action() {
  const response = await fetch("http://localhost:3000/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  console.log(response.status);
  if (response.status === 201) {
    return redirect("/AdminLogin");
  }
  return null;
}

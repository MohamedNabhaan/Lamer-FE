import { redirect } from "react-router-dom";

export async function checkAuthLoader() {
  const response = await fetch("http://localhost:3000/auth/currentuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  if (response.status !== 200) {
    return redirect("/Admin");
  }
  return null;
  console.log(response);
}

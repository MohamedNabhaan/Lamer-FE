import { getApiUrlWithId } from "../config/api.js";

export async function projectLoader({ params }) {
  params;
  const response = await fetch(getApiUrlWithId("projects", params.id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": null,
    },
    credentials: "include",
  });

  const project = await response.json();
  const vals = project.images
    .replace("[", "")
    .replace("]", "")
    .replace(/["]/g, "")
    .split(",");
  const date = new Date(project.projectDate);
  project.projectDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  project.images = vals;

  console.log(project);
  return { project };
}

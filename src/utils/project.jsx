export async function projectLoader({ params }) {
  params;
  const response = await fetch("http://localhost:3000/projects/" + params.id, {
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
  project.projectDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  project.images = vals;

  console.log(project);
  return { project };
}

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

  return { project };
}

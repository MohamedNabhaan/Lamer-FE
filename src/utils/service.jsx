import { getApiUrl } from "../config/api.js";

export async function serviceLoader({ params }) {
  console.log(params.id);
  const response = await fetch(
    getApiUrl("services", { serviceName: params.id }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const service = await response.json();
  console.log(service);
  service.map((data) => {
    const vals = data.bannerPic
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    const vals2 = data.pagePics
      .replace("[", "")
      .replace("]", "")
      .replace(/["]/g, "")
      .split(",");
    data.pagePics = vals2;
    data.bannerPic = vals;
  });

  console.log(service);
  return service[0];
}

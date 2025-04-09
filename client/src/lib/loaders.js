import apiRequest from "./apiRequest.js";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/prop/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];
    const postPromise = await apiRequest("/prop?" + query);
    return defer({
      postResponse: postPromise,
    });
  };

  export const profilePageLoader = async () => {
    const postPromise = await apiRequest("/user/");
    console.log(postPromise);
    return defer({
      postResponse: postPromise,
    });
  };
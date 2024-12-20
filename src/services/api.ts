import axios from "axios";
import { Image } from "../App.types";
const instance = axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: "mah4tTxlzmZZG4LqWfB0qRvjxHEz3Ws6lm228JG8yzs",
    orientation: "squarish",
    per_page: 12,
  },
});

interface GalleryResponse {
  results: Image[];
  pages: number;
}

export const getGallery = async (
  query: string,
  page: number = 1
): Promise<GalleryResponse> => {
  const { data } = await instance.get("/search/photos", {
    params: {
      query,
      page,
    },
  });
  const pages = data.total_pages;
  const results = data.results;

  return { results, pages };
};

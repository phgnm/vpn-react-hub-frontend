import axios from "axios";

const PICSUM_API_URL = "https://picsum.photos";

export async function fetchPhotos(page = 1, limit = 30) {
  try {
    const response = await axios.get(`${PICSUM_API_URL}/v2/list?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}

export async function fetchPhotoById(photoId) {
  if (!photoId) {
    throw new Error("Photo ID is required");
  }
  try {
    const response = await axios.get(`${PICSUM_API_URL}/id/${photoId}/info`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photo with ID ${photoId}:`, error);
    throw error;
  }
}
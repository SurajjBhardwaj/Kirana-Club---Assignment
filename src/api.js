import axios from "axios";

const API_URL = "https://codeforces.com/api/contest.list";

export const fetchContests = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching contests:", error);
    throw error;
  }
};

import axios from "axios";
import { toast } from "react-toastify";


export const UserCarDataPost = async (formData) => {

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}user-car`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Data saved successfully")

    return response;
  } catch (error) {

toast.error(error?.response.data?.message)
  }
};

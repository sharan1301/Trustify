import api from "./axios";

const url = "/user";

//user login
export const apiUserDetails = async () => {
  try {
    const response = await api.get(`${url}/`);

    const { id, name, email, phone, Certificates, Institution, message } =
      response.data;

    return { id, name, email, phone, Certificates, Institution };
  } catch (error) {
    console.log(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

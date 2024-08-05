import api from "./axios";

const url = "/admin";

//get details for admin dashboard
export const apiAdminInstitutionsDetails = async () => {
  try {
    const response = await api.get(`${url}/institutions`);

    const { institutions } = response.data;

    return { institutions };
  } catch (error) {
    console.log(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//approve/reject institute
export const apiAdminApproveInstitutes = async (data) => {
  try {
    const response = await api.patch(
      `${url}/approve-institute?instituteId=${data.instituteId}&isApproved=${data.isApproved}`
    );

    const { message } = response.data;

    return { message };
  } catch (error) {
    console.log(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

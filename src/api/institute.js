import api from "./axios";

const url = "/institute";

//institute details
export const apiInstituteDetails = async () => {
  try {
    const response = await api.get(`${url}/`);

    const {
      id,
      name,
      code,
      email,
      phone,
      proof,
      templates,
      certificateFormats,
      users,
      isApproved,
      isEmailVerified,
    } = response.data;

    const institute = {
      id,
      name,
      code,
      email,
      phone,
      proof,
      templates,
      certificateFormats,
      users,
      isApproved,
      isEmailVerified,
    };

    return institute;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//upload institute proof
export const apiUploadProof = async (data) => {
  try {
    const response = await api.post(`${url}/upload-proof`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//upload institute's certificate templates
export const apiUploadCertificateTemplate = async (data) => {
  try {
    const response = await api.post(`${url}/upload-template`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//remove a certificate template
export const apiDeleteCertificateTemplate = async (data) => {
  try {
    const response = await api.delete(
      `${url}/delete-template?templateUrl=${data.templateUrl}`
    );

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//add certificate format
export const apiAddCertificateFormat = async (data) => {
  try {
    const response = await api.post(`${url}/add-certificate-format`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//delete a certificate format
export const apiDeleteCertificateFormat = async (data) => {
  try {
    const response = await api.delete(
      `${url}/delete-certificate-format?certificateFormatId=${data.certificateFormatId}`
    );

    const { message } = response.data;

    return message;
  } catch (error) {
    console.error(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//add user to the institution
export const apiAddUser = async (data) => {
  try {
    const response = await api.post(`${url}/add-user`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//remove a user from the institution
export const apiRemoveUser = async (data) => {
  try {
    const response = await api.delete(
      `${url}/remove-user?userId=${data.userId}`
    );

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//generate certificate for the user with the selected certificate format
export const apiGenerateCertificate = async (data) => {
  try {
    const response = await api.post(`${url}/generate-certificate`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

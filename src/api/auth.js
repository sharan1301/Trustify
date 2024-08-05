import api from "./axios";
import Cookies from "js-cookie";

const url = "/";

//admin login
export const apiAdminLogin = async (data) => {
  try {
    const response = await api.post(`${url}login/admin`, data);

    const { token, message, institutions } = response.data;

    Cookies.set("token", token);

    return { message, institutions };
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//instiute register
export const apiInstituteRegister = async (data) => {
  try {
    const response = await api.post(`${url}register/institute`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//institute login
export const apiInstituteLogin = async (data) => {
  try {
    const response = await api.post(`${url}login/institute`, data);

    const {
      id,
      name,
      code,
      email,
      phone,
      proof,
      templates,
      certificateFormats,
      token,
      users,
      message,
      isApproved,
      isEmailVerified,
    } = response.data;

    if (isEmailVerified) Cookies.set("token", token);

    const institute = {
      id,
      name,
      code,
      email,
      phone,
      proof,
      users,
      templates,
      certificateFormats,
      isApproved,
      isEmailVerified,
    };

    return { institute, message };
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//institute verify email
export const apiInstituteVerifyEmail = async (data) => {
  try {
    const response = await api.post(`${url}verify/institute`, data);

    const {
      name,
      code,
      email,
      phone,
      proof,
      templates,
      certificateFormats,
      token,
      message,
      isApproved,
      isEmailVerified,
    } = response.data;

    if (isEmailVerified) Cookies.set("token", token);

    const institute = {
      name,
      code,
      email,
      phone,
      proof,
      templates,
      certificateFormats,
      isApproved,
      isEmailVerified,
    };

    return { institute, message };
  } catch (error) {
    console.error(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//institute forgot password
export const apiInstituteForgotPassword = async (data) => {
  try {
    const response = await api.post(`${url}forgot-password/institute`, data);

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//institute reset password
export const apiInstituteResetPassword = async ({ data, token }) => {
  try {
    const response = await api.post(
      `${url}reset-password/institute?token=${token}`,
      data
    );

    const { message } = response.data;

    return message;
  } catch (error) {
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

//user login
export const apiUserLogin = async (data) => {
  try {
    const response = await api.post(`${url}login/user`, data);

    const {
      id,
      name,
      email,
      phone,
      Certificates,
      Institution,
      token,
      message,
    } = response.data;

    Cookies.set("token", token);

    const user = { id, name, email, phone, Certificates, Institution };

    return { user, message };
  } catch (error) {
    console.log(error);
    if (error.response) throw error.response.data.error;
    throw error;
  }
};

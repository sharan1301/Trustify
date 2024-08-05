import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home/Home";

import LoginLayout from "@/pages/Auth/Login/LoginLayout";
import RegisterLayout from "@/pages/Auth/Register/RegisterLayout";

import InstituteDashboardLayout from "@/pages/Institute/InstituteDashboardLayout";
import VerifyLayout from "@/pages/Auth/Verify/VerifyLayout";

import ForgotPasswordLayout from "@/pages/Auth/ForgotPassword/ForgotPasswordLayout";
import ResetPasswordLayout from "@/pages/Auth/ResetPassword/ResetPasswordLayout";

import NotFound from "@/pages/NotFound/NotFound";

import InstituteDashboard from "@/pages/Institute/Dashboard/InstituteDashboard";
import AddCertificateFormat from "@/pages/Institute/CertificateFormat/AddCertificateFormat";
import AddUser from "@/pages/Institute/Users/AddUser";
import ViewUsers from "@/pages/Institute/Users/ViewUsers";
import UploadTemplate from "@/pages/Institute/Template/UploadTemplate";
import GenerateCertificate from "@/pages/Institute/Certificate/GenerateCertificate";
import ViewCertificates from "@/pages/Institute/Certificate/ViewCertificates";

import UserDashboardLayout from "@/pages/User/UserDashboardLayout";
import UserDashboard from "@/pages/User/Dashboard/UserDashboard";
import ViewUserCertificates from "@/pages/User/Certificates/ViewCertificates";
import ViewUserInstitutes from "@/pages/User/Institution/ViewInstitutes";
import AdminDashboardLayout from "@/pages/Admin/AdminDashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import Institutes from "@/pages/Admin/Institutes/Institutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/user" element={<LoginLayout />} />
      <Route path="/login/institute" element={<LoginLayout />} />
      <Route path="/login/admin" element={<LoginLayout />} />
      <Route path="/register/institute" element={<RegisterLayout />} />
      <Route
        path="/institute/forgot-password"
        element={<ForgotPasswordLayout />}
      />
      <Route
        path="/institute/reset-password"
        element={<ResetPasswordLayout />}
      />
      <Route path="/institute/verify" element={<VerifyLayout />} />
      <Route path="/institute" element={<InstituteDashboardLayout />}>
        <Route path="/institute" element={<InstituteDashboard />} />
        <Route path="/institute/upload-template" element={<UploadTemplate />} />
        <Route
          path="/institute/add-certificate-format"
          element={<AddCertificateFormat />}
        />
        <Route
          path="/institute/generate-certificate"
          element={<GenerateCertificate />}
        />
        <Route
          path="/institute/view-certificates"
          element={<ViewCertificates />}
        />
        <Route path="/institute/add-user" element={<AddUser />} />
        <Route path="/institute/view-users" element={<ViewUsers />} />
      </Route>
      <Route path="/user" element={<UserDashboardLayout />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/certificates" element={<ViewUserCertificates />} />
        <Route path="/user/institutes" element={<ViewUserInstitutes />} />
      </Route>
      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/institutes" element={<Institutes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

import {
  LucideHome,
  LucideInfo,
  LucideContact,
  LucideWallet,
  LucideLogIn,
} from "lucide-react";

import Logo from "@/assets/logo.svg";
import Trustify from "@/assets/hero.webp";

import Feature1 from "@/assets/feature1.webp";
import Feature2 from "@/assets/feature2.webp";
import Feature3 from "@/assets/feature3.webp";
import Feature4 from "@/assets/feature4.webp";

import User from "@/assets/user.jpg";
import Institution from "@/assets/institution.jpg";
import Admin from "@/assets/admin.jpg";
import OTP from "@/assets/otp.jpg";
import Upload from "@/assets/upload.jpg";
import ForgotPassword from "@/assets/forgot-password.jpg";
import ResetPassword from "@/assets/reset-password.jpg";

export {
  Logo,
  Trustify,
  Feature1,
  Feature2,
  Feature3,
  Feature4,
  User,
  Institution,
  Admin,
  OTP,
  Upload,
  ForgotPassword,
  ResetPassword,
};

export const navItems = [
  {
    id: 1,
    title: "Home",
    path: "/#top",
    icon: LucideHome,
  },
  {
    id: 2,
    title: "About",
    path: "/#about",
    icon: LucideInfo,
  },
  {
    id: 3,
    title: "Features",
    path: "/#features",
    icon: LucideWallet,
  },
  {
    id: 4,
    title: "Contact",
    path: "/#contact",
    icon: LucideContact,
  },
  {
    id: 5,
    title: "Login",
    path: "/#login",
    icon: LucideLogIn,
  },
];

export const loginOptions = [
  {
    id: 1,
    title: "User Login",
    desc: "View your certificates",
    image: User,
    path: "/login/user",
  },
  {
    id: 2,
    title: "Institution Login",
    desc: "Issue certificates",
    image: Institution,
    path: "/login/institute",
  },
  {
    id: 3,
    title: "Admin Login",
    desc: "Manage the platform",
    image: Admin,
    path: "/login/admin",
  },
];

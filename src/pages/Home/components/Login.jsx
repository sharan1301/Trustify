import { useNavigate } from "react-router-dom";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import { loginOptions } from "@/constants";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div
      id="login"
      className="my-20 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-6 sm:gap-y-0 sm:gap-x-14"
    >
      {loginOptions.map((option, index) => (
        <CardContainer key={index}>
          <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-xs sm:w-[18rem] h-auto rounded-xl px-6 border">
            <CardItem translateZ="60" className="w-full mt-4">
              <img
                src={option.image}
                className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={`${option.title} login`}
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-center w-full text-xl mt-2 font-bold dark:text-neutral-100"
            >
              {option.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-center w-full text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-400"
            >
              {option.desc}
            </CardItem>
            <CardItem
              translateZ="20"
              as="button"
              onClick={() => navigate(option.path)}
              className="mt-2 mb-4 px-4 py-2 rounded-xl dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300 text-sm font-bold w-full"
            >
              Login as {option.title.substring(0, option.title.indexOf(" "))}
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};

export default Login;

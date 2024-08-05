import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomCard = ({
  title,
  description,
  link,
  btnText,
  disabled = false,
}) => {
  return (
    <Card className="min-w-[240px] max-w-[300px]">
      <CardHeader className="pb-3">
        <CardTitle className="font-medium">{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {!disabled && (
        <CardFooter>
          <Link
            to={link}
            disabled={disabled}
            className="px-4 py-2 text-sm rounded dark:bg-indigo-600/30 dark:border-indigo-800/40 border-indigo-800/40 border-2 dark:text-gray-50 text-indigo-600 dark:hover:bg-indigo-600/60 transition-colors duration-300"
          >
            {btnText}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default CustomCard;

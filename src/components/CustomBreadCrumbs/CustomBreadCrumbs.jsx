import React from "react";
import { Link } from "react-router-dom";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CustomBreadCrumbs = ({ previousPages = [], currentPage = "" }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {previousPages.map((previousPage, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={previousPage.to}>{previousPage.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumbs;

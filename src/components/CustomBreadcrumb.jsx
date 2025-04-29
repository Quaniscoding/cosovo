import React from "react";
import { Breadcrumb } from "antd";
import { HomeIcon } from "lucide-react";

const CustomBreadcrumb = ({ items }) => {
  return (
    <Breadcrumb
      items={[
        {
          href: "/",
          title: (
            <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-all duration-200">
              <HomeIcon size={20} />
              <span className="text-xl font-semibold">COSOVO</span>
            </div>
          ),
        },
        ...items,
      ]}
      className="!text-xl !font-semibold flex items-center !gap-2 !mb-4 !p-2 min-h-5"
    />
  );
};

export default CustomBreadcrumb;

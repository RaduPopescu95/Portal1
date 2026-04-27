"use client";

import { usePathname } from "next/navigation";
import BreadCrumb from "../../common/BreadCrumb";
import { formatPathname } from "@/utils/commonUtils";

const BreadCrumbBanner = ({ title }) => {
  const pathname = usePathname();
  const formattedPathname = formatPathname(pathname);
  const pageTitle =
    title ||
    (Array.isArray(formattedPathname)
      ? formattedPathname.join(" > ")
      : formattedPathname);
  return (
    <section className="inner_page_breadcrumb py-3">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb
                csName={"color-white"}
                title="Acasă"
                subTitle={
                  Array.isArray(formattedPathname)
                    ? formattedPathname.join(" > ")
                    : formattedPathname
                }
              />
              <h1 className="mt10 fz30 color-white text-upper-letters">
                {pageTitle}
              </h1>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;

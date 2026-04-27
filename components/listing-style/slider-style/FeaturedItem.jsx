import Link from "next/link";

import Image from "next/image";
import AgencyDetails from "@/components/agency-details";
import PromotionSection from "./PromotionSection";
import { slugifyFirma } from "@/utils/slugify";

const FALLBACK_IMAGE = "/assets/categorii/amenajari-gradini-si-spatii-verzi.svg";

const FeaturedItem = ({ firme = [], params, searchParams, renderMode }) => {
  let content;
  const mode = renderMode || (params ? "detail" : "home");

  if (mode === "detail" && firme.length === 0) {
    return <PromotionSection params={params} />;
  }

  if (mode === "detail") {
    content = firme
      .slice(0, 1)
      .map((item) => <AgencyDetails key={item._id || item.slug} firma={item} />);
  } else {
    content = firme.map((item, idx) => (
      <div className={`${"col-md-3 col-lg-3"} `} key={item._id || item.id || item.documentId || item.slug}>
        <Link
          href={`/firma/${item?.slug || slugifyFirma(item)}`}
        >
          <div className={`feat_property home7 style4 ${undefined}`}>
            <div className="thumb">
              <Image
                width={342}
                height={220}
                className="img-whp w-100 h-100 cover"
                src={item?.imagini?.imgs?.[0]?.finalUri || FALLBACK_IMAGE}
                alt={
                  item?.imagini?.imgs?.[0]?.alt ||
                  [item?.siteName, item?.categorie, item?.localitate]
                    .filter(Boolean)
                    .join(" - ") ||
                  "Firma amenajari gradini"
                }
                priority={idx < 2}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <span className="color-white fz14">Promovat</span>
                  </li>
                </ul>

                {/* <Link
                href={`/agentie/${item?.id}`}
                className="fp_price"
              >
                ${item?.price}
                <small>/mo</small>
              </Link> */}
              </div>
            </div>
            <div className="details">
              <div className="tc_content p10">
                {/* <p className="text-thm">{item?.type}</p> */}
                <h3 className="fz20">
                  {/* <Link
                    href={`/${replaceSpacesWithDashes(
                      item?.categorie.toLowerCase()
                    )}-${replaceSpacesWithDashes(
                      item?.localitate.toLowerCase()
                    )}`}
                  > */}
                  {item?.siteName}
                  {/* </Link> */}
                </h3>
                {/* <p>{item?.metaDescription}</p> */}

              </div>
              {/* End .tc_content */}

              <div className="fp_footer p10">
                <ul className="fp_meta float-start mb0">
                  <li>
                    <p>
                      <span className="flaticon-placeholder"></span>
                      {item?.adresa}
                    </p>
                  </li>
                  {/* <li>
                  <p>{item?.distanta} metri</p>
                </li> */}
                </ul>
              </div>

              {/* End .fp_footer */}
            </div>
          </div>
        </Link>
      </div>
    ));
  }

  // add length of filter items

  return <>{content}</>;
};

export default FeaturedItem;

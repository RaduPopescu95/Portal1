import Link from "next/link";

import { addLength } from "../../../features/properties/propertiesSlice";
import properties from "../../../data/properties";
import Image from "next/image";
import { fetchLocation } from "@/app/services/geocoding";
import { handleDiacrtice, replaceSpacesWithDashes } from "@/utils/strintText";
import AgencyDetails from "@/components/agency-details";
import {
  handleQueryDoubleParam,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";
import { calculateDistance } from "@/utils/commonUtils";
import PromotionSection from "./PromotionSection";
import { slugifyFirma } from "@/utils/slugify";

const FeaturedItem = ({ firme, params, searchParams, renderMode }) => {
  let content;
  const mode = renderMode || (params ? "detail" : "home");

  if (mode === "detail" && firme.length === 0) {
    return <PromotionSection params={params} />;
  }

  if (mode === "detail") {
    content = firme.slice(0, 1).map((item) => <AgencyDetails firma={item} />);
  } else {
    content = firme.map((item, idx) => (
      <div className={`${"col-md-3 col-lg-3"} `} key={item.id || item.documentId}>
        <Link
          href={`/firma/${item?.slug || slugifyFirma(item)}`}
        >
          <div className={`feat_property home7 style4 ${undefined}`}>
            <div className="thumb">
              <Image
                width={342}
                height={220}
                className="img-whp w-100 h-100 cover"
                src={item?.imagini?.imgs[0]?.finalUri}
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
                    <a href="#">Promovat</a>
                  </li>
                  {/* <li className="list-inline-item">
                  <a href="#" className="text-capitalize">
                    {item?.featured}
                  </a>
                </li> */}
                </ul>
                {/* <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-transfer-1"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul> */}

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
                <h2 className="fz20">
                  {/* <Link
                    href={`/${replaceSpacesWithDashes(
                      item?.categorie.toLowerCase()
                    )}-${replaceSpacesWithDashes(
                      item?.localitate.toLowerCase()
                    )}`}
                  > */}
                  {item?.siteName}
                  {/* </Link> */}
                </h2>
                {/* <p>{item?.metaDescription}</p> */}

                {/* <ul className="prop_details mb0">
                {item?.itemDetails.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                      {val.name}: {val.number}
                    </a>
                  </li>
                ))}
              </ul> */}
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

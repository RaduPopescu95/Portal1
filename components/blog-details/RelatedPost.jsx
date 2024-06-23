import Link from "next/link";
import relatedPostContent from "../../data/blogs";
import Image from "next/image";
import { replaceSpacesWithDashes } from "@/utils/strintText";

const RelatedPost = ({ articole }) => {
  return (
    <>
      {articole.slice(0, 3).map((item) => (
        <div className="col-md-4 col-lg-4" key={item?.id}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link
                href={`/blog/${item.id}-${replaceSpacesWithDashes(
                  item.siteName.toLowerCase()
                )}`}
              >
                <Image
                  width={343}
                  height={220}
                  className="img-whp cover"
                  src={item?.image?.finalUri}
                  alt={item?.image?.finalUri}
                />
              </Link>
            </div>
            <div className="details">
              <div className="tc_content p15">
                <h3>
                  <Link
                    href={`/blog/${item.id}-${replaceSpacesWithDashes(
                      item.siteName.toLowerCase()
                    )}`}
                  >
                    {item?.siteName}
                  </Link>
                </h3>
                <ul className="bpg_meta">
                  <li className="list-inline-item">
                    <i className="flaticon-calendar"></i>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">{item?.firstUploadDate}</a>
                  </li>
                </ul>
                <p>{item?.metaDescription.slice(0, 65)}</p>
              </div>
              {/* End . tc_content */}

              <div className="fp_footer">
                {/* <ul className="fp_meta float-start mb0"></ul> */}
                <Link
                  className="fp_pdate float-end text-thm mr10"
                  href={`/blog/${item.id}-${replaceSpacesWithDashes(
                    item.siteName.toLowerCase()
                  )}`}
                >
                  Citește mai mullt <span className="flaticon-next ml10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RelatedPost;

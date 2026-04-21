import Link from "next/link";
import blogs from "../../data/blogs";
import Image from "next/image";
const FALLBACK_IMAGE = "/assets/categorii/amenajari-gradini-si-spatii-verzi.svg";

const Blogs = ({ articole = [] }) => {
  return (
    <>
      {articole.slice(0, 3).map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item._id || item.slug}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link
                href={`/blog/${item.slug}`}
              >
                <Image
                  width={343}
                  height={220}
                  className="img-whp cover"
                  src={item?.image?.finalUri || FALLBACK_IMAGE}
                  alt={item?.image?.alt || item?.siteName || "Articol blog"}
                />
              </Link>
            </div>
            <div className="details">
              <div className="tc_content p15">
                <h3>
                  <Link
                    href={`/blog/${item.slug}`}
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
                <p>{item?.metaDescription?.slice(0, 65)}</p>
              </div>
              {/* End . tc_content */}

              <div className="fp_footer">
                {/* <ul className="fp_meta float-start mb0"></ul> */}
                <Link
                  className="fp_pdate float-end text-thm mr10"
                  href={`/blog/${item.slug}`}
                >
                  Citește mai mult <span className="flaticon-next ml10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blogs;

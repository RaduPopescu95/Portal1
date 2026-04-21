import Link from "next/link";
import Image from "next/image";

const FALLBACK_IMAGE = "/assets/categorii/amenajari-gradini-si-spatii-verzi.svg";

const Blog = ({ articole = [] }) => {
  return (
    <>
      {articole.map((item) => (
        <div className="for_blog feat_property" key={item._id || item.slug}>
          <div className="thumb">
            <Link href={`/blog/${item.slug}`}>
              <Image
                width={731}
                height={438}
                priority
                className="img-whp cover w-100"
                src={item?.image?.finalUri || FALLBACK_IMAGE}
                alt={item?.image?.alt || item?.siteName || "Articol blog"}
              />
            </Link>
            {/* <div className="blog_tag">{item.postMeta}</div> */}
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content p10">
              <h4 className="mb15">
                <Link href={`/blog/${item.slug}`}>{item.siteName}</Link>
              </h4>
              <p>{item?.metaDescription?.slice(0, 285)}</p>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer p10">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-calendar pr10"></span>{" "}
                    {item.firstUploadDate}
                  </a>
                </li>
              </ul>
              <Link className="fp_pdate float-end text-thm" href={`/blog/${item.slug}`}>
                Citeste mai mult <span className="flaticon-next"></span>
              </Link>
            </div>
            {/* End fb_footer */}
          </div>
          {/* End .thumb */}
        </div>
      ))}
    </>
  );
};

export default Blog;

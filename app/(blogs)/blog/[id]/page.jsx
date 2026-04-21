import BreadCrumb2 from "@/components/blog-details/BreadCrumb2";
import Comments from "@/components/blog-details/Comments";
import Pagination from "@/components/blog-details/Pagination";
import Ratings from "@/components/blog-details/Ratings";
import RelatedPost from "@/components/blog-details/RelatedPost";
import ReviewBox from "@/components/blog-details/ReviewBox";
import BlogSidebar from "@/components/common/blog/BlogSidebar";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Social from "@/components/common/footer/Social";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import blogs from "@/data/blogs";
import Image from "next/image";

import {
  handleGetFirestore,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildArticleLd } from "@/utils/schemaOrg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const revalidate = 60; // revalidate at most every minute , hour at 3600

export async function generateMetadata({ params }) {
  if (params.id === "favicon.ico") {
    return null;
  }
  const parts = params.id.split("-");
  const id = Number(parts[0]);
  const blogArr = await handleQueryFirestore("Articole", "id", id);
  const blog = blogArr?.[0];

  const title = blog?.metaTitle || blog?.siteName || "Articol blog";
  const description =
    blog?.metaDescription ||
    "Articole si ghiduri despre amenajari gradini si spatii verzi.";
  const imageUrl = blog?.image?.finalUri;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${params.id}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    alternates: {
      canonical: `/blog/${params.id}`,
    },
  };
}

const BlogDetailsDynamic = async ({ params }) => {
  const parts = params.id.split("-");
  const id = Number(parts[0]);
  if (id === "favicon.ico") {
    return null; // Returnează null sau orice alt component care indică că pagina nu trebuie să proceseze acest id.
  }
  console.log("id is here...", id);
  const blogArr = await handleQueryFirestore("Articole", "id", id);
  const articole = await handleGetFirestore("Articole");
  const blog = blogArr[0];
  const articleLd = buildArticleLd(blog, SITE_URL, `/blog/${params.id}`);

  return (
    <>
      <JsonLd data={articleLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Blog", path: "/blog" },
          {
            name: blog?.siteName || "Articol",
            path: `/blog/${params.id}`,
          },
        ]}
      />

      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Main Blog Post Content --> */}
      <section className="blog_post_container bgc-f7">
        <div className="container">
          {/* <div className="row">
            <div className="col-xl-6">
              <BreadCrumb2 />
            </div>
          </div> */}
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  {/* <div className="blog_sp_tag">
                    <a href="#">{blog?.postMeta}</a>
                  </div> */}
                  <h3 className="blog_sp_title">{blog?.siteName}</h3>
                  <ul className="blog_sp_post_meta">
                    {/* <li className="list-inline-item">
                      <a href="#">
                        <Image
                          width={40}
                          height={40}
                          className="img-fluid"
                          src="/assets/images/property/pposter1.png"
                          alt="pposter1.png"
                        />
                      </a>
                    </li> */}
                    {/* <li className="list-inline-item">
                      <a href="#">Ali Tufan</a>
                    </li> */}
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{blog?.firstUploadDate}</a>
                    </li>
                    {/* <li className="list-inline-item">
                      <span className="flaticon-view"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#"> 341 views</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-chat"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">15</a>
                    </li> */}
                  </ul>
                  <div className="thumb">
                    <Image
                      width={692}
                      height={414}
                      className="w-100 h-100 cover"
                      src={blog?.image?.finalUri}
                      alt={blog?.siteName || "Articol blog"}
                      priority
                    />
                  </div>

                  <div className="details">
                    {blog?.articleContentFirst && (
                      <div
                        className="mb25"
                        dangerouslySetInnerHTML={{
                          __html: blog.articleContentFirst,
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="details">
                    {blog?.articleContentSecond && (
                      <div
                        className="mb25"
                        dangerouslySetInnerHTML={{
                          __html: blog.articleContentSecond,
                        }}
                      ></div>
                    )}
                  </div>
                  <ul className="blog_post_share">
                    <li>
                      <p>Distribuire</p>
                    </li>
                    <Social />
                  </ul>
                  {/* End .blog_post_share */}
                </div>
                {/* End .mbp_thumb_post */}

                {/* <div className="mbp_pagination_tab">
                  <Pagination />
                </div> */}
                {/* End mbp_pagination_tab */}
                {/* 
                <div className="product_single_content mb30">
                  <div className="mbp_pagination_comments">
                    <div className="total_review">
                      <h4>896 Reviews</h4>
                      <ul className="review_star_list mb0 pl10">
                        <Ratings />
                      </ul>
                      <a className="tr_outoff pl10" href="#">
                        ( 4.5 out of 5 )
                      </a>
                      <a className="write_review float-end fn-xsd" href="#">
                        Write a Review
                      </a>
                    </div>


                    <Comments />
                    <div className="custom_hr"></div>
                  </div>
                </div> */}
                {/* End .product_single_content  */}

                {/* <div className="bsp_reveiw_wrt">
                  <h4>Write a Review</h4>

                  <ul className="review_star">
                    <li className="list-inline-item">
                      <span className="sspd_review">
                        <ul>
                          <Ratings />
                        </ul>
                      </span>
                    </li>
                    <li className="list-inline-item pr15">
                      <p>Your Rating & Review</p>
                    </li>
                  </ul>
                  <ReviewBox />
                </div> */}
                {/* End .bsp_reveiw_wrt */}
              </div>
              {/* End .main_blog_post_content */}

              <div className="row">
                <div className="col-lg-12 mb20 mt20">
                  <h4>Alte articole</h4>
                </div>
                <RelatedPost articole={articole} />
              </div>
            </div>
            {/* End .col */}

            {/* <div className="col-lg-4">
              <BlogSidebar />
            </div> */}
            {/* End Sidebar column */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      {/* <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section> */}
    </>
  );
};

export default BlogDetailsDynamic;

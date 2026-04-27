import RelatedPost from "@/components/blog-details/RelatedPost";
import Footer from "@/components/common/footer/Footer";
import Social from "@/components/common/footer/Social";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import Image from "next/image";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildArticleLd } from "@/utils/schemaOrg";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/lib/sanity/queries";
import PortableContent from "@/components/sanity/PortableContent";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";

export const revalidate = 60; // revalidate at most every minute , hour at 3600

const FALLBACK_IMAGE = "/assets/categorii/amenajari-gradini-si-spatii-verzi.svg";

export async function generateStaticParams() {
  return await getArticleSlugs();
}

export async function generateMetadata({ params }) {
  const blog = await getArticleBySlug(params.id);

  const title = blog?.metaTitle || blog?.siteName || "Articol blog";
  const description =
    blog?.metaDescription ||
    "Articole si ghiduri despre amenajari gradini si spatii verzi.";
  const imageUrl = blog?.image?.finalUri;
  const canonical = canonicalUrl(`/blog/${params.id}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: imageUrl ? [{ url: imageUrl }] : [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical,
    },
  };
}

const BlogDetailsDynamic = async ({ params }) => {
  const [blog, articole] = await Promise.all([
    getArticleBySlug(params.id),
    getArticles({ limit: 6 }),
  ]);
  if (!blog) {
    notFound();
  }
  const articleLd = buildArticleLd(blog, null, `/blog/${params.id}`);

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
                  <h1 className="blog_sp_title">{blog?.siteName}</h1>
                  <ul className="blog_sp_post_meta">
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <span>{blog?.firstUploadDate}</span>
                    </li>
                  </ul>
                  <div className="thumb">
                    <Image
                      width={692}
                      height={414}
                      className="w-100 h-100 cover"
                      src={blog?.image?.finalUri || FALLBACK_IMAGE}
                      alt={blog?.image?.alt || blog?.siteName || "Articol blog"}
                      priority
                    />
                  </div>

                  <div className="details">
                    <PortableContent value={blog?.content} className="mb25" />
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

              </div>
              {/* End .main_blog_post_content */}

              <div className="row">
                <div className="col-lg-12 mb20 mt20">
                  <h2>Alte articole</h2>
                </div>
                <RelatedPost articole={articole} />
              </div>
            </div>
            {/* End .col */}

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

    </>
  );
};

export default BlogDetailsDynamic;

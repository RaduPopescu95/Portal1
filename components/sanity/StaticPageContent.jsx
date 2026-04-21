import PortableContent from "./PortableContent";

export default function StaticPageContent({ page }) {
  if (!page) return null;

  return (
    <section className="blog_post_container bgc-f7">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="main_blog_post_content">
              <h1>{page.h1 || page.title}</h1>
              {page.intro && <p className="fz18">{page.intro}</p>}
              <PortableContent value={page.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


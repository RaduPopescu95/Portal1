"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import propertiesContent from "../../data/properties";
import Image from "next/image";

const FALLBACK_IMAGE = "/assets/categorii/amenajari-gradini-si-spatii-verzi.svg";

const ListingGallery = ({ firma }) => {
  console.log("test........", firma);
  const images = firma?.imagini?.imgs?.length
    ? firma.imagini.imgs
    : [{ finalUri: FALLBACK_IMAGE, alt: `${firma?.siteName || "Firma"} imagine` }];
  const fallbackAlt = [firma?.siteName, firma?.categorie, firma?.localitate]
    .filter(Boolean)
    .join(" - ");
  const firstImg = images[0];
  const firstAlt =
    (firstImg && firstImg.alt) ||
    fallbackAlt ||
    "Imagine firma amenajari gradini";
  return (
    <>
      <Gallery>
        <div>
          <div className="row">
            <div className="col-sm-7 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="spls_style_two mb30-520">
                    <Item
                      original={images[0].finalUri}
                      thumbnail={images[0].finalUri}
                      width={752}
                      height={450}
                    >
                      {({ ref, open }) => (
                        <div role="button" ref={ref} onClick={open}>
                          <Image
                            width={752}
                            height={450}
                            className="img-fluid w100 lds-1 cover h-100"
                            src={images[0].finalUri}
                            alt={firstAlt}
                          />
                        </div>
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-sm-7 .col-lg-8 */}

            <div className="col-sm-5 col-lg-4">
              <div className="row">
                {images.map((val, i) => {
                  // Skip the first item (index 0)
                  if (i === 0) return null;

                  return (
                    <div className="col-6" key={i}>
                      <div className="spls_style_two img-gallery-box mb24">
                        <Item
                          original={val.finalUri}
                          thumbnail={val.finalUri}
                          width={752}
                          height={450}
                        >
                          {({ ref, open }) => (
                            <div role="button" ref={ref} onClick={open}>
                              <Image
                                width={170}
                                height={133}
                                className="img-fluid w100 cover"
                                src={val.finalUri}
                                alt={
                                  val.alt ||
                                  (fallbackAlt
                                    ? `${fallbackAlt} (${i + 1})`
                                    : "Imagine firma amenajari gradini")
                                }
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* End  col-sm-5 col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* // End single item loop */}
      </Gallery>
    </>
  );
};

export default ListingGallery;

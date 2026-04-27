'use client'

import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";

const FeaturedProperties = () => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {properties.slice(0, 12).map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home3">
              <div className="thumb">
                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.img}
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item.saleTag.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="icon mb0">
                    <li className="list-inline-item">
                      <span>
                        <span className="flaticon-transfer-1"></span>
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <span>
                        <span className="flaticon-heart"></span>
                      </span>
                    </li>
                  </ul>

                  <Link
                    href={`/listing-details-v1/${item.id}`}
                    className="fp_price"
                  >
                    ${item.price}
                    <small>/mo</small>
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{item.type}</p>
                  <h3>
                    <Link href={`/listing-details-v1/${item.id}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {item.location}
                  </p>

                  <ul className="prop_details mb0">
                    {item.itemDetails.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <span>
                          {val.name}: {val.number}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;

import ListSearchJudete from "../common/ListSearchJudete";
import Pagination from "../common/blog/Pagination";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import GlobalHeroFilter from "../common/GlobalHeroFilter";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import FilterTopBar from "../common/listing/FilterTopBar";
import GridListButton from "../common/listing/GridListButton";
import ShowFilter from "../common/listing/ShowFilter";
import SidebarListing3 from "../common/listing/SidebarListing3";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumb from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";
import HeroSlider from "./HeroSlider";
import Image from "next/image";
import CallToAction from "../common/CallToAction";
import SidebarListing from "../common/listing/SidebarListing";
import { handleQueryFirestoreSubcollection } from "@/utils/firestoreUtils";

const index = ({ localitati, firme, judet, params }) => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}

      {/* <!-- 6th Home Design --> */}
      <section className="home-listing-slider hight-fx p0">
        <div className="container-fluid p0">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-banner-wrapper">
                <div className="banner-style-one arrow-style-2">
                  <HeroSlider />
                </div>
              </div>
              {/* <!-- /.main-banner-wrapper --> */}
            </div>
          </div>
        </div>
        {/* End .container-fluid */}

        <div className="container home_iconbox_container listing-slider-style">
          <div className="row posr">
            <div className="col-lg-12">
              <div className="home_content listing slider_style pt30">
                <div className="home-text home6 text-center">
                  <h1 className="fz50 color-white">
                    {judet
                      ? `Descopera furnizori de servicii in ${judet}`
                      : "Descopera furnizori de servicii autorizati"}
                  </h1>
                </div>
                {/* End home-text */}
                <ListSearchJudete
                  className="mt40"
                  localitati={localitati}
                  judet={judet}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End container */}
      </section>

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-primary pt-0 pb30-991 md-mt0 categorii-container-section">
        <div className="container">
          <div className="row pt30">
            <div className="col-md-8 col-lg-8">
              <div className="row">
                <FeaturedItem firme={firme} params={params} />
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End  .col */}
            <div className="col-md-4 col-lg-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListing localitati={localitati} judet={judet} />
              </div>
            </div>
            {/* End  .col */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Start Call to Action --> */}

      <CallToAction />

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

export default index;

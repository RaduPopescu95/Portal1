import Blogs from "../common/Blogs";
import GlobalHeroFilter from "../common/GlobalHeroFilter";
import MobileMenu from "../common/header/MobileMenu";
import FeaturedProperties from "./FeaturedProperties";
import FindProperties from "./FindProperties";
import Header from "./Header";
import HeroSlider from "./HeroSlider";
import LookingItem from "./LookingItem";
import Team from "./Team";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import PopupSignInUp from "../common/PopupSignInUp";
import PasiDeUrmat from "./PasiDeUrmat";
import Image from "next/image";
import Map from "../map/Map";
import Button from "../common/CommonButton";
import SectiuneIncredere from "../common/SectiuneIncredere";
// import CookieBanner from "../Cookies/CookieBanner";
import FeaturedItem from "../listing-style/slider-style/FeaturedItem";

const index = async ({ firme, articole, categorii }) => {
  // noStore();

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}

      {/* <!-- 4th Home Slider --> */}
      <section className="pt0 pb0">
        <div className="home-four">
          {/* <div className="container-fluid p0">
          <div className="main-banner-wrapper">
            <div className="arrow-style-2 banner-style-one">
              <HeroSlider />
            </div>
          </div>
        </div> */}
          {/* End .container-fluid */}

          <div className="container home_iconbox_container">
            <div className="row posr mb25">
              <div className="col-lg-12">
                <div className="home_content home4">
                  <div class="home-text w-100 w-md-75">
                    <h1 className="fz50 txt-color-primary text-center mb10 heading-pagina-principala">
                      Alege un specialist in amenajari gradini si spatii verzi!
                    </h1>
                    <p className="fz18 txt-color-third w-75 mx-auto mx-sm-auto text-center mb-2 heading-pagina-principala">
                      Doresti amenajarea unei gradini rezidentiale sau a unei
                      spatiu verde ce apartine companiei tale? Gaseste un
                      colaborator acum!
                    </p>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 w-100 mb-10">
                      <Button
                        style={{ minWidth: "calc(30% - 10px)" }}
                        navigare={"cauta"}
                      >
                        Cauta amenajari gradini{" "}
                        <span className="flaticon-right-arrow ml-10" />
                      </Button>
                      <Button
                        className="btnSecondary"
                        style={{ minWidth: "calc(30% - 10px)" }}
                        navigare={"inscrie-firma"}
                      >
                        Inscrie o firma{" "}
                        <span className="flaticon-right-arrow ml-10" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h2 className="fz18 txt-color-third w-75 mx-auto text-center mb20">
                  SERVICII OFERITE DE FIRMELE DE PE PORTAL
                </h2>
                <ul className="home4_iconbox mb0">
                  <LookingItem categorii={categorii} />
                </ul>
                <p className="fz18 txt-color-third w-75 mx-auto text-center mt10">
                  <span className="flaticon-upload mr10" />
                  Vezi mai multe specializări
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 2.	Pasi de urmat --> */}

      <section id="property-city" className="property-city pb30">
        <div className="container-fluid pasi_urmat px-10">
          <div className="row">
            <PasiDeUrmat />
          </div>
        </div>
      </section>

      {/* <!-- Our Hot Offier --> */}
      <section className="our-hot-offer parallax d-flex justify-content-center">
        <div className="container home-texts">
          <div className="row mt40">
            <div className="col-md-6 col-lg-8 order-2 order-md-1">
              <div className="our_hotoffer">
                <h2 className="fz30 txt-color-third">
                  {/* <span className="fz40 txt-color-primary">ÎMPREUNĂ,</span>{" "} */}
                  Alege acum firma care sa-ti amenajeze spatiul verde
                </h2>
                <p className="fz20 txt-color-third">
                  De-a lungul timpului, am muncit din greu pentru a imbunatati
                  toate aspectele serviciului portalului nostrum cu firme de
                  amenajari gradini si spatii verzi. Specialistii prezenti pe
                  platforma se pot ocupa de toate, proiectare, amenajare spatiu
                  verde cu rulori gazon, plante ornamentale, sisteme de irigatii
                  si iazuri si cascade, pana la tunsul precis al gazonului, la
                  plivitul meticulos, la tunderea gardurilor vii, la toaletarea
                  experta a copacilor. Rezerva acum o sesiune de consultanta
                  gratuita prin cateva clickuri! Fie ca iti doresti o
                  transformare completa a gradinii, fie ca ai nevoie de ajutor
                  cu indepartarea iederii si curatarea gradinii, aici vei gasi
                  firme gata sa te ajute. Intelegem importanta serviciilor de
                  intretinere a gradinii la un pret accesibil, fara a compromite
                  calitatea. De aceea la noi vei gasi firme care ofera preturi
                  competitive, fara a sacrifica calitatea, gata sa construiasca
                  un peisaj memorabil in gradina ta.
                </p>
                {/* <div className="fp_footer">
                  <ul className="">
                    <li>
                      <p className="fz20 txt-color-third">
                        <span className="flaticon-tick mr10"></span>
                        Ne dorim ca pacienții să găsească medicul perfect și să
                        facă o programare în cel mai ușor mod
                      </p>
                    </li>
                    <li>
                      <p className="fz20 txt-color-third">
                        <span className="flaticon-tick mr10"></span>
                        Cea mai bună îngrijire, la un click distanță!
                      </p>
                    </li>
                    <li>
                      <p className="fz20 txt-color-third">
                        <span className="flaticon-tick mr10"></span>
                        Oricând, oriunde în România
                      </p>
                    </li>
                  </ul>
                </div> */}
                <div className="d-flex flex-column flex-sm-row justify-content-start gap-3 w-100 mb-10">
                  <Button
                    className="w-lg-75 w-md-75 w-sm-75"
                    navigare={"cauta"}
                  >
                    Găsește o firmă în apropiere
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 order-1 order-md-2">
              <div className="our_hotoffer">
                <Image
                  src="/assets/alege-firma.svg"
                  alt="Alege o firma de amenajari gradini"
                  width={400}
                  height={400}
                  className="img-whp"
                />
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* <!-- Our Hot Offier --> */}
      <section className="our-hot-offer parallax d-flex justify-content-center">
        <div className="container home-texts">
          <div className="row">
            {/* End .col */}
            <div className="col-md-6 col-lg-4">
              <div className="our_hotoffer">
                <Image
                  src="/assets/programare.svg"
                  alt="Solicita o oferta pentru amenajare gradina"
                  width={400}
                  height={400}
                  className="img-whp"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-8">
              <div className="our_hotoffer">
                <h2 className="fz30 txt-color-third">
                  {/* <span className="fz40 txt-color-primary">ÎMPREUNĂ,</span>{" "} */}
                  Servicii oferite
                </h2>
                {/* <p className="fz20 txt-color-third">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p> */}

                <ul>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Gazon - indiferent daca ai nevoie de gazon natural sau
                      artificial, va fi exact cum ti l-ai imaginat
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Garduri – montaj si reparatii garduri din lemn, caramida,
                      metal sau alte material.
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Terase – construieste terasa ta din rasinoase, lemn masiv
                      sau compozit. Pe langa materialele dorite, vei primi si
                      idei de design.
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Plante ornamentale si copaci - vrei plante ornamentale,
                      copaci, gard viu in gradina ta? Nu-ti face griji, te
                      ajutam cu furnizori dedicati!
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Pavaje si piatra naturala - doresti o terasa sau o alee
                      noua? Toti peisagistii au experienta cu diverse tipuri de
                      pavele, alei din paitra naturala si modele de terase.
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Montare si reparatii de foisoare - montam foisoare din
                      magazin sau le construim de la zero. De asemenea, reparam
                      orice parte a foisorului tau.
                    </p>
                  </li>
                  <li>
                    <p className="fz20 txt-color-third">
                      <span className="flaticon-tick mr10"></span>
                      Montaj sisteme de irigatii – montaj si programare sisteme
                      de irigatii care iti vor mentine gradina verde si
                      sanatoasa
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Our Hot Offier --> */}
      <section className="our-hot-offer parallax d-flex justify-content-center pt0">
        <div className="container home-texts">
          <div className="row mt40">
            <div className="col-md-6 col-lg-8 order-2 order-md-1">
              <div className="our_hotoffer">
                <h2 className="fz30 txt-color-third">
                  Alege o firma de amenajari gradini in apropiere
                </h2>
                <p className="fz20 txt-color-third">
                  Specialistii de pe xdx va ofera servicii de amenajarea
                  gradini, parcuri si spatii verzi care includ: proiectare,
                  montaj rulouri gazon, sisteme de irigatii, amenajare alei cu
                  pietris sau piatra naturala, amenajare iazuri si fantani,
                  constructii lemn, iluminat decorativ pentru gradina, fantani
                  arteziene, plante ornamentale, plante decorative si flori de
                  exterior, intretinere gradini, amenajari gradini verticale.
                </p>
                <p className="fz20 txt-color-third">
                  Alege firma care iti va construe gradina de vis folosind harta
                  interactiva!
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 order-1 order-md-2">
              <div className="our_hotoffer d-none d-md-block">
                <Map />
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>

      {/* <!-- 5.	Icons de incredere --> */}
      <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Unde lucreaza specialistii de pe portal?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <SectiuneIncredere />
          </div>
        </div>
      </section>

      {/* ---- FIRME ----- */}
      <section className="our-listing bgc-primary pb60-991 md-mt0 categorii-container-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Firme</h2>
              </div>
            </div>
          </div>
          <div className="row pt0">
            <div className="col-md-12 col-lg-12">
              <div className="row">
                <FeaturedItem params={null} firme={firme} searchParams={null} />
              </div>
              {/* End .row */}

              {/* {!params && (
                <div className="row">
                  <div className="col-lg-12 mt20">
                    <div className="mbp_pagination">
                      <Pagination />
                    </div>
                  </div>
                </div>
              )} */}

              {/* End .row */}
            </div>
            {/* End  .col */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Blog --> */}
      {/* <section className="our-blog bgc-f7 pb30 pt0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Articole</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Blogs articole={articole} />
          </div>
        </div>
      </section> */}
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
      {/* <CookieBanner /> */}
    </>
  );
};

export default index;

import Button from "./CommonButton";
import Image from "next/image";

const CallToAction = ({ className }) => {
  return (
    <section
      className={`start-partners cta-container-section-list ${className}`}
    >
      <div className="cta-container-list p-sm-30 p10 w-sm-75">
        <div className="row w-100">
          <div className="col-lg-6 col-sm-12 text-center text-lg-start">
            <div className="start_partner tac-smd ">
              <h2>Vrei sa îți promovezi serviciile?</h2>
              <p className="fz18">
                Contactează-ne și îți putem oferi o soluție personalizată pentru
                afacerea ta!
              </p>
              <p className="fz20 fw-bold">Contactează-ne!</p>
            </div>

            <div class="d-flex w-100 flex-column align-items-center align-items-lg-start">
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-start gap-3 w-100">
                <Button
                  style={{ minWidth: "calc(40% - 10px)" }}
                  navigare={"cauta"}
                >
                  Caută firmă
                </Button>
                <Button
                  className="btnSecondary"
                  style={{ minWidth: "calc(40% - 10px)" }}
                  navigare={"inscrie-firma"}
                >
                  Înscrie firmă
                </Button>
              </div>
            </div>
          </div>

          {/* End .col */}

          <div className="col-lg-6 d-flex justify-content-start align-items-center">
            <div>
              <Image
                src="/assets/images/callcustomers.svg"
                alt="Tooth Icon"
                width={400} // Poti regla dimensiunea dacă este necesar
                height={400}
                objectFit="cover"
                className="position-absolute image-cta d-none d-lg-block"
                layout="intrinsic" // Această proprietate asigură că dimensiunile specificate sunt respectate
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

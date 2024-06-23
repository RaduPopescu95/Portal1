"use client";

import { useEffect, useState } from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import {
  handleGetFirestore,
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
  handleUpdateFirestore,
  handleUpdateFirestoreSubcollection,
  handleUploadFirestore,
  handleUploadFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

const Index = () => {
  const [formValues, setFormValues] = useState({
    siteName: "",
    judet: "",
  });

  // Adăugarea unui nou state pentru mesajul de succes
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState([]);
  const [documentId, setDocumentId] = useState(null);

  const params = useParams();
  const router = useRouter();

  const id = params.id;

  let isEdit = id && id.length > 0 ? true : false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChangeFirst = (content) => {
    let cont = DOMPurify.sanitize(content);
    setFormValues((prevState) => ({
      ...prevState,
      articleContentFirst: cont,
    }));
  };

  const handleContentChangeSecond = (content) => {
    let cont = DOMPurify.sanitize(content);
    setFormValues((prevState) => ({
      ...prevState,
      articleContentSecond: cont,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting form with values:", formValues);
    try {
      const judetDocArr = await handleQueryFirestore(
        "Judete",
        "siteName",
        formValues.judet
      );
      let judetDoc = judetDocArr[0];

      console.log("judet..doc...", judetDoc.documentId);

      if (isEdit) {
        console.log("is edit...", formValues);
        console.log("is edit...", documentId);
        console.log("is edit...", judetDoc);
        await handleUpdateFirestoreSubcollection(
          formValues,
          `Judete/${judetDoc.documentId}/Localitati/${documentId}`
        );
      } else {
        console.log("else..");
        await handleUploadFirestoreSubcollection(
          formValues,
          `Judete/${judetDoc.documentId}/Localitati`,
          judetDoc.documentId,
          "Localitati"
        );
      }

      // Setarea mesajului de succes după finalizarea cu succes
      setSuccessMessage("Scriere realizată cu succes!");
      // Curățarea mesajului după 3 secunde
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      // Resetarea formularului
      setFormValues({
        siteName: "",
        judet: "",
      });
    } catch (error) {
      console.error("Eroare la încărcare submit:", error);
      // Setarea mesajului de eroare, care va fi afișat în același loc cu mesajul de succes
      setSuccessMessage("Eroare la încărcare: " + error.message);
      // Opțional, poți decide să nu cureți mesajul de eroare automat după 3 secunde
      // Dacă dorești să cureți mesajul de eroare automat, poți adăuga:
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormValues({
      siteName: "",
    });
  };

  const handleGetData = async () => {
    let data = await handleGetFirestore("Judete");
    console.log("Data....", data);
    setData([...data]);
  };

  const handleQuery = async () => {
    try {
      const c = await handleQueryFirestoreSubcollection(
        "Localitati",
        "documentId",
        id
      );

      console.log("course...found..", c);

      // Presupunând că `c` este un obiect care conține datele necesare,
      // actualizează state-ul `formValues` cu aceste date.
      // Asigură-te că structura obiectului `c` corespunde cu cea a `formValues`.
      if (c[0]) {
        setFormValues((prevState) => ({
          ...prevState,
          // Aici exemplific cu câteva câmpuri, ajustează conform structurii obiectului `c[0]`.
          siteName: c[0].siteName || prevState.siteName,
          judet: c[0].judet || prevState.judet,
        }));

        setDocumentId(c[0].documentId);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    handleGetData();
    if (id) {
      console.log("id....", id);
      if (id.length > 0) {
        handleQuery();
      }
    }
  }, []);

  return (
    <>
      <MobileMenu />
      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <BreadCrumb
                      title="Dashboard"
                      subTitle="Adauga Localitati"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Setari principale</h3>
                      </div>

                      <CreateList
                        handleInputChange={handleInputChange}
                        formValues={formValues}
                        judete={data}
                      />
                    </div>
                  </div>

                  <div className="col-xl-12 mt-3">
                    <div className="my_profile_setting_input">
                      <button
                        className="btn btn1 float-start"
                        onClick={handleReset}
                      >
                        Resetare
                      </button>
                      {isEdit ? (
                        <button
                          className="btn btn2 float-end"
                          onClick={handleSubmit}
                        >
                          Actualizeaza
                        </button>
                      ) : (
                        <button
                          className="btn btn2 float-end"
                          onClick={handleSubmit}
                        >
                          Adaugare
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;

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
  handleUploadFirestore,
} from "@/utils/firestoreUtils";
import LogoUpload from "./LogoUpload";
import DateContact from "./DateContact";
import GalerieFotoSection from "./GalerieFotoSection";
import selectedFiles from "@/utils/selectedFiles";
import { useParams, useRouter } from "next/navigation";
import CommonLoader from "@/components/common/CommonLoader";
import { uploadImage, uploadMultipleImages } from "@/utils/storageUtils";
import { validateMetaFields } from "@/utils/seoValidation";
import { slugify, slugifyFirma } from "@/utils/slugify";

const Index = () => {
  // Adăugarea unui nou state pentru mesajul de succes
  const [successMessage, setSuccessMessage] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [categorii, setCategorii] = useState([]);
  const [judete, setJudete] = useState([]);
  const [localitati, setLocalitati] = useState([]);
  const [deletedLogo, setDeletedLogo] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [oldImageFileName, setOldImageFileName] = useState(null);
  const [oldLogoFileName, setOldLogoFileName] = useState(null);
  const [isNewLogo, setIsNewLogo] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [logoImg, setLogoImg] = useState([]);
  const [imaginiData, setImaginiData] = useState({});
  const [imgAlts, setImgAlts] = useState({});

  const altKeyFor = (item) => {
    if (!item) return "";
    if (item instanceof File) return item.name;
    return item.fileName || item.finalUri || "";
  };

  const handleAltChange = (key, value) => {
    setImgAlts((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegenerateSlug = () => {
    const next = slugifyFirma(formValues);
    setFormValues((prev) => ({ ...prev, slug: next }));
  };

  const [formValues, setFormValues] = useState({
    siteName: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    articleContentFirst: "",
    articleContentSecond: "",
    stare: "",
    categorie: "",
    judet: "",
    localitate: "",
    telefonUnu: "",
    telefonDoi: "",
    emailUnu: "",
    emailDoi: "",
    websiteUnu: "",
    websiteDoi: "",
    facebook: "",
    googlePlus: "",
    facebookPageId: "",
    codPostal: "",
    adresa: "",
    harta: "",
    idGalerieFoto: "",
    cuvinteCheieImaginiGalerie: "",
    coordonate: {},
  });

  const params = useParams();
  const router = useRouter();

  const id = params.id;

  let isEdit = id && id.length > 0 ? true : false;

  // multiple image select
  const multipleImage = (e) => {
    const newFiles = selectedFiles(e) || [];
    const isExist = propertySelectedImgs?.some((file1) =>
      newFiles?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      const baseAlt = [
        formValues.siteName,
        formValues.categorie,
        formValues.localitate,
      ]
        .filter(Boolean)
        .join(" - ");
      setImgAlts((prev) => {
        const next = { ...prev };
        const startIdx = propertySelectedImgs?.length || 0;
        newFiles.forEach((file, i) => {
          if (!next[file.name]) {
            next[file.name] = baseAlt
              ? `${baseAlt} (${startIdx + i + 1})`
              : "";
          }
        });
        return next;
      });
      setPropertySelectedImgs((old) => [...old, ...newFiles]);
      setIsNewImage(true);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete logo
  const deleteLogo = (name) => {
    if (isEdit) {
      setLogoImg([]); // Clear the selection when deleting
      setDeletedLogo(logoImg[0].fileName);
    } else {
      setLogoImg([]); // Clear the selection when deleting
    }
  };

  // delete image
  const deleteImage = (item) => {
    console.log("itemmm....", item);
    console.log(item);
    // Filtrăm imaginile rămase
    const deleted = propertySelectedImgs?.filter((file) =>
      file instanceof File ? file.name !== item.name : file !== item
    );

    // Setăm imaginile rămase
    setPropertySelectedImgs(deleted);

    // Verificăm dacă elementul șters nu este o instanță a clasei File și, în caz afirmativ, îl adăugăm la setDeletedImages
    const isDeletedNotFile = propertySelectedImgs?.find(
      (file) =>
        (file instanceof File ? file.name === item.name : file === item) &&
        !(item instanceof File)
    );

    if (isDeletedNotFile) {
      setDeletedImages((prevDeletedImages) => [...prevDeletedImages, item]);
    }
  };

  const handleLocationSelect = (lat, lng, adresa, urlMaps) => {
    console.log(`Selected location - Lat: ${lat}, Lng: ${lng}`);
    setFormValues((prevState) => ({
      ...prevState,
      adresa: adresa,
      harta: urlMaps,
      coordonate: { lat, lng },
    }));
    console.log(
      `Adresa setata: ${adresa}, Link harta: ${urlMaps}, Coordonate: Lat: ${lat}, Lng: ${lng}`
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormValues((prevState) => ({
      ...prevState,
      [name]: name === "slug" ? slugify(value) : value,
    }));
    console.log(formValues);
  };
  const handleImageDataChange = async (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "idGalerieFoto") {
      setIsLoadingImages(true);
      console.log("is galerie foto id field...");
      let imagini = await handleQueryFirestoreSubcollection(
        "Imagini",
        "idGalerieFoto",
        value
      );
      setIsLoadingImages(false);
      console.log("is galerie foto id field...", imagini);
      if (imagini.length > 0) {
        setImaginiData(imagini[0]);
        const loadedImgs = imagini[0].imagini?.imgs || [];
        setPropertySelectedImgs([...loadedImgs]);
        setImgAlts((prev) => {
          const next = { ...prev };
          loadedImgs.forEach((img) => {
            const key = img.fileName || img.finalUri;
            if (key && next[key] === undefined) next[key] = img.alt || "";
          });
          return next;
        });
      } else {
        setImaginiData((prevState) => ({
          [name]: value,
        }));
        setPropertySelectedImgs([]);
      }
    } else {
      setImaginiData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log(imaginiData);
  };

  const handleJudetChange = async (e) => {
    const { name, value } = e.target;
    console.log("name...", name);
    console.log("value...", value);
    const loc = await handleQueryFirestoreSubcollection(
      "Localitati",
      "judet",
      value
    );
    setLocalitati(loc);
    console.log("loc...", loc);
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formValues);
  };
  const handleContentChangeFirst = (content) => {
    setFormValues((prevState) => ({
      ...prevState,
      articleContentFirst: content,
    }));
  };

  const handleContentChangeSecond = (content) => {
    setFormValues((prevState) => ({
      ...prevState,
      articleContentSecond: content,
    }));
  };

  const handleSubmit = async () => {
    formValues.localitateQuery = formValues.localitate.toLowerCase();
    formValues.judetQuery = formValues.judet.toLowerCase();
    formValues.categorieQuery = formValues.categorie.toLowerCase();

    setIsLoading(true);
    console.log("Submitting form with values:", formValues);

    const metaErrors = validateMetaFields({
      metaTitle: formValues.metaTitle,
      metaDescription: formValues.metaDescription,
    });
    if (metaErrors.length) {
      setSuccessMessage(metaErrors.join(" / "));
      setIsLoading(false);
      return;
    }

    let finalSlug = slugify(formValues.slug || "");
    if (!finalSlug) {
      finalSlug = slugifyFirma(formValues);
    }
    if (!finalSlug) {
      setSuccessMessage(
        "Slug invalid. Completeaza Nume si Localitate inainte de salvare."
      );
      setIsLoading(false);
      return;
    }
    try {
      const existing = await handleQueryFirestore(
        "Firme",
        "slug",
        finalSlug
      );
      const conflict = (existing || []).find(
        (f) => f.documentId !== documentId
      );
      if (conflict) {
        setSuccessMessage(
          `Slug "${finalSlug}" exista deja. Te rog alege alt slug.`
        );
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Slug uniqueness check failed, continuing", err);
    }
    formValues.slug = finalSlug;

    if (propertySelectedImgs.length === 0 && !formValues.idGalerieFoto) {
      console.log("No image length...");
      setSuccessMessage("Nu sunt adaugate imagini");
      setIsLoading(false);
      return;
    }
    if (logoImg.length === 0) {
      console.log("No logo length...");
      setSuccessMessage("Nu este logo adaugat");
      setIsLoading(false);
      return;
    }

    try {
      if (isEdit) {
        const logo = await uploadImage(
          logoImg,
          isEdit,
          "LogoFirme",
          deletedLogo
        );

        formValues.logo = logo;
        let imagini;
        if (propertySelectedImgs.length !== 0) {
          imagini = await uploadMultipleImages(
            propertySelectedImgs,
            isEdit,
            "ImaginiFirme",
            deletedImages,
            imgAlts
          );
        }
        console.log("formValues....", formValues);
        formValues.idGalerieFoto = imaginiData.idGalerieFoto;
        await handleUpdateFirestore(`Firme/${documentId}`, formValues);

        const imageData = {
          idGalerieFoto: formValues.idGalerieFoto,
          cuvinteCheieImaginiGalerie: formValues.cuvinteCheieImaginiGalerie,
          imagini: imagini,
        };

        await handleUpdateFirestore(
          `Imagini/${imaginiData.documentId}`,
          imageData
        );

        setIsLoading(false);
      } else {
        const logo = await uploadImage(logoImg, false, "LogoFirme");

        formValues.logo = logo;
        let imagini;
        if (propertySelectedImgs.length !== 0 && !imaginiData?.imagini?.imgs) {
          imagini = await uploadMultipleImages(
            propertySelectedImgs,
            false,
            "ImaginiFirme",
            deletedImages,
            imgAlts
          );
        } else {
          const imgs = [];
          imagini = { imgs };
        }
        formValues.idGalerieFoto = imaginiData.idGalerieFoto;
        await handleUploadFirestore(formValues, "Firme");

        // Așteaptă finalizarea încărcării pentru "Imagini" și apoi dezactivează indicatorul de încărcare
        if (!imaginiData?.imagini?.imgs) {
          const imageData = {
            idGalerieFoto: imaginiData.idGalerieFoto,
            cuvinteCheieImaginiGalerie: imaginiData.cuvinteCheieImaginiGalerie,
            imagini: imagini,
          };
          await handleUploadFirestore(imageData, "Imagini");
        }

        setIsLoading(false);
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
        slug: "",
        metaTitle: "",
        metaDescription: "",
        articleContentFirst: "",
        articleContentSecond: "",
        stare: "",
        categorie: "",
        judet: "",
        localitate: "",
        telefonUnu: "",
        telefonDoi: "",
        emailUnu: "",
        emailDoi: "",
        websiteUnu: "",
        websiteDoi: "",
        facebook: "",
        googlePlus: "",
        facebookPageId: "",
        codPostal: "",
        adresa: "",
        harta: "",
        idGalerieFoto: "",
        cuvinteCheieImaginiGalerie: "",
      });
    } catch (error) {
      setIsLoading(false);
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
      slug: "",
      metaTitle: "",
      metaDescription: "",
      articleContentFirst: "",
      articleContentSecond: "",
      stare: "",
      categorie: "",
      judet: "",
      localitate: "",
      telefonUnu: "",
      telefonDoi: "",
      emailUnu: "",
      emailDoi: "",
      websiteUnu: "",
      websiteDoi: "",
      facebook: "",
      googlePlus: "",
      facebookPageId: "",
      codPostal: "",
      adresa: "",
      harta: "",
      idGalerieFoto: "",
      cuvinteCheieImaginiGalerie: "",
    });
  };

  const handleQuery = async () => {
    const numericId = parseInt(id, 10); // Convertește `id` din string în număr întreg.
    console.log("id....", typeof numericId);

    try {
      const c = await handleQueryFirestore("Firme", "id", numericId);
      const imagini = await handleQueryFirestore(
        "Imagini",
        "idGalerieFoto",
        c[0].idGalerieFoto
      );
      console.log("course...found..", c);
      console.log("imagini...found..", imagini);
      setImaginiData(imagini[0]);
      const loadedImgs = imagini[0]?.imagini?.imgs || [];
      setPropertySelectedImgs(loadedImgs);
      setImgAlts((prev) => {
        const next = { ...prev };
        loadedImgs.forEach((img) => {
          const key = img.fileName || img.finalUri;
          if (key && next[key] === undefined) next[key] = img.alt || "";
        });
        return next;
      });
      // Presupunând că `c` este un obiect care conține datele necesare,
      // actualizează state-ul `formValues` cu aceste date.
      // Asigură-te că structura obiectului `c` corespunde cu cea a `formValues`.
      if (c[0]) {
        setFormValues((prevState) => ({
          ...prevState,
          siteName: c[0].siteName || prevState.siteName,
          slug: c[0].slug || prevState.slug,
          metaTitle: c[0].metaTitle || prevState.metaTitle,
          metaDescription: c[0].metaDescription || prevState.metaDescription,
          articleContentFirst:
            c[0].articleContentFirst || prevState.articleContentFirst,
          articleContentSecond:
            c[0].articleContentSecond || prevState.articleContentSecond,
          stare: c[0].stare || prevState.stare,
          categorie: c[0].categorie || prevState.categorie,
          judet: c[0].judet || prevState.judet,
          localitate: c[0].localitate || prevState.localitate,
          telefonUnu: c[0].telefonUnu || prevState.telefonUnu,
          telefonDoi: c[0].telefonDoi || prevState.telefonDoi,
          emailUnu: c[0].emailUnu || prevState.emailUnu,
          emailDoi: c[0].emailDoi || prevState.emailDoi,
          websiteUnu: c[0].websiteUnu || prevState.websiteUnu,
          websiteDoi: c[0].websiteDoi || prevState.websiteDoi,
          facebook: c[0].facebook || prevState.facebook,
          googlePlus: c[0].googlePlus || prevState.googlePlus,
          facebookPageId: c[0].facebookPageId || prevState.facebookPageId,
          codPostal: c[0].codPostal || prevState.codPostal,
          adresa: c[0].adresa || prevState.adresa,
          harta: c[0].harta || prevState.harta,
          idGalerieFoto: c[0].idGalerieFoto || prevState.idGalerieFoto,
          cuvinteCheieImaginiGalerie:
            c[0].cuvinteCheieImaginiGalerie ||
            prevState.cuvinteCheieImaginiGalerie,
        }));

        setDocumentId(c[0].documentId);

        setLogoImg([c[0].logo || c[0].logo]);

        const loc = await handleQueryFirestoreSubcollection(
          "Localitati",
          "judet",
          c[0].judet
        );
        console.log("aici...", loc);
        setLocalitati(loc);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleGetAdiacentData = async () => {
    let categorii = await handleGetFirestore("Categorii");
    console.log("categorii....", categorii);
    setCategorii([...categorii]);
    let judete = await handleGetFirestore("Judete");
    console.log("judete....", judete);
    setJudete([...judete]);
  };

  useEffect(() => {
    handleGetAdiacentData();
    console.log("test......", propertySelectedImgs);
    if (id) {
      if (id.length > 0) {
        handleQuery();
      }
    }
  }, []);

  // Handle single image selection
  const singleImage = (e) => {
    const file = e.target.files[0]; // Get the selected file
    console.log("test..here...", file.name);
    if (file) {
      // Check if the file is already selected
      const isExist = logoImg.some(
        (existingFile) => existingFile.name === file.name
      );

      if (!isExist) {
        setLogoImg([file]); // Replace the current file
        setIsNewLogo(true);
      } else {
        alert("This image is already selected!");
      }
    }
  };

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
                    <BreadCrumb title="Dashboard" subTitle="Adauga Firme" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Setari Media</h3>
                      </div>

                      <LogoUpload
                        singleImage={singleImage}
                        deleteLogo={deleteLogo}
                        logoImg={logoImg}
                        isEdit={isEdit}
                        isNewImage={isNewLogo}
                      />
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Setari principale</h3>
                      </div>

                      <CreateList
                        handleInputChange={handleInputChange}
                        handleJudetChange={handleJudetChange}
                        formValues={formValues}
                        categorii={categorii}
                        judete={judete}
                        localitati={localitati}
                        imaginiData={imaginiData}
                        onRegenerateSlug={handleRegenerateSlug}
                      />
                    </div>
                  </div>

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Setari Date de Contact</h3>
                      </div>

                      <DateContact
                        handleInputChange={handleInputChange}
                        formValues={formValues}
                        handleLocationSelect={handleLocationSelect}
                      />
                    </div>
                  </div>

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Galerie foto</h3>
                      </div>

                      <GalerieFotoSection
                        handleInputChange={handleImageDataChange}
                        deleteImage={deleteImage}
                        multipleImage={multipleImage}
                        propertySelectedImgs={propertySelectedImgs}
                        isEdit={isEdit}
                        isNewImage={isNewImage}
                        imaginiData={imaginiData}
                        isLoadingImages={isLoadingImages}
                        imgAlts={imgAlts}
                        onAltChange={handleAltChange}
                        altKeyFor={altKeyFor}
                      />
                    </div>
                  </div>

                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Setari Continut</h3>
                    </div>
                    <PropertyMediaUploader
                      handleContentChangeFirst={handleContentChangeFirst}
                      contentFirst={formValues.articleContentFirst}
                      handleContentChangeSecond={handleContentChangeSecond}
                      contentSecond={formValues.articleContentSecond}
                      successMessage={successMessage}
                    />
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
                          {isLoading ? "Se încarcă..." : "Actualizeaza"}
                        </button>
                      ) : (
                        <button
                          className="btn btn2 float-end"
                          onClick={handleSubmit}
                        >
                          {isLoading ? "Se încarcă..." : "Adaugare"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <CommonLoader />}
      </section>
    </>
  );
};

export default Index;

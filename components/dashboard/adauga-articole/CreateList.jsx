import { useState } from "react";
import ArticleEditor from "./QuillForm";
import Image from "next/image";
import {
  META_TITLE_MIN,
  META_TITLE_MAX,
  META_DESCRIPTION_MIN,
  META_DESCRIPTION_MAX,
  getCounterClass,
} from "@/utils/seoValidation";

const CreateList = ({
  handleInputChange,
  formValues,
  singleImage,
  deleteImage,
  propertySelectedImgs,
  isEdit,
  isNewImage,
}) => {
  const metaTitleLen = (formValues.metaTitle || "").length;
  const metaDescLen = (formValues.metaDescription || "").length;

  return (
    <>
      <div className="col-lg-12">
        <ul className="mb-0">
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    {isEdit && !isNewImage ? (
                      <Image
                        width={200}
                        height={200}
                        className="img-fluid cover"
                        src={item.finalUri}
                        alt="fp1.jpg"
                      />
                    ) : (
                      <Image
                        width={200}
                        height={200}
                        className="img-fluid cover"
                        src={URL.createObjectURL(item)}
                        alt="fp1.jpg"
                      />
                    )}
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.name)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}

          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      {propertySelectedImgs.length === 0 && (
        <div className="col-lg-12">
          <div className="portfolio_upload">
            <input
              type="file"
              onChange={singleImage}
              multiple
              accept="image/png, image/gif, image/jpeg"
            />
            <div className="icon">
              <span className="flaticon-download"></span>
            </div>
            <p>Drag and Drop Image</p>
          </div>
        </div>
      )}

      {/* End .col */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="siteName">Nume</label>
          <input
            type="text"
            className="form-control"
            id="siteName"
            name="siteName"
            value={formValues.siteName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="metaTitle">
            Meta Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="metaTitle"
            name="metaTitle"
            value={formValues.metaTitle}
            onChange={handleInputChange}
            required
            minLength={META_TITLE_MIN}
            maxLength={META_TITLE_MAX}
          />
          <small
            className={getCounterClass(
              metaTitleLen,
              META_TITLE_MIN,
              META_TITLE_MAX
            )}
          >
            {metaTitleLen}/{META_TITLE_MIN}-{META_TITLE_MAX} caractere
          </small>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="metaDescription">
            Meta Description <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            id="metaDescription"
            name="metaDescription"
            rows="7"
            value={formValues.metaDescription}
            onChange={handleInputChange}
            required
            minLength={META_DESCRIPTION_MIN}
            maxLength={META_DESCRIPTION_MAX}
          ></textarea>
          <small
            className={getCounterClass(
              metaDescLen,
              META_DESCRIPTION_MIN,
              META_DESCRIPTION_MAX
            )}
          >
            {metaDescLen}/{META_DESCRIPTION_MIN}-{META_DESCRIPTION_MAX}{" "}
            caractere
          </small>
        </div>
      </div>
    </>
  );
};

export default CreateList;

import GlobalFilter from "./GlobalFilter";
import ListSearchInputs from "./ListSearchInputs";

const ListSearch = ({ className = "", judete, categorii, localitati = [] }) => {
  return (
    <div className={`home_adv_srch_opt ${className}`}>
      {/* End nav-pills */}

      <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <ListSearchInputs
            judete={judete}
            categorii={categorii}
            localitati={localitati}
          />
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <GlobalFilter />
        </div>
      </div>
    </div>
  );
};

export default ListSearch;

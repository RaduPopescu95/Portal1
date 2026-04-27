import Image from "next/image";

const Creaator = () => {
  return (
    <div className="media d-flex">
      <Image
        width={90}
        height={90}
        className="me-3"
        src="/assets/images/team/lc1.png"
        alt="lc1.png"
      />
      <div className="media-body">
        <h5 className="mt-0 mb0">Samul Williams</h5>
        <p className="mb0">(123)456-7890</p>
        <p className="mb0">info@email.com</p>
        <span className="text-thm">
          View My Listing
        </span>
      </div>
    </div>
  );
};

export default Creaator;

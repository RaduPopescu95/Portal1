"use client";

import { useRouter } from "next/navigation";

const Button = ({ children, onClick, className = "", ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    if (props.navigare) {
      if (props.navigare.startsWith("mailto:")) {
        window.location.href = props.navigare;
      } else {
        router.push(props.navigare);
      }
    } else {
      onClick();
    }
  };
  return (
    <button
      type="submit"
      className={`btn btnGeneral ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

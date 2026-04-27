"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();

  const home = [
    {
      id: 1,
      name: "Despre platforma",
      routerPath: "/about-us",
    },
    {
      id: 2,
      name: "Politica de confidentialitate",
      routerPath: "/terms",
    },
  ];

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="dropitem">
        <Link
          href="/"
          className={
            home.some(
              (page) =>
                page.routerPath?.split("/")[1] === pathname?.split("/")[1]
            )
              ? "ui-active"
              : undefined
          }
        >
          <span className="title">Acasă</span>
        </Link>
        {/* <!-- Level Two--> */}
      </li>
      {/* End .dropitem */}

      <li className="last">
        <Link
          href="/cauta"
          className={pathname === "/cauta" ? "ui-active" : undefined}
        >
          Cauta firma
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="last">
        <Link
          href="/amenajari-gradini"
          className={
            pathname === "/amenajari-gradini" ? "ui-active" : undefined
          }
        >
          Firme amenajari spatii verzi
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="last">
        <Link
          href="/contact"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          Contact
        </Link>
      </li>
      {/* End .dropitem */}

      <li className={`list-inline-item add_listing ${float}`}>
        <Link href="/inscrie-firma">
          <span className="flaticon-plus"></span>
          Adauga firma
        </Link>
      </li>
      {/* End .dropitem */}
    </ul>
  );
};

export default HeaderMenuContent;

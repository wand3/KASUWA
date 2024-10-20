import Nav from "./Nav";
import Footer from "./Footer";
import React, { FC } from "react";
import AddProduct from "./AddProduct";

type BodyProps = {
  nav: boolean;
  children?: React.ReactNode;
};

const Jiki: FC<BodyProps> = ({ nav, children }) => {
  return (
    <>
      {nav && <Nav />}
      {children}
      <div>Jiki</div>
      {/* <KasuwaItems />
            <NavButtom /> */}
      <AddProduct />
      <Footer />
    </>
  );
};

export default Jiki;

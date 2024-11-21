import Nav from "./Nav";
import Footer from "./Footer";
import React, { FC } from "react";
// import AddProduct from "./AddProduct";
import FlashMessage from "./FlashMessage";

type BodyProps = {
  nav: boolean;
  children?: React.ReactNode;
};

const Jiki: FC<BodyProps> = ({ nav, children }) => {
  return (
    <>
      <div className="bg-[#eeeeeb] h-full ">
        {nav && <Nav />}
        {children}
        <FlashMessage />
        {/* <KasuwaItems />
              <NavButtom /> */}
        {/* <AddProduct /> */}
        <Footer />
      </div>
      
    </>
)};

export default Jiki;

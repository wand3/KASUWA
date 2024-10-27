import Nav from "./Nav";
import Footer from "./Footer";
import React, { FC } from "react";

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
      <Footer />
    </>
  );
};

export default Jiki;

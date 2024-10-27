import Jiki from "../components/Jiki";
import NavButtom from "../components/NavButtom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";

const Kasuwa = () => {
  return (
    <>
      <ProductsProvider>
        <Jiki nav>
          <KasuwaItems />
          <NavButtom />
        </Jiki>
      </ProductsProvider>
    </>
  );
};

export default Kasuwa;

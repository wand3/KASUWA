import Jiki from "../components/Jiki";
<<<<<<< HEAD
import NavButtom from "../components/NavButtom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductsProvider";

||||||| parent of 7801ba3 (test)
import NavButtom from "../components/navButtom";

=======
import NavButtom from "../components/NavButtom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
>>>>>>> 7801ba3 (test)

const Kasuwa = () => {
  return (
    <>
      <ProductsProvider>
        <Jiki nav>
          <KasuwaItems />
          <NavButtom />
          <LoginPage />
          <p>lol</p>
          <RegisterPage />
        </Jiki>
      </ProductsProvider>
    </>
  );
};

<<<<<<< HEAD
    return (
        <> 
            <ProductsProvider>
                <Jiki nav>
                    <KasuwaItems />
                    <NavButtom />

                </Jiki>
            </ProductsProvider>          
        </>
    )
}

export default Kasuwa;
||||||| parent of 7801ba3 (test)
    return (
        <> 
            <Jiki nav>
                <NavButtom />

            </Jiki>          
        </>
    )
}

export default Kasuwa;
=======
export default Kasuwa;
>>>>>>> 7801ba3 (test)

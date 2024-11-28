import Jiki from "../components/Jiki";
import NavButtom from "../components/NavMobileTop";
import NavButtomMobile from "../components/NavMobileBottom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";
import useProducts from "../hooks/UseProducts";
import UseApi from "../hooks/UseApi";
import { FilterProvider } from '../context/FilterContext';
import MainContent from "../components/MainContent";

import AllCategories from "../components/Product/CategoriesSelect";

const Kasuwa = () => {

    
    return (
        <> 
            <ProductsProvider>
              <FilterProvider>
                <Jiki nav>
                    
                    <NavButtom />
                    <MainContent />
                    {/* <AllCategories /> */}

                    
                    {/* <h1>Welcl {user?.user?.email} Role: {user?.user?.role}</h1> */}
                    {/* <CategoriesSelect /> */}
                    {/* <ProductCategory /> */}

                    {/* <KasuwaItems /> */}
                    


                    <NavButtomMobile />

                </Jiki>
              </FilterProvider>
            </ProductsProvider>          
        </>
    )
}

export default Kasuwa;
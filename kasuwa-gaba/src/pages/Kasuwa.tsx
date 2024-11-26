import Jiki from "../components/Jiki";
import NavButtom from "../components/NavMobileTop";
import NavButtomMobile from "../components/NavMobileBottom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";
import useUser from "../hooks/UseUser";


const Kasuwa = () => {
    // const user = useUser();

    return (
        <> 
            <ProductsProvider>
                <Jiki nav>                    
                    <NavButtom />

                    
                        {/* <h1>Welcl {user?.user?.email} Role: {user?.user?.role}</h1> */}

                    
                    <KasuwaItems />

                    <NavButtomMobile />

                </Jiki>
            </ProductsProvider>          
        </>
    )
}

export default Kasuwa;
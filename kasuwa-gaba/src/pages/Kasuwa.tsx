import Jiki from "../components/Jiki";
import NavButtom from "../components/NavButtom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";
import useUser from "../hooks/UseUser";


const Kasuwa = () => {
    const user = useUser();

    return (
        <> 
            <ProductsProvider>
                <Jiki nav>
                    {
                        <h1>Welcl {user?.user?.email} Role: {user?.user?.role}</h1>

                    }
                    <KasuwaItems />
                    <NavButtom />

                </Jiki>
            </ProductsProvider>          
        </>
    )
}

export default Kasuwa;
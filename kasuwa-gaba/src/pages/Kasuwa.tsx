import Jiki from "../components/Jiki";
import NavButtom from "../components/NavButtom";
import KasuwaItems from "../components/KasuwaItems";
import { ProductsProvider } from "../context/ProductProvider";
import useUser from "../hooks/UseUser";


const Kasuwa = () => {
    const { user } = useUser();
// if (user) {
//                         <h1>Welcome {user?.email}</h1>
//                     }
    return (
        <> 
            <ProductsProvider>
                <Jiki nav>
                    <h1>Welcome {user?.email}</h1>
                    <KasuwaItems />
                    <NavButtom />

                </Jiki>
            </ProductsProvider>          
        </>
    )
}

export default Kasuwa;
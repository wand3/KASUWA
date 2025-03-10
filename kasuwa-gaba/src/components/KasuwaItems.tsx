import useProducts from "../hooks/UseProducts";
// import { ProductType } from "../context/ProductsProvider";
import { ReactElement } from "react";
import Product from "./KasuwaItem";
import { ProductType } from "../context/ProductProvider";
import { ProductPagType } from "./MainContent";



export const KasuwaItems = (products: ProductPagType) => {
//   const {products} = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products.products?.length) {
      pageContent = products.products.map(product => {

          return (
              <Product
                  key={product.id}
                  product={product}
              />
          )
      })
    }

    const content = (
        <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

         {/* <main className="grid grid-cols-2 md:h-[80vh] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 pt-10 px-3"> */}
            {pageContent}
        </main>
    )

    return content


}

export default KasuwaItems



    // <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      
    //   <a href="#" class="group">
    //     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
    //       <img src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." class="h-full w-full object-cover object-center group-hover:opacity-75">
    //     </div>
    //     <h3 class="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
    //     <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
    //   </a>
    //   <a href="#" class="group">
    //     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
    //       <img src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg" alt="Person using a pen to cross a task off a productivity paper card." class="h-full w-full object-cover object-center group-hover:opacity-75">
    //     </div>
    //     <h3 class="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
    //     <p class="mt-1 text-lg font-medium text-gray-900">$89</p>
    //   </a>
    //   <a href="#" class="group">
    //     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
    //       <img src="https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." class="h-full w-full object-cover object-center group-hover:opacity-75">
    //     </div>
    //     <h3 class="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</h3>
    //     <p class="mt-1 text-lg font-medium text-gray-900">$35</p>
    //   </a>

    //   <!-- More products... -->
    // </div>
import { useEffect, useState } from "react";
import UseApi from "../hooks/UseApi";
import { useFilter } from "../context/FilterContext";
import KasuwaItems from "./KasuwaItems";

import { Filter} from "lucide-react";
import NavButtomMobile from "./NavMobileBottom";
import { FilterProvider } from "../context/FilterContext";
import { ProductType } from "../context/ProductProvider";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


export type ProductPagType = {
  products: ProductType[],
  total: number;
  limit: number;
  skip: number;
}

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 8;

  const api = UseApi();
  useEffect(() => {

    let url = `/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `/search?query=${keyword}`;
    }

    console.log("api.getpag");

    if (!keyword) {
      try {
        const getProducts = async () => {
          const response = await api.get<ProductPagType>(`${url}`);
          console.log(response.body);
          const data = response.body;
          console.log(data)
          setProducts(data?.products as ProductType[]); // Type assertion
        }
        const p = getProducts();
        console.log(p)
      } catch (error) {
        console.error("Error fetching data: ", error); // Handle error state
      }
    } else {
      try {
        const searchProducts = async () => {
          const response = await api.post(`${url}`,{ "query": keyword});
          const data = response.body;
          console.log(data)
          setProducts(data as ProductType[]); // Type assertion
        }
        const p = searchProducts();
        console.log(p)
      } catch (error) {
        console.error("Error fetching data: ", error); // Handle error state
      }
    
    }
        
  }, [currentPage, keyword]);


  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "High to low":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "Low to high":
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - (totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
  <>
    <Sidebar />
    <section className="absolute md:top-[17vh] md:h-[fit] bg-[#eeeeeb] right-0 md:max-w-[75%] sm:w-[100%] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full shadow-md flex items-center"
            >
              <Filter className="mr-2 text-slate-600" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 text-xs bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("Low to high")}
                  className="block px-4 py-2 shadow-sm w-full text-left hover:bg-gray-200"
                >
                  Lowest to highest
                </button>
                <button
                  onClick={() => setFilter("High to low")}
                  className="block px-4 py-2 w-full shadow-sm text-left hover:bg-gray-200"
                >
                  Highest to lowest
                </button>
              </div>
            )}
          </div>
        </div>

        <KasuwaItems products={filteredProducts} total={0} limit={0} skip={0} />

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-slate-800 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border px-4 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
          <NavButtomMobile />

      <Footer />
    </section>
    
  
  </>
  );
};

export default MainContent;

import { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import UseApi from "../hooks/UseApi";
import { ProductPagType } from "./MainContent";
import { ProductType } from "../context/ProductProvider";
import { CategorySchema } from "./Admin/AddCategory";
import { CategoryType } from "./Product/CategoriesSelect";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

export interface CategoriesResponse {
  categories: CategorySchema[];
}

const Sidebar = () => {
  const api = UseApi();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);

  const [keywords, setKeywords] = useState<CategoryType[]>([]);

  // Fetch categories from the API
  const fetchCategory = async () => {
    try {
      const response = await api.get<CategoriesResponse>(`/categories`); // Use the correct response type
      const data = response.body;
      console.log(data);

      setKeywords(data?.categories); // Extract `categories` from the response and set state
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<ProductPagType>('/products');
        const data = response.body;
        console.log(data?.products);
        if (data?.products) {
          // Map categories dynamically and ensure uniqueness
          const uniqueCategories = Array.from(
            new Map(
              data.products.map((product) => [
                product.category_id, // Use category_id as the key for uniqueness
                {
                  id: product.category_id,
                  category_name: product.category,
                },
              ])
            ).values()
          );
        console.log(uniqueCategories)

          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchCategory(); // Fetch categories on component mount
  }, []);

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };
  console.log(`categoriesss ${categories}`)

  return (
    <>
    <div className="hidden md:block w-[20%] py-5 px-2 h-[200vh]">

      <section className="w-fit py-1">
        <input
          type="text"
          className="border-2 rounded-lg w-[100%] px-2 p-2 sm:mb-0 "
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <input
            type="number"
            className="border-2 mr-2 px-4 py-3 mb-3 rounded-lg w-[100%]"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="border-2  px-4 py-3 mb-5 mt-2 rounded-lg w-[100%]"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories Section */}
        {/* <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div>
            {allCategories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category.category_name}
                  onChange={() => handleRadioChangeCategories(category.category_name)}
                  checked={selectedCategory === category.category_name}
                  className="mr-2 w-[16px] h-[16px]"
                />
                {category?.category_name.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
        */}

        {/* Keywords Section */}
        <div className="mb-5">
          <h2 className="text-1xl font-semibold mb-3">Category</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword.category_name)}
                className="block mb-2 px-4 py-2 w-full text-left border shadow-lg text-sm rounded hover:bg-gray-300"
              >
                {keyword.category_name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        

        <button
          onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
    </>
  );
};

export default Sidebar;

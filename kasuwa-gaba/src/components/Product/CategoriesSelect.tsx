import { useEffect, useState } from "react";
import UseApi from "../../hooks/UseApi";


// Define the type for a single category
export interface CategoryType {
  id: number;
  category_name: string;
}

// Define the type for the API response
export interface CategoriesResponse {
  categories: CategoryType[];
}

export const AllCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]); // Set correct initial type
  const api = UseApi();

  // Fetch categories from the API
  const fetchCategory = async () => {
    try {
      const response = await api.get<CategoriesResponse>(`/categories`); // Use the correct response type
      const data = response.body;
      console.log(data);

      setCategories(data.categories); // Extract `categories` from the response and set state
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory(); // Fetch categories on component mount
  }, []);

  return (
    <>
      <div className="border-b my-3 p-2 relative top-8">
        <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
          {categories.map((category) => (
            <li key={category.id} className="">
              <a
                href="#"
                className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150"
              >
                {category.category_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllCategories;

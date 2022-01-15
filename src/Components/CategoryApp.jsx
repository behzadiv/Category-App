import CategoryProvider from "./CategoryProvider";
import CategoryForm from "./CategoryForm";
import ProductList from "./ProductList";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const CategoryApp = () => {
  return (
    <div className="block">
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<CategoryForm />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
        {/* <CategoryForm/>
        <ProductList/> */}
         <ToastContainer/>
      </CategoryProvider>
    </div>
  );
};

export default CategoryApp;

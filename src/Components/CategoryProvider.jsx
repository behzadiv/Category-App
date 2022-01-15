import { Children, useContext, useEffect, useState } from "react";
import reactDom from "react-dom";
import React from "react";
import { toast } from "react-toastify";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";

const categoryContext = React.createContext();
const categoryContextDispatcher = React.createContext();

const productsContext = React.createContext();
const productsContextDispatcher = React.createContext();

const CategoryProvider = ({ children }) => {
  const savedProducts = JSON.parse(localStorage.getItem("products"));
  const savedCategories = JSON.parse(localStorage.getItem("categories"));
  const [category, setCategory] = useState(
    savedCategories
      ? savedCategories
      : ([{ value: "All", label: "All", isDisabled: true,id:0 },
        { value: "Meat", label: "Meat",id:1 },
        { value: "Drink", label: "Drink",id:2 }]),
  );
  const [products, setProducts] = useState(savedProducts ? savedProducts : []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("categories", JSON.stringify(category));
  }, [products, category]);
  return (
    <categoryContext.Provider value={category}>
      <categoryContextDispatcher.Provider value={setCategory}>
        <productsContext.Provider value={products}>
          <productsContextDispatcher.Provider value={setProducts}>
            {children}
          </productsContextDispatcher.Provider>
        </productsContext.Provider>
      </categoryContextDispatcher.Provider>
    </categoryContext.Provider>
  );
};

export default CategoryProvider;
export const useCategory = () => useContext(categoryContext);
export const useCategoryActions = () =>{
    const setOptions = useContext(categoryContextDispatcher);
    const options = useCategory();
    const products = useProducts();
    const setProducts = useContext(productsContextDispatcher);
  
    const addCategory = (categoryValue) => {
      const newCategory = { value: categoryValue, label: categoryValue,id:Math.ceil(Math.random()*1000) };
      const checkedCategory = options.map((opt) =>
        opt.label.toLocaleLowerCase().includes(categoryValue.toLocaleLowerCase())
      );
      return checkedCategory.indexOf(true) === -1
        ? (setOptions([...options, newCategory]),
          toast.success(`${categoryValue} added in categories`),
          console.log(options))
        : toast.error(`${categoryValue} is exist !`);
    };
    const removeCategory = (categoryId ,categoryValue)=>{
        const fiteredCategory=options.filter((opt)=>opt.id !== categoryId)
        setOptions(fiteredCategory);
        const filteredProducts= products.filter((p)=>p.category!==categoryValue)
        setProducts(filteredProducts)
    }
    return{addCategory,removeCategory}
} 

export const useProducts = () => useContext(productsContext);
export const useProductsActions = () => {
  const products = useProducts();
  const setProducts = useContext(productsContextDispatcher);
  
  const addProduct = (productValue, categoryValue) => {
    if (!categoryValue) return toast.error("please select your category");
    const checkedProduct = products.map(
      (p) =>
        p.name.toLocaleLowerCase().includes(productValue.toLocaleLowerCase()) &&
        p.category.includes(categoryValue)
    );
    const newProduct = {
      name: productValue,
      category: categoryValue,
      id: Math.ceil(Math.random() * 100),
      qty: 1,
    };
    return checkedProduct.indexOf(true) === -1
      ? (setProducts([...products, newProduct]),
        toast.success(`${productValue} added to ${categoryValue}`))
      : toast.error(`${productValue} is exist in ${categoryValue}`);
  };
 
  const removeProduct = (id) => {
    const updatedProduct = [...products];
    const updatedItemIndex = updatedProduct.findIndex((p) => p.id === id);
    const selectedProduct = { ...updatedProduct[updatedItemIndex] };
    console.log(selectedProduct);
    if (selectedProduct.qty > 1) {
      selectedProduct.qty--;
      updatedProduct[updatedItemIndex] = selectedProduct;
      return setProducts(updatedProduct);
    } else {
      const filteredProducts = products.filter((p) => p.id !== id);
      setProducts(filteredProducts);
      toast.warn(
        `${selectedProduct.name} deleted from ${selectedProduct.category}`
      );
    }
  };
  const increment = (id) => {
    const updatedProduct = [...products];
    const updatedItemIndex = updatedProduct.findIndex((p) => p.id === id);
    const selectedProduct = { ...updatedProduct[updatedItemIndex] };
    selectedProduct.qty++;
    updatedProduct[updatedItemIndex] = selectedProduct;
    return setProducts(updatedProduct);
  };
  return { removeProduct, setProducts, increment, addProduct };
};

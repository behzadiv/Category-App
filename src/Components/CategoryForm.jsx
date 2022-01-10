import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  useCategoryActions,
  useCategory,
  useProducts,
  useProductsActions,
} from "./CategoryProvider";
const CategoryForm = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [productValue, setProductValue] = useState("");

  const options = useCategory();
  const setOptions = useCategoryActions();

  const products = useProducts();
  const { setProducts } = useProductsActions();
  
  const selectHandler = (e) => {
    console.log(e);
    setCategoryValue(e.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    switch (e.currentTarget.className) {
      case "category":
        const newCategory = { value: categoryValue, label: categoryValue };
        setOptions([...options, newCategory]);
        break;
      case "product":
        //console.log(productValue);
        if (!categoryValue) return alert("please select your category");
        if (categoryValue === "All") return alert("select valuable category");
        const myArray = products.map(
          (p) =>
            p.name.toLocaleLowerCase().includes(productValue.toLocaleLowerCase()) && p.category.includes(categoryValue)
        );
        console.log(myArray);
        console.log(myArray.indexOf(true));
        const newProduct = {
          name: productValue,
          category: categoryValue,
          id: Math.ceil(Math.random() * 100),
          qty: 1,
        };
        myArray.indexOf(true) === -1
          ? setProducts([...products, newProduct])
          : console.log("this product is exist");
    }
  };

  const inputHandler = (e) => {
    switch (e.currentTarget.className) {
      case "category":
        setCategoryValue(e.target.value);
        break;
      case "product":
        setProductValue(e.target.value);
      default:
        break;
    }
  };

  return (
    <div className="form-container">
      <section className="add-product">
        <div>
          <label htmlFor="">Add New Product</label>
          <form className="product" onSubmit={submitHandler}>
            <input
              type="text"
              className="product"
              onChange={inputHandler}
              required
            />
            <button type="submit" className="add-product_btn">
              Add product
            </button>
          </form>
        </div>
        <div>
          <label htmlFor="">Select Category</label>
          <Select
            className="select-options"
            value={options.value}
            options={options}
            onChange={selectHandler}
          />
        </div>
      </section>
      <section className="add-category">
        <label htmlFor="">Create New Category</label>
        <form onSubmit={submitHandler} className="category">
          <input
            type="text"
            className="category"
            onChange={inputHandler}
            required
            placeholder={categoryValue}
          />
          <button type="submit" className="add-category_btn">
            add
          </button>
        </form>
      </section>
      <Link to="/productList">Go to product lists...</Link>
    </div>
  );
};

export default CategoryForm;

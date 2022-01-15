import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  useCategoryActions,
  useCategory,
  useProducts,
  useProductsActions,
} from "./CategoryProvider";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    options.map((opt) =>
      opt.value === "All" ? (opt.isDisabled = true) : null
    );
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    switch (e.currentTarget.className) {
      case "category":
        const newCategory = { value: categoryValue, label: categoryValue };
        console.log(options);
        const checkedCategory = options.map((opt)=>opt.label.toLocaleLowerCase().includes(categoryValue.toLocaleLowerCase()))
        return checkedCategory.indexOf(true)=== -1 ? 
        (setOptions([...options, newCategory]),
        toast.success(`${categoryValue} added in categories`),
        setCategoryValue("")
        )
        :
        (toast.error(`${categoryValue} is exist !`))
        break;

      case "product":
        if (!categoryValue) return toast.error("please select your category");
        const checkedProduct = products.map(
          (p) =>
            p.name
              .toLocaleLowerCase()
              .includes(productValue.toLocaleLowerCase()) &&
            p.category.includes(categoryValue)
        );
       const newProduct = {
          name: productValue,
          category: categoryValue,
          id: Math.ceil(Math.random() * 100),
          qty: 1,
        };
        return checkedProduct.indexOf(true) === -1
          ? (setProducts([...products, newProduct]), toast.success(`${productValue} added to ${categoryValue}`),setProductValue(""))
          : toast.error(`${productValue} is exist in ${categoryValue}`)
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
              value={productValue}
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
            value={categoryValue}
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

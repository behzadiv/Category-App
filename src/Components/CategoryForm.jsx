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
import { faTrashAlt,faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import capitalizeFirstLetter from "../utility/capitalizeFirstLetter";

const CategoryForm = () => {
  const goforward = <FontAwesomeIcon icon={faArrowAltCircleRight} />
  
  const [categoryValue, setCategoryValue] = useState("");
  const [productValue, setProductValue] = useState("");

  const options = useCategory();
  const categories = useCategory();
  console.log(categories);
  const products = useProducts();
  const { addProduct } = useProductsActions();
  const { removeCategory, addCategory } = useCategoryActions();

  const selectHandler = (e) => {
    console.log(e);
    setCategoryValue(e.value);
  };

  useEffect(() => {
    options.map((opt) =>
      opt.value === "All" ? (opt.isDisabled = true) : null
    );
    const sortedValue = JSON.parse(localStorage.getItem("sortedValue"));
    const defaultSortedValue = { value: "All" };
    sortedValue
      ? localStorage.setItem("sortedValue", JSON.stringify(sortedValue))
      : localStorage.setItem("sortedValue", JSON.stringify(defaultSortedValue));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    switch (e.currentTarget.className) {
      case "category": {
        const newString = capitalizeFirstLetter(categoryValue);
        addCategory(newString);
        setCategoryValue("");
        break;
      }

      case "product": {
        const newString = capitalizeFirstLetter(productValue);
        addProduct(newString, categoryValue);
        setProductValue("");
        break;
      }
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
  const renderCategoryList = () => {
    return categories.map((item) => (
      <Category
        key={item.id}
        item={item}
        removeCategory={removeCategory}
        products={products}
      />
    ));
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
        <div className="select-category">
          <label htmlFor="">Select Category</label>
          <Select
            className="select-options"
            value={options.value}
            options={options}
            onChange={selectHandler}
          />
        </div>
            <button type="submit" className="add-product_btn">
              Add product
            </button>
          </form>
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
            Add
          </button>
          <div className="categoryList-container">{renderCategoryList()}</div>
        </form>
      </section>
      <Link to="/productList" className="go-forward"><span>Go to product lists</span><span>{goforward}</span></Link>
    </div>
  );
};

export default CategoryForm;

const Category = ({ item, products,removeCategory }) => {
  const trash = <FontAwesomeIcon icon={faTrashAlt} />;
  const filteredProduct = products.filter((p) => p.category === item.label);
  const requestRemoveCategory = (id, label) => {
    if(window.confirm(`${label} Category Has ${filteredProduct.length > 1 ? `${filteredProduct.length} Products` : `${filteredProduct.length} Product`}\nAre You Sure To Delete ?`)){
      removeCategory(id,label)
    }
    
  };
  return item.label !== "All" ? (
    <div className="category-item">
      <span>{item.label}</span>
      <span>{filteredProduct.length}</span>
      <span
        className="delete"
        onClick={() => requestRemoveCategory(item.id, item.label)}
      >
        {trash}
      </span>
    </div>
  ) : null;
};

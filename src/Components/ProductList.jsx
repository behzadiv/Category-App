import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  useCategory,
  useProducts,
  useProductsActions,
} from "./CategoryProvider";
import Product from "./Product";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faTrashAlt ,faPlusCircle} from '@fortawesome/free-solid-svg-icons'


const ProductList = () => {
  const goback = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const trash = <FontAwesomeIcon icon={faTrashAlt}/>
  const add = <FontAwesomeIcon icon={faPlusCircle}/>
  const products = useProducts();
  const options = useCategory();
  
  useEffect(()=>{
    setFilteredProduct(products)
    options.map((opt)=>opt.value === "All" ? opt.isDisabled=false : null)
    const sortedValue = JSON.parse(localStorage.getItem("sortedValue"))
    selectHandler(sortedValue)
    renderProductList()
  },[products])
  
  const { removeProduct,increment } = useProductsActions();
  
  const [filteredProduct, setFilteredProduct] = useState([]);
  const renderProductList=()=>{
    return !filteredProduct.length ?
     (
      <p className="empty-text">There is no product in this category ...</p>
     )  
   :
    (
      filteredProduct.map((product) => (
       <Product
         product={product}
         key={product.id}
         onIncrement={()=>{
          increment(product.id)
         }}
         onDelete={() => {
         removeProduct(product.id);
        }}
       />
     ))
   )}
  const selectHandler = (e) =>{
    const sortedValue = {"value" : e ? e.value : "All"}
    localStorage.setItem("sortedValue",JSON.stringify(sortedValue))
    if (e.value === "All") setFilteredProduct(products);
    else{
      const sortProducts = products.filter((p) => {
        return p.category === e.value;
      });
      setFilteredProduct(sortProducts);
      renderProductList()
    }
  };
 
 
  return (
    <>
      <div className="product-container">
        <div className="productList-heading">
        <h2>Product List</h2>
        <Link to="/" className="productList-addbtn">{add}</Link>
        </div>
        <div className="product-container-title">
          <span>Product</span>
          <span>Category</span>
          <span className="sortBy">
            <label htmlFor="">sort</label>
            <Select
              className="sort-select"
              value={options.value}
              options={options}
              onChange={selectHandler}
            />
          </span>
        </div>
        {renderProductList()}
      </div>
    </>
  );
};

export default ProductList;

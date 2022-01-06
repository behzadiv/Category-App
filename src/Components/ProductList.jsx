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
import { faArrowCircleLeft, faTrashAlt} from '@fortawesome/free-solid-svg-icons'


const ProductList = () => {
  const goback = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const trash = <FontAwesomeIcon icon={faTrashAlt}/>
  const products = useProducts();
  useEffect(()=>{
    //console.log("ok");
    //setFilteredProduct(products)
    
    renderProductList()
  },[products])
  
  const { removeProduct,increment } = useProductsActions();
  const options = useCategory();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isSelected, setIsselected] = useState(false);
  console.log(products);
  //console.log(isSelected);
  const renderProductList=()=>{
    return !products.length ?
     (
      <p className="empty-text">There is no product in this category ...</p>
     )  
   :
    (
     products.map((product) => (
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
  // const selectHandler = (e) =>{
  //   console.log(e.value);
  //   console.log("select",products);
  //   setIsselected(true);
  //   if (e.value === "All") setFilteredProduct(products);
  //   else{
  //     const sortProducts = products.filter((p) => {
  //       return p.category === e.value;
  //     });
  //     console.log("select2",sortProducts);
  //     setFilteredProduct(sortProducts);
  //     renderProductList()
  //   }
  // };
 
 
  return (
    <>
      <Link to="/" className="go-back"><span>{goback}</span><span>Go back</span></Link>
      <div className="product-container">
        <div className="product-container-title">
          <span>Product</span>
          <span>Category</span>
          {/* <div className="sortBy">
            <label htmlFor="">sort by </label>
            <Select
              className="sort-select"
              value={options.value}
              options={options}
              // onChange={selectHandler}
            />
          </div> */}
        </div>
        {renderProductList()}
      </div>
    </>
  );
};

export default ProductList;

import {useEffect, useState } from "react";
import Select from "react-select"
import {useCategoryActions , useCategory ,useProducts , useProductsActions} from "./CategoryProvider"
import ProductList from "./ProductList"
const CategoryForm = () => {
    const[categoryValue,setCategoryValue]=useState("")
    const[filteredProducts,setFilteredProducts]=useState([])
    const options = useCategory()
    const products=useProducts()   
    const{inputHandlerCategory,submitHandlerCategory}=useCategoryActions()
    const{inputHandlerProduct,removeProduct,submitHandlerProduct}=useProductsActions()

    
    useEffect(()=>{
        filterProduct(categoryValue)
    },[products])
    
    const selectHandler =(e)=>{
        console.log(e);
        setCategoryValue(e.value)
        filterProduct(e.value)
    }
    const filterProduct=(value)=>{
        const filtered = products.filter((p)=>p.category === value)
        console.log(filtered);
        setFilteredProducts(filtered)
    }
    
    


    return ( 
    <div>
        <form onSubmit={submitHandlerCategory} className="category">
            <input type="text" onChange={inputHandlerCategory} required id="category"/>
            <button type="submit">+</button>
        </form>
        <form onSubmit={(e)=>submitHandlerProduct(e,categoryValue)} className="product">
            <input type="text" onChange={inputHandlerProduct} required id="product"/>
            <button type="submit">+</button>
        </form>
        <Select 
        value={options.value}
        options={options}
        onChange={selectHandler}
        />
        <ProductList products={filteredProducts}/>
    </div> 
    );
}
 
export default CategoryForm;
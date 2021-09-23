import {useState } from "react";
import Select from "react-select"
import {useCategoryActions , useCategory ,useProducts , useProductsActions} from "./CategoryProvider"
const CategoryForm = () => {
    const[categoryValue,setCategoryValue]=useState("")
    const[productValue,setProductValue]=useState("")
    
    const options = useCategory()
    const setOptions =useCategoryActions()
    
    const products = useProducts()
    const setProducts = useProductsActions()
    
    
    const submitHandlerCategory=(e)=>{
        e.preventDefault()
        //console.log(categoryValue);
        const newCategory = {value:categoryValue , label:categoryValue}
        setOptions([...options,newCategory])
        
    }
    const selectHandler =(e)=>{
        console.log(e);
        setCategoryValue(e.value)
    }
    const inputHandlerCategory = (e)=>{
        setCategoryValue(e.target.value)
    }
    
    const inputHandlerProducts=(e)=>{
        setProductValue(e.target.value)
    }
    const submitHandlerProduct=(e)=>{
        e.preventDefault();
        console.log(e.currentTarget.className);
        if(!categoryValue)return alert("please select your category")
        const newProduct ={name:productValue , category:categoryValue}
        setProducts([...products,newProduct])
    }
    console.log(products);

    return ( 
    <div>
        <form onSubmit={submitHandlerCategory} className="category">
            <input type="text" onChange={inputHandlerCategory} required/>
            <button type="submit">+</button>
        </form>
        <form onSubmit={submitHandlerProduct} className="product">
            <input type="text" onChange={inputHandlerProducts} required/>
            <button type="submit">+</button>
        </form>
        <Select 
        value={options.value}
        options={options}
        onChange={selectHandler}
        />
    </div> 
    );
}
 
export default CategoryForm;
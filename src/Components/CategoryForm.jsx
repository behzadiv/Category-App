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
    
    const selectHandler =(e)=>{
        console.log(e);
        setCategoryValue(e.value)
    }

    
    
    const submitHandler=(e)=>{
        e.preventDefault()
        switch (e.currentTarget.className) {
            case "category":
                return 
                {const newCategory = {value:categoryValue , label:categoryValue}
                setOptions([...options,newCategory])}
                break;
            case "product":
                if(!categoryValue)return alert("please select your category")
                return
                {
                    const newProduct ={name:productValue , category:categoryValue}
                    setProducts([...products,newProduct])
                }
            default:
                break;
        }
              
    }
    const inputHandler = (e)=>{
        switch (e.currentTarget.className) {
            case "category":
                return setCategoryValue(e.target.value)
                break;
            case "product":
                return setProductValue(e.target.value)
            default:
                break;
        }
    }


    return ( 
    <div>
        <form onSubmit={submitHandler} className="category">
            <input type="text" onChange={inputHandler} required/>
            <button type="submit">+</button>
        </form>
        <form onSubmit={submitHandler} className="product">
            <input type="text" onChange={inputHandler} required/>
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
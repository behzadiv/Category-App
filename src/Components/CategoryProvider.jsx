import { Children, useContext, useEffect, useState } from "react";
import reactDom from "react-dom";
import React from 'react';

const categoryContext = React.createContext()
const categoryContextDispatcher = React.createContext()

const productsContext = React.createContext()
const productsContextDispatcher = React.createContext()
    
const CategoryProvider = ({children}) => {
    
    const[category,setCategory]=useState([
        {value:"Meat" , label:"Meat"},
        {value:"Drink" , label:"Drink"}
    ])
    
    const[products,setProducts]=useState([])
    
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
}
 
export default CategoryProvider;
export const useCategory =()=> useContext(categoryContext)

export const useCategoryActions =()=> {
    const category = useCategory()
    const setCategory = useContext(categoryContextDispatcher)
    const[categoryValue,setCategoryValue]=useState("")
    const submitHandlerCategory=(e)=>{
        e.preventDefault()
        const newCategory = {value:categoryValue , label:categoryValue}
        console.log(category);
        setCategory([...category,newCategory])
        setCategoryValue("")
    }
    const inputHandlerCategory = (e)=>{
        setCategoryValue(e.target.value)
        
    }
    return{submitHandlerCategory,inputHandlerCategory}
}


export const useProducts = ()=> useContext(productsContext)
export const useProductsActions = ()=>{
    
    const products=useProducts()
    const[productValue,setProductValue]=useState("")
    const setProducts =useContext(productsContextDispatcher)
    
    
    const removeProduct=(e)=>{
        console.log(e);
    }
    const inputHandlerProduct = (e)=>{
        setProductValue(e.target.value)
    }
    const submitHandlerProduct=(e,categoryValue)=>{
        e.preventDefault()
        if(!categoryValue)return alert("please select your category")
            const newProduct ={name:productValue , category:categoryValue, id:Math.floor(Math.random()*100)}
            setProducts([...products,newProduct])        
    }
    
    return{removeProduct,inputHandlerProduct,submitHandlerProduct}
}

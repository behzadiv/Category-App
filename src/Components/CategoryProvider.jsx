import { Children, useContext, useState } from "react";
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
export const useCategoryActions =()=> useContext(categoryContextDispatcher)

export const useProducts = ()=> useContext(productsContext)
export const useProductsActions = ()=>{
    const products = useProducts()
    const setProducts = useContext(productsContextDispatcher)
    const removeProduct = (id)=>{
        const updatedProduct = [...products]
        const updatedItemIndex = updatedProduct.findIndex((p)=> p.id === id)
        const selectedProduct = {...updatedProduct[updatedItemIndex]}
        if(selectedProduct.qty > 1){
            selectedProduct.qty --;
            updatedProduct[updatedItemIndex]=selectedProduct
            return setProducts(updatedProduct)
        }
        else{

            const filteredProducts = products.filter((p)=>p.id !== id)
            setProducts(filteredProducts)
        }
    }
    const increment=(id)=>{
        const updatedProduct = [...products]
        const updatedItemIndex = updatedProduct.findIndex((p)=> p.id === id)
        const selectedProduct = {...updatedProduct[updatedItemIndex]}
        selectedProduct.qty ++ 
        updatedProduct[updatedItemIndex]=selectedProduct
        return setProducts(updatedProduct)
        
    }
    return{removeProduct,setProducts,increment}
}
import { Children, useContext, useState } from "react";
import reactDom from "react-dom";
import React from 'react';

const categoryContext = React.createContext()
const categoryContextDispatcher = React.createContext()

const CategoryProvider = ({children}) => {
    
    const[category,setCategory]=useState([
        {value:"Meat" , label:"Meat"},
        {value:"Drink" , label:"Drink"}
    ])
    
    return (
        <categoryContext.Provider value={category}>
            <categoryContextDispatcher.Provider value={setCategory}>
                {children}
            </categoryContextDispatcher.Provider>
        </categoryContext.Provider>
      );
}
 
export default CategoryProvider;
export const useCategory =()=> useContext(categoryContext)
export const useCategoryActions =()=> useContext(categoryContextDispatcher)
  
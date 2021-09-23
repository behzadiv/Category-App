import {useState } from "react";
import Select from "react-select"
import {useCategoryActions , useCategory} from "./CategoryProvider"
const CategoryForm = () => {
    const[categoryValue,setCategoryValue]=useState("")
    const options = useCategory()
    const setOptions =useCategoryActions()
    const submitHandler=(e)=>{
        e.preventDefault()
        //console.log(categoryValue);
        const newCategory = {value:categoryValue , label:categoryValue}
        setOptions([...options,newCategory])
        
    }
    const selectHandler =(e)=>{
        console.log(e);
    }
    const inputHandler = (e)=>{
        setCategoryValue(e.target.value)
    }
    return ( 
    <div>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={inputHandler}/>
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
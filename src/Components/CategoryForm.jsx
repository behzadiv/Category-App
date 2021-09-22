const CategoryForm = () => {
    const submitHandler=()=>{
        console.log("ok");
    }
    return ( 
    <div>
        <form onSubmit={submitHandler}>
            <input type="text"/>
            <button type="submit">+</button>
        </form>
        
    </div> 
    );
}
 
export default CategoryForm;
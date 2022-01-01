import CategoryProvider from "./CategoryProvider"
import CategoryForm from "./CategoryForm"
import ProductList from "./ProductList"

const CategoryApp = () => {
    return ( 
        <div>
            <CategoryProvider>
                <CategoryForm />
                <ProductList/>
            </CategoryProvider>
        </div>
     );
}
 
export default CategoryApp;
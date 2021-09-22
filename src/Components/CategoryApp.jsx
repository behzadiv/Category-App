import CategoryProvider from "./CategoryProvider"
import CategoryForm from "./CategoryForm"

const CategoryApp = () => {
    return ( 
        <div>
            <CategoryProvider>
                <CategoryForm />
            </CategoryProvider>
        </div>
     );
}
 
export default CategoryApp;
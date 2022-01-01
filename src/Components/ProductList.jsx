import {useProducts, useProductsActions} from "./CategoryProvider"
import Product from "./Product"
const ProductList = () => {
    const products = useProducts()
    const {removeProduct}=useProductsActions()
    console.log(products);
    return ( 
        <div>
            {products.map((product)=>
            
            <Product 
                product={product}
                key={product.id}
                onDelete ={()=>removeProduct(product.id)}
            />)

        }
        </div>
     );
}
 
export default ProductList;
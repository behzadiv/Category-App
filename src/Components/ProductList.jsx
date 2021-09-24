import {useProducts, useProductsActions} from "./CategoryProvider"
import Product from "./Product"
const ProductList = ({products}) => {
    
    
    const{removeProduct}=useProductsActions()
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
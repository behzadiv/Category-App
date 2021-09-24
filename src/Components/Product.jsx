import {useProducts,useProductsActions} from "./CategoryProvider"


const Product = ({product,onDelete}) => {
    
    return ( 
        <div>
            <p>{product.name}</p>
            <button onClick={onDelete}>delete</button>
        </div>
     );
}
 
export default Product;
import { useProducts, useProductsActions } from "./CategoryProvider";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, onDelete ,onIncrement}) => {
  const trash = <FontAwesomeIcon icon={faTrashAlt} />;
  return (
    <div className="product-item">
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span className="edit-btn">
        <span onClick={onIncrement} className="increment">+</span>
        <span>{product.qty}</span>
        <span onClick={onDelete} className="decrement">{product.qty> 1 ? "-" : trash}</span>
      </span>
    </div>
  );
};

export default Product;

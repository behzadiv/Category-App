import { useProducts, useProductsActions } from "./CategoryProvider";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faTrashAlt,faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, onDelete ,onIncrement}) => {
  const trash = <FontAwesomeIcon icon={faTrashAlt} />;
  const plus = <FontAwesomeIcon icon={faPlus} />;
  const minus = <FontAwesomeIcon icon={faMinus} />;
  return (
    <div className="product-item">
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span className="edit-btn">
        <span onClick={onIncrement} className="increment">{plus}</span>
        <span>{product.qty}</span>
        <span onClick={onDelete} className="decrement">{product.qty> 1 ? minus : trash}</span>
      </span>
    </div>
  );
};

export default Product;

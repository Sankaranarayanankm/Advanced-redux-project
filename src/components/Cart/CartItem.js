import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../Store/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price } = props;
  const dispatch = useDispatch();
  const incrementCartItemHandler = (id) => {
    dispatch(cartActions.incrementCartItem(id));
  };
  const decrementCartItemHandler = (id) => {
    dispatch(cartActions.decrementCartItem(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => decrementCartItemHandler(props.id)}>-</button>
          <button onClick={() => incrementCartItemHandler(props.id)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

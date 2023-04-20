import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem
          item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
        /> */}
        {cartItems.map((item) => {
          return (
            <CartItem
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.totalPrice,
              }}
              key={item.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
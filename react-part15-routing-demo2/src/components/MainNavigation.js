import { Link, NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            {/* <Link to="/">Home</Link> */}
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? styles.active : "")}
              // end={true}
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* <Link to="/products">Products</Link> */}
            <NavLink
              to="products"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

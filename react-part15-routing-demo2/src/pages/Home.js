import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("products"); // navigating programatically
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        <Link to="products">Products</Link>
      </p>
      <p>
        <button type="button" onClick={navigateHandler}>
          {/* for sake of demo */}
          Navigate
        </button>
      </p>
    </>
  );
};

export default HomePage;

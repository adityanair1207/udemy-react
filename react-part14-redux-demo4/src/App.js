import React from "react";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // state refers to the global store state which is automatically passed to useSelector by redux

  return (
    <>
      <Header />
      {!isAuthenticated && <Auth />}
      {isAuthenticated && <UserProfile />}
      <Counter />
    </>
  );
}

export default App;

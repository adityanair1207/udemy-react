import MainNavigation from "../components/MainNavigation";

const Error = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1 style={{ color: "red" }}>An error occured!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};

export default Error;

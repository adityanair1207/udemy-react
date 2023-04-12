import React, { useCallback, useState } from "react";
import "./App.css";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  const showParagraphHandler = useCallback(() => {
    //setShowParagraph(!showParagraph); // not the right way when setting state based on previous state
    setShowParagraph((prevState) => !prevState);
  }, []); // to recreate function on some state change, add it as dependency

  console.log("APP RUNNING");

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* {showParagraph && <p>This is new.</p>} */}
      <DemoOutput show={false} />
      <Button onClick={showParagraphHandler}>Toggle para</Button>
    </div>
  );
}

export default App;

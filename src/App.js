import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  }, []);
  return (
    <div className="App">
     <>{Comp && <Comp />}</>
    </div>
  );
}

export default App;

import './App.css';
// import { useState, useEffect } from "react";

import Excalidraw from './pages/excalidraw/Excalidraw';
import SignIn from './pages/sign-in/SignInComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // const [Comp, setComp] = useState(null);
  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/draw' element={<Excalidraw />} />
      </Routes>
    </Router>

  );
}

export default App;

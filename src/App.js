import './App.css';
// import { useState, useEffect } from "react";

import Excalidraw2 from './pages/excalidraw/Excalidraw';
import SignIn from './pages/sign-in/SignInComponent';
import { Navigate,BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  // const [Comp, setComp] = useState(null);
  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/draw' />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/draw' element={<Excalidraw2 />} />
      </Routes>
    </Router>

  );
}

export default App;

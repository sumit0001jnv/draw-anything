import './App.css';
// import { useState, useEffect } from "react";

import Excalidraw2 from './pages/excalidraw/Excalidraw';
import SignIn from './pages/sign-in/SignInComponent';
import { Navigate, BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import SignUpComponent from './pages/sign-up/SignUpComponent';
import CustomSnackbar from "./common/component/snackbar/CustomSnackbar";


function App() {
  // const [Comp, setComp] = useState(null);
  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
  // }, []);
  return (
    <>
      <HashRouter>
        {/* <Router> */}
        <Routes>
          <Route path='/' element={<Navigate to='/draw' />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUpComponent />} />
          <Route path='/draw' element={<Excalidraw2 />} />
        </Routes>
        {/* </Router> */}
      </HashRouter>
      <CustomSnackbar />
      </>
  );
}

export default App;

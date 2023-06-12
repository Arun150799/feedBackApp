import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Listing from './component/Listing';
import ProtectiveRoute from './component/ProtectiveRoute';
import Edit from './component/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
       <Route element={<ProtectiveRoute/>}>
       {/* <Route path="/" element={<Listing/>} /> */}
       {/* <Route path='/editJob/:id' element={<Edit/>} /> */}

       </Route>

     <Route path='/register' element={ <SignUp/>} />
     <Route path="/" element={<Listing/>} />
     <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;

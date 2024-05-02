import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Navbar from './components/common/Navbar';
import Login from './components/Pages/Login';
import SignupForm from './components/Pages/SignupFoam';
// import Logout from './components/Pages/Logout';
import OpenRoute from './components/auth/OpenRoute';
import ForgotPassword from './components/Pages/ForgetPass';
import UpdatePassword from './components/Pages/UpdatePassword';
import VarifyEmail from './components/Pages/VarifyEmail';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Dashboard from './components/Pages/Dashboard';
import Myprofile from './components/dashboard/Myprofile';
import PrivateRoute from './components/auth/PrivateRoute';
import Error from "./components/Pages/Error"
import Setting from './components/dashboard/settings/index';
import EnrolledCourses from './components/dashboard/EnrolledCourses';

// require('dotenv').config();

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/signup' element={<OpenRoute><SignupForm/></OpenRoute>}/>
        {/* <Route path='/logout' element={<Logout/>}/> */}
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path='/verify-email' element={<OpenRoute><VarifyEmail/></OpenRoute>}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact/>}/>

        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path='/dashboard/my-profile' element={<Myprofile/>}/>
            <Route path='/dashboard/settings' element={<Setting/>} />
            <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>} />
        </Route>

        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;

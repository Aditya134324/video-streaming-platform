import  {Routes , Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import WatchVideo from "./pages/WatchVideo.jsx";
import UploadVideo from "./pages/uploadVideo.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/searchPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App(){
  return (
    <>
       
      <Navbar/>

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/video/:id" element={<WatchVideo />} />
       <Route path="/upload" element={<ProtectedRoute> <UploadVideo /> </ProtectedRoute>} />
       <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
     </Routes>
     </>
  );
}

export default App;
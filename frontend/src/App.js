import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import PostNotice from "./pages/PostNotice";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userID" exact Component={Home} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/post/:userID" element={<PostNotice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

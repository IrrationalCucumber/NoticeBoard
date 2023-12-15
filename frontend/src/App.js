import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import PostNotice from "./pages/PostNotice";
import NoticeList from "./pages/NoticeList";
import Map from "./pages/Map";
import ViewPost from "./pages/ViewPost";
import UpdatePost from "./pages/UpdatePost";

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
          <Route path="/notices/:userID" element={<NoticeList />} />
          <Route path="/map/:userID" element={<Map />} />
          <Route path="/view/:userID/:postID" element={<ViewPost />} />
          <Route path="/update/:userID/:postID" element={<UpdatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

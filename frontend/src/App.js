import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route to="/" element={<Home />} />
          <Route to="/profile/:userID" element={<Profile />} />
          <Route to="/sign-in" element={<SignIn />} />
          <Route to="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route to="/" exact element={<Home />} />
          <Route to="/profile/:userID" exact element={<Profile />} />
          <Route to="/signin" exact element={<SignIn />} />
          <Route to="/signup" exact element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

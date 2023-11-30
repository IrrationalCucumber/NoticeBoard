import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route to="/" exact element={<Home />} />
          <Route to="/profile/:userID" exact element={<Profile />} />
          <Route to="/signin" exact element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useRef } from "react";
import "./App.css";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import Chat from "./pages/Chat";
import Avatar from "./components/Avatar";

function App() {
  const userExists = useRef(false);
  const userId = localStorage.getItem("userId");
  const color1 = localStorage.getItem("color1");
  const color2 = localStorage.getItem("color2");
  const color3 = localStorage.getItem("color3");

  if (localStorage.getItem("userId") === null) {
    userExists.current = false;
  } else {
    userExists.current = true;
  }

  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/" exact>
    //       {userExists.current ? (
    //         <Home
    //           color1={color1}
    //           color2={color2}
    //           color3={color3}
    //           userId={userId}
    //         />
    //       ) : (
    //         <NewUser />
    //       )}
    //     </Route>

    //     <Route
    //       path="/chat/:id"
    //       render={({ match }) => (
    //         <Chat
    //           match={match}
    //           color1={color1}
    //           color2={color2}
    //           color3={color3}
    //           userId={userId}
    //         />
    //       )}
    //     />
    //     <Route path="/avatar" component={Avatar}></Route>
    //   </Switch>
    // </BrowserRouter>

    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home
            color1={color1}
            color2={color2}
            color3={color3}
            userId={userId}
          />
        </Route>

        <Route
          path="/chat/:id"
          render={({ match }) => (
            <Chat
              match={match}
              color1={color1}
              color2={color2}
              color3={color3}
              userId={userId}
            />
          )}
        />
        <Route path="/avatar" component={Avatar}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

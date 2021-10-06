import React from 'react';
import storage from './utils/storage';
import { Credentials, NewUser } from './types';
import loginService from './services/login';
import userService from './services/users';
import linkService from './services/links';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import NewAccForm from './components/NewAccForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';
import Info from './components/Info';
import Redirector from './components/Redirector';
import { initializeLinks, createLink, updateLink } from './state/reducers/linkReducer';
import { useDispatch, useSelector } from "react-redux";
import { Token, BasicLink, Link } from './types';
import { RootState } from './state/store';
import LinkForm from './components/LinkForm';
const App: React.FC = () => {
  const bgStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.075)",
  }
  const [user, setUser] = React.useState<Token | null>(null);
  const [notification, setNotification] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory();
  const links = useSelector((state: RootState) => state);
  const location = useLocation();

  const submitUpdatedLink = async (updatedLink: Link) => {
    try {
      console.log("Reached")
      const res = await linkService.updateLink( updatedLink.id, updatedLink );
      console.log(res);
      if(res) {
        dispatch(updateLink(res.id, res));
        raiseNotif('updated link analytics');
        console.log('Redirecting');
        window.location.href = res.toLink;
      }
      else {
        raiseError('something went wrong-server response was empty');
      }
    }
    catch(exception) {
      console.log(exception);
      raiseError('something went wrong redirecting you');
    }
  }

  React.useEffect(() => {
    const tokenUser = storage.loadUser();
    if(tokenUser) {
      setUser(tokenUser);
      if(links.length === 0)
        dispatch(initializeLinks());
      else {
        if(location.pathname === "/")
          history.push("/info");
        else {
          const fullUrl = "http://localhost:3000" + location.pathname;
          const link = links.find(l => l.fromLink === fullUrl);
          if(link) {
            const updatedLink = { ...link, numReached: link.numReached + 1 };
            submitUpdatedLink(updatedLink);
          }
          else {
            if(location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/createAccount" && location.pathname !== "/info" && location.pathname !== "/new") {
              raiseError('Link not found');
            }
          }
        }
      }
    }
    else 
      history.push("/login");
  }, [dispatch, links, history, location]);

  const raiseError = (message: string) => {
    clearTimeout();
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }

  const raiseNotif = (message: string) => {
    clearTimeout();
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  }

  const handleNewUser = async (values: NewUser) => {
    const res = await userService.createUser(values);
    if(!res)
      raiseError(`something went wrong creating user`);
    else 
      raiseNotif(`successfully created user ${res.name}`);
  }

  const handleLogin = async (credentials: Credentials) => {
    try {
      const res = await loginService.login(credentials);
      storage.saveUser(res);
      raiseNotif(`Welcome back ${res.name}`);
      setUser(storage.loadUser());
      history.push("/info");
    }
    catch(exception) {
      raiseError('wrong username/password');
    }
  }

  const handleCreate = async (link: BasicLink) => {
    try {
      const res = await linkService.addLink(link);
      if(res) {
        dispatch(createLink(res));
        raiseNotif(`Created link from ${link.fromLink} to ${link.toLink}`);
      }
      else {
        raiseError('something went wrong-server response was empty');
      }
    }
    catch(exception) {
      console.log(exception);
      raiseError('something went wrong ');
    }
  }

  const signout = () => {
    storage.logoutUser();
    setUser(null);
    history.push("/login");
  }

  return (
    <div style={bgStyle} className="h-screen flex items-center justify-center p-8 w-full fixed inset-0">
      <div className="rounded-lg shadow-lg bg-white w-full max-w-2xl p-8 px-8 pt-6 pb-8 mb-4" >
        <Notification notification={notification} />
        <ErrorMessage errorMessage={errorMessage} />
        <Switch>
          <Route path="/login">
            <LoginForm onSubmit={handleLogin} />
          </Route>
          <Route path="/createAccount">
            <NewAccForm onSubmit={handleNewUser} />
          </Route>
          <Route path="/info">
            <Info user={user} signout={signout} />
          </Route>
          <Route path="/new">
            <LinkForm onSubmit={handleCreate} />
          </Route>
          <Route path="/">
            <Redirector />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
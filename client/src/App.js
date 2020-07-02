import React from 'react';
import { userRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import "materialize-css"
import { AuthContext } from './context/auth.context';
import { Navbar } from './Components/Navbar';
import { Loader } from './Components/Loader';

function App() {
  const {login, token, logout, userId,ready} = useAuth()
  const isAuthenticated = !!token
  const routes = userRoutes(isAuthenticated)
  if(!ready){
    return <Loader/>
  }

  
  return (
    <AuthContext.Provider value={{login, token, logout, userId, isAuthenticated}} >
      <BrowserRouter>
        {isAuthenticated ? <Navbar/> : ''}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

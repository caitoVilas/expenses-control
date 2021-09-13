import { HashRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainMenu from './components/MainMenu';
import HeaderMain from './components/HeaderMain';
import Footer from './components/Footer';
import Home from './pages/Home';
import FormRegister from './pages/FormRegister';
import FormLogin from './pages/FormLogin';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MyData from './pages/MyData';
import Entitities from './pages/Entitities';
import Cards from './pages/Cards';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <MainMenu />
        <HeaderMain />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={FormRegister} />
          <Route exact path="/login" component={FormLogin} />
          <PrivateRoute exact path="/myData" component={MyData}></PrivateRoute>
          <PrivateRoute exact path="/institution" component={Entitities}></PrivateRoute>
          <PrivateRoute exact path="/cards" component={Cards}></PrivateRoute>
        </Switch>
        <Footer />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

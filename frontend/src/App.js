import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import ShippingInformation from "./Pages/ShippingInformation";
import PaymentMethod from "./Pages/PaymentMethod";
import orderPayment from "./Pages/orderPayment";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="app">
          <Router>
          <nav className="nav">
            <Navbar />
          </nav>
          {/* <aside className="aside">
            <Sidebar />
          </aside> */}
          <main className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products/:id" component={Product} />
              <Route path="/cart/:id?" component={Cart} />
              <Route path="/register" component={Register} />
              <Route path="/signin" component={Login} />
              <Route path="/shipping" component={ShippingInformation} />
              <Route path="/paymentMethod" component={PaymentMethod} />
              <Route path="/placeOrder" component={PlaceOrder} />
              <Route path="/orderPayment/:id" component={orderPayment} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </main>
          <footer className="footer">
            <Footer />
          </footer>
        </Router>
        </div>
  );
}

export default App;

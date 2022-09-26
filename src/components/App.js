import React from "react";
import Cart from "./Cart";
import Main from "./Main";
import Sidebar from "./SideBar";
import ErrorBoundary from "../ErrorBoundry/ErrorBoundry";

function App() {
  return (
    <div className="wrapper flex space-between">
      <ErrorBoundary>
        <Sidebar />
        <Main />
        <Cart />
      </ErrorBoundary>
    </div>
  );
}

export default App;

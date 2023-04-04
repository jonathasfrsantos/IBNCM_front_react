import { Fragment } from "react";
import "./App.css";

import { NavBar } from "./components/navbar/NavBar";

import { MainTable } from "./components/tables/MainTable";


function App() {
  return (
  
      <Fragment >
          <NavBar />
          <MainTable />
      </Fragment>
       

  );
}


export default App;

import { Fragment } from "react";
import "./App.css";
import { MainCard } from "./components/cards/MainCards";
import { NavBar } from "./components/navbar/NavBar";

import { MainTable } from "./components/tables/MainTable";


function App() {
  return (
  
      <Fragment >
          <NavBar />
          <MainCard />
          
          <MainTable />
      </Fragment>
       

  );
}


export default App;

import { Fragment } from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { ShowTithesTable } from "./components/buttons/ShowTithesTable";
import { MainTable } from "./components/tables/MainTable";
import { TithesTable } from "./components/tables/TithesTable";

function App() {
  return (
  
      <Fragment >
          <ShowTithesTable />
          <MainTable />
      </Fragment>
       

  );
}


export default App;

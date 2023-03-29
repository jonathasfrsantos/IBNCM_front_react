import { Fragment } from "react";
import "./App.css";

import { NarvBar } from "./components/navbar/NarBar";


import { MainTable } from "./components/tables/MainTable";
import { TithesTable } from "./components/tables/TithesTable";

function App() {
  return (
  
      <Fragment >
          <NarvBar/>
          
          <MainTable />
      </Fragment>
       

  );
}


export default App;

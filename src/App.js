import { Fragment } from "react";
import "./App.css";
import { ShowOthersTableBtn } from "./components/buttons/ShowOthersTablesBtn";

import { MainTable } from "./components/tables/MainTable";
import { TithesTable } from "./components/tables/TithesTable";

function App() {
  return (
  
      <Fragment >
          <ShowOthersTableBtn />
          <MainTable />
      </Fragment>
       

  );
}


export default App;

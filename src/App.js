import { Fragment } from "react";
import "./App.css";
import { CalendarButton } from "./components/buttons/CalendarButton";


import { NavBar } from "./components/navbar/NavBar";

import { MainTable } from "./components/tables/MainTable";

function App() {
  return (
    <Fragment>
  
      <CalendarButton />
      <MainTable />
    </Fragment>
  );
}

export default App;

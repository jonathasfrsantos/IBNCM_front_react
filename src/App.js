import { Fragment, useState } from "react";
import "./App.css";
import { CalendarButton } from "./components/buttons/CalendarButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { Home } from "./pages/Home";
import { TithesTablePage } from "./pages/TithesTablePage";
import { format } from "date-fns";
import { ExpensesTable } from "./pages/ExpensesTable";
import { FinancialSummary } from "./pages/FinancialSummary";
import { OtherEntriesTable } from "./pages/OthersEntriesTable";

function App() {
  const [showNavBar, setShowNavBar] = useState(true);

  return (
    <Fragment>
      <BrowserRouter>
        {showNavBar && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/tithesTable" element={<TithesTablePage />} />
          <Route path="/expensesTable" element={<ExpensesTable />} />
          <Route path="/summaryTable" element={<FinancialSummary />} />
          <Route path="/otherEntries" element={<OtherEntriesTable />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;


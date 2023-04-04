import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./styles.css";

export function Buttons() {

    const [dateRange, setDateRange] = useState('');

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
        const startDateParts = startDate.toLocaleDateString('pt-BR').split('/');
        const endDateParts = endDate.toLocaleDateString('pt-BR').split('/');
      
        const startDateFormatted = `${startDateParts[1].padStart(2, '0')}/${startDateParts[0].padStart(2, '0')}/${startDateParts[2]}`;
        const endDateFormatted = `${endDateParts[1].padStart(2, '0')}/${endDateParts[0].padStart(2, '0')}/${endDateParts[2]}`;
      
        setDateRange(`${startDateFormatted} - ${endDateFormatted}`);
      }, []);



  return (
    <div className="btn-date">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {dateRange}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Hoje</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Esta semana</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Este mês</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Escolha o período</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

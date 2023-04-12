import { CalendarIcon } from "@chakra-ui/icons";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import "./styles.css";

export function CalendarButton({ onStartDate, onEndDate }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateRange, setDateRange] = useState("");

  const handleToggleCalendar = () => setShowCalendar(!showCalendar);
  const handleCloseCalendar = () => setShowCalendar(false);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    setDateRange(
      `${moment(startDate).format("DD/MM/YYYY")} - ${moment(endDate).format(
        "DD/MM/YYYY"
      )}`
    );
  }, []);

  return (
    <div className="drop-container-all">
      <Dropdown>
        <Dropdown.Toggle className="drop-date">
          {dateRange}
          <CalendarIcon className="calendar-icon" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleToggleCalendar}>
            {" "}
            Período personalizado
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showCalendar && (
        <div className="calendar-container">
          <Form className="form-inline">
            <Form.Group className="form-group">
              <Form.Label>Data Inicial </Form.Label>
              <Form.Control type="date" name="dataInicial" />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Data Final </Form.Label>
              <Form.Control type="date" name="dataFinal" />
            </Form.Group>
            <div className="footer-group">
              <Button variant="danger" onClick={handleCloseCalendar}>
                {" "}
                Cancelar
              </Button>
              <Button variant="success" onClick={console.log("botão clicado!")}>
                {" "}
                Aplicar{" "}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

import { CalendarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import "./styles.css";

export function CalendarButton() {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleToggleCalendar = () => setShowCalendar(!showCalendar);
  const handleCloseCalendar = () => setShowCalendar(false);

  return (
    <div className="drop-container-all">
      <Dropdown>
        <Dropdown.Toggle className="drop-date">
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
           
              <Button variant="danger" onClick={handleCloseCalendar}> Cancelar</Button>
              <Button variant="success" onClick={console.log("filtro aplicado")}> Aplicar </Button>
             
            </div>
          </Form>
    
        </div>
        
      )}
    </div>
  );
}

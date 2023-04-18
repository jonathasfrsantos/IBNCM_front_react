import { CalendarIcon } from "@chakra-ui/icons";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import "./styles.css";

export function CalendarButton({onStartDate, onEndDate}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  const handleToggleCalendar = () => setShowCalendar(!showCalendar);
  const handleCloseCalendar = () => setShowCalendar(false);


  const onDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onStartDate(startDate);
    onEndDate(endDate);
  }

  const handleApplyDateRange = () => {
    const dataInicial = document.getElementsByName("dataInicial")[0].value;
    const dataFinal = document.getElementsByName("dataFinal")[0].value;
     let newStartDate = new Date(dataInicial + "T12:00:00");
     let newEndDate = new Date(dataFinal + "T12:00:00");
     setStartDate(newStartDate);
     setEndDate(newEndDate);
     onDateChange(newStartDate, newEndDate);  
     handleCloseCalendar();
  };


  useEffect(() => {
    if (startDate && endDate) {
      const showStartDate = moment(startDate).format("DD/MM/YYYY");
      const showEndDate = moment(endDate).format("DD/MM/YYYY");
      setDateRange(`${showStartDate} - ${showEndDate}`);
    } else {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setDateRange(
        `${moment(startDate).format("DD/MM/YYYY")} - ${moment(endDate).format(
          "DD/MM/YYYY")}`

      )
    }
  }, [startDate, endDate]);





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
              <Form.Control type="date" name="dataInicial" placeholder="DD/MM/YYYY" pattern="\d{2}/\d{2}/\d{4}" />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Data Final </Form.Label>
              <Form.Control type="date" name="dataFinal" placeholder="DD/MM/YYYY" pattern="\d{2}/\d{2}/\d{4}"  />
            </Form.Group>
            <div className="footer-group">
              <Button variant="danger" onClick={handleCloseCalendar}>
                {" "}
                Cancelar
              </Button>
              <Button variant="success" onClick={handleApplyDateRange}>
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

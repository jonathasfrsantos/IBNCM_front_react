import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./styles.css";
import moment from "moment/moment";
import { CalendarIcon } from "@chakra-ui/icons";
import { Modal } from "react-bootstrap";

export function Buttons() {
  const [dateRange, setDateRange] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleShow = () => {
    setShowDatePicker(true);
  };

  const handleClose = () => {
    setShowDatePicker(false);
  };

  const handlePeriodSubmit = (e) => {
    e.preventDefault();
    setDateRange(`${moment(startDate).format("DD/MM/YYYY")} - ${moment(endDate).format("DD/MM/YYYY")}`);
    setShowDatePicker(false);
  }

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
    <div className="btn-date">
      <Dropdown className="drop-container-all">
        <Dropdown.Toggle className="drop-date" id="dropdown-basic">
          {dateRange}
          <CalendarIcon className="calendar-icon" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Hoje</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Esta semana</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Este mês</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3" onClick={handleShow}>
            Escolha o período
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={showDatePicker} onHide={handleClose}>
        <form onSubmit={handlePeriodSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Escolha o período</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="date-picker-container">
              <label>Data inicial</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>Data final</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button variant="primary" type="submit">
              Confirmar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

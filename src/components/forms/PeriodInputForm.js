import { Modal } from "react-bootstrap";
import "./styles.css";


import React, { useState } from 'react';

export function PeriodInputForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // aqui você pode fazer as ações necessárias com as datas selecionadas
  }

  return (
    <div className="date-input-container">
      <form onSubmit={handleSubmit}>
        <label>Data inicial</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Data final</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

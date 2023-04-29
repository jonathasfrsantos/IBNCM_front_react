import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";
import "./tithesStyles.css";

import { BsFillPrinterFill, HiArrowLeft} from 'react-icons/bs';;

export function TithesTable() {
  const [tithesEntries, setTithesEntries] = useState([]);

  useEffect(() => {
    async function fetchTithes() {
      const response = await api.getAllTithes();
      setTithesEntries(response);
    }

    fetchTithes();
  }, []);

  return (
    <div>
      {Array.isArray(tithesEntries) && tithesEntries.length > 0 ? (
        <div className="general-container">
          <div className="icons-container">
            <BsFillPrinterFill/>
            <BsFillPrinterFill/>
            <BsFillPrinterFill/>

          </div>

          <h1> Dízimos </h1>
          <p> dd/MM/YYYY a dd/MM/YYYY</p>
          <Table striped bordered hover>

            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Dizimista </th>
                <th>Valor R$</th>
              </tr>
            </thead>
            <tbody>
              {tithesEntries.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{moment(item.data).format("DD/MM/YYYY")}</td>
                    <td>{item.historico}</td>
                    <td>{item.entrada}</td>
                  </tr>
                );
              })}
            </tbody>

          </Table>
        </div>
      ) : (
        <p> Não há dados para serem exibidos</p>
      )}
    </div>
  );
}

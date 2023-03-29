import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";

export function TithesTable() {
  const [tithesEntries, setTithesEntries] = useState([]);

  useEffect(() => {
    async function fetchTithes() {
      const response = await api.getTithes();
      setTithesEntries(response);
    }

    fetchTithes();
  }, []);

  return (
    <Fragment>
      {Array.isArray(tithesEntries) && tithesEntries.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Descrição </th>
              <th>Valor R$</th>
            </tr>
          </thead>
          <tbody>
            {tithesEntries.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(item.data).format("DD/MM/YYYY")}</td>
                  <td>{item.descricao}</td>
                  <td>{item.valor}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p> Não há dados para serem exibidos</p>
      )}
    </Fragment>
  );
}

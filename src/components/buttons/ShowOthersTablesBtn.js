import { Fragment } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

export function ShowOthersTableBtn() {
  return (
    <Fragment>
      <div className="buttons-container">
        <Button variant="success">Dízimos</Button>
        <Button variant="danger"> Saídas</Button>
        <Button variant="secondary"> Mov.Finaceiro</Button>
        <Button variant="primary"> Outras Entradas</Button>
      </div>
      
  </Fragment>
    
  );
}

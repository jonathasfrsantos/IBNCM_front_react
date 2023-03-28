import { Fragment, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";

export function MainForm({
  onTransactionAdded,
  onTransactionUpdated,
  show,
  close,
  selectedTransaction,
}) {
  const [transaction, setTransaction] = useState({
    // estado inicial de um objeto "product"
    data: "",
    valor: 0.0,
    entrada: 0.0,
    saida: 0.0,
    historico: "",
    finalidade: "",
    bancoCaixa: "",
  });

  const [transactionType, setTransactionType] = useState("entrada");


  useEffect(() => {
    if (selectedTransaction) {
      if (selectedTransaction.saida !== 0) {
        setTransactionType("saida");
        setTransaction(prevTransaction => ({
          ...prevTransaction,
          data: selectedTransaction.data,
          valor: selectedTransaction.saida,
          entrada: 0.0,
          saida: selectedTransaction.saida,
          historico: selectedTransaction.historico,
          finalidade: selectedTransaction.finalidade,
          bancoCaixa: selectedTransaction.bancoCaixa
        }));
      } else if (selectedTransaction.entrada !== 0) {
        setTransactionType("entrada");
        setTransaction(prevTransaction => ({
          ...prevTransaction,
          data: selectedTransaction.data,
          valor: selectedTransaction.entrada,
          entrada: selectedTransaction.entrada,
          saida: 0.0,
          historico: selectedTransaction.historico,
          finalidade: selectedTransaction.finalidade,
          bancoCaixa: selectedTransaction.bancoCaixa
        }));
      } else {
        setTransaction({
          data: "",
          valor: 0.0,
          entrada: 0.0,
          saida: 0.0,
          historico: "",
          finalidade: "",
          bancoCaixa: "",
        });
      }
  
    }
  }, [selectedTransaction]);

  
  


  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value }); // handleChange é usado para acompanhar os estados que o usuário está digitando no input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedTransaction) {
      if (transactionType === "entrada") {
        transaction.entrada = transaction.valor;
        transaction.saida = 0.0;
      } else {
        transaction.saida = transaction.valor;
        transaction.entrada = 0.0;
      }
      const updatedTransaction = await api.update(selectedTransaction.id, transaction);
      onTransactionUpdated(updatedTransaction);
      close();
    } else {
      if (transactionType === "entrada") {
        transaction.entrada = transaction.valor;
        transaction.saida = 0.0;
      } else {
        transaction.saida = transaction.valor;
        transaction.entrada = 0.0;
      }
      const addedTransaction = await api.create(transaction);
      onTransactionAdded(addedTransaction);
    }
  
    setTransaction({
      data: "",
      valor: 0.0,
      entrada:0.0,
      saida:0.0,
      historico: "",
      finalidade: "",
      bancoCaixa: "",
    });
  };
  




 
  return (
    <Fragment>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title> Novo Lançamento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formGroupTipoMovimento">
            <Form.Label>ESCOLHA ENTRE ENTRADA OU SAÍDA</Form.Label>
            <div>
              <Form.Check
                inline
                label="Entrada"
                type="radio"
                name="tipoMovimento"
                value="entrada"
                checked={transactionType === "entrada"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <Form.Check
                inline
                label="Saída"
                type="radio"
                name="tipoMovimento"
                value="saida"
                checked={transactionType === "saida"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label> Data </Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={transaction.data}
                onChange={handleChange}
              />
              <Form.Label> Valor R$ </Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={transaction.valor}
                onChange={handleChange}
              />

              <Form.Label> Histórico </Form.Label>
              <Form.Control
                type="text"
                name="historico"
                value={transaction.historico}
                onChange={handleChange}
              />

              <Form.Label> Finalidade </Form.Label>
              <Form.Control
                type="text"
                name="finalidade"
                value={transaction.finalidade}
                onChange={handleChange}
              />

              <Form.Label> Banco/Caixa </Form.Label>
              <Form.Control
                type="text"
                name="bancoCaixa"
                value={transaction.bancoCaixa}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

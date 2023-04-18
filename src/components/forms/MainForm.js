import { Fragment, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";
import ClearForm from "../../utils/ClearForm";

import "./styles.css";

export function MainForm({
  onTransactionAdded,
  onTransactionUpdated,
  show,
  close,
  selectedTransaction,
  title,
}) {
  const [transaction, setTransaction] = useState({
    data: "",
    valor: 0.0,
    entrada: 0.0,
    saida: 0.0,
    historico: "",
    finalidade: "",
    bancoCaixa: "",
  });

  const [transactionType, setTransactionType] = useState("entrada");
  const [error, setError] = useState("");
  const requiredFields = [
    "data",
    "valor",
    "historico",
    "finalidade",
    "bancoCaixa",
  ];

  const validateFields = () => {
    for (let field of requiredFields) {
      if (!transaction[field]) {
        setError(`O campo ${field} é obrigatório.`);
        return false;
      }
    }
    return true;
  };

  const colorClass = transactionType === "entrada" ? "green-text" : "red-text";


  useEffect(() => {
    if (selectedTransaction) {
      const { entrada, saida, ...transactionData } = selectedTransaction;
      setTransactionType(entrada !== 0 ? "entrada" : "saida");
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        ...transactionData,
        valor: entrada || saida,
        entrada: entrada || 0.0,
        saida: saida || 0.0,
      }));
    } else {
      ClearForm(setTransaction);
    }
  }, [selectedTransaction]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value }); // handleChange é usado para acompanhar os estados que o usuário está digitando no input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    let addedTransaction;

    if (selectedTransaction) {
      if (transactionType === "entrada") {
        transaction.entrada = transaction.valor;
        transaction.saida = 0.0;
      } else {
        transaction.saida = transaction.valor;
        transaction.entrada = 0.0;
      }
      const updatedTransaction = await api.update(
        selectedTransaction.id,
        transaction
      );
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
      addedTransaction = await api.create(transaction);
      onTransactionAdded(addedTransaction);
    }

    ClearForm(setTransaction);
    setError("");
  };

  return (
    <Fragment>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title"> {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-container">
          <Form.Group className="radio-select-container">
            <div className="radio-select-title">
              <Form.Label className>ESCOLHA ENTRE ENTRADA OU SAÍDA</Form.Label>
            </div>
            <div className="radio-select">
              <Form.Check
                inline
                label="Entrada"
                type="radio"
                name="tipoMovimento"
                value="entrada"
                checked={transactionType === "entrada"}
                onChange={(e) => setTransactionType(e.target.value)}
                disabled={!!selectedTransaction}
              />
              <Form.Check
                inline
                label="Saída"
                type="radio"
                name="tipoMovimento"
                value="saida"
                checked={transactionType === "saida"}
                onChange={(e) => setTransactionType(e.target.value)}
                disabled={!!selectedTransaction}
              />
            </div>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-container">
              <Form.Label> Data </Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={transaction.data}
                onChange={handleChange}
              />
              <Form.Label className={`${colorClass}`}> Valor R$ </Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={transaction.valor}
                onChange={handleChange}
                className={`${colorClass}`}
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
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Salvar
              </Button>
              <Button
                variant="danger"
                onClick={() => ClearForm(setTransaction)}
              >
                Limpar
              </Button>
            </Modal.Footer>
            {error && <div className="error-message">{error}</div>}
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

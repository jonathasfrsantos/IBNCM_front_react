import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment/moment";
import {  useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";
import { MainForm } from "../forms/MainForm";
import "./styles.css";

export function MainTable() {
  const [transactions, setTransactions] = useState([]); // state inicial para o objeto "product"
  const [showForm, setShowForm] = useState(false); // state para controlar a abertura e fechamento do modal/form
  const [selectedTransaction, setSelectedTransaction] = useState({}); // state para recuperar o item selecionado da tabela

  const [title, setTitle] = useState("Novo Lançamento");

  const handleEdit = (transaction) => {
    // handle que "seta" o state do produto selecionado
    setSelectedTransaction(transaction);
    setShowForm(true);
    setTitle("Editar lançamento");

    console.log(transaction);
  };

  const handleClose = () => {
    // fecha o modal
    setShowForm(false);
  };
  const handleShowForm = () => {
    // exibie o modal
    setShowForm(true);
  };

  const handleTransactionAdded = (addedTransaction) => {
    // handle que "seta" o state do produto criado
    setTransactions((prevProducts) => [...prevProducts, addedTransaction]);
  };

  const handleTransactionUpdated = (updatedTransaction) => {
    // handle que "seta" o state do produto atualizado
    setTransactions((prevTransaction) =>
      prevTransaction.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    console.log(updatedTransaction);
  };

  useEffect(() => {
    // hook para não copiar os dados do último formulário aberto na hora de inserir um novo registro
    if (!showForm) {
      setSelectedTransaction(null);
      setTitle("Novo Lançamento");
    }
  }, [showForm]);

  useEffect(() => {
    // hook que lista os itens do BD na tabela
    async function fetchProducts() {
      const response = await api.getAll();
      setTransactions(response);
    }

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    // handle delete
    if (window.confirm("Tem certeza que deseja excluir esse lançamento?")) {
      api.delete(id).then(() => {
        setTransactions(transactions.filter((product) => product.id !== id));
      });
    }
  };

  // observe os props que são passados do componente mainForm e que são chamados no MainTable
  return (
    <div>
      
      <div className="btn-add-container">
        <Button className="btn-add-transaciton" onClick={handleShowForm}> + Novo lançamento</Button>
      </div>
      <MainForm
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionAdded={handleTransactionAdded}
        show={showForm}
        close={handleClose}
        selectedTransaction={selectedTransaction}
        title={title}
      />
      <div className="table-container">
      <h1> IGREJA EVANGÉLICA DO LUGAL TAL</h1>
      <p> Movimento de caixa</p>
      {Array.isArray(transactions) && transactions.length > 0 ? (
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>DATA</th>
              <th>ENTRADA R$</th>
              <th>SAÍDA R$</th>
              <th>HISTÓRICO</th>
              <th>FINALIDADE</th>
              <th>BANCO/CAIXA</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(item.data).format("DD/MM/YYYY")}</td>
                  <td>{item.entrada}</td>
                  <td>{item.saida}</td>
                  <td>{item.historico.toUpperCase()}</td>
                  <td>{item.finalidade.toUpperCase()}</td>
                  <td>{item.bancoCaixa.toUpperCase()}</td>
                  <td>
                    {" "}
                    <button onClick={() => handleEdit(item)}>
                      {" "}
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button onClick={() => handleDelete(item.id)}>
                      {" "}
                      <DeleteIcon color="red.500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
      </Table>
      ) : (
        <p> Não há dados para serem exibidos</p>
      )}
      </div>
    </div>
  );
}

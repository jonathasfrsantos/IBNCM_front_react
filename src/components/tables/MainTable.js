import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";
import { Buttons } from "../buttons/Buttons";
import { MainCards } from "../cards/MainCards";
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
    async function fetchTransactions() {
      const response = await api.getAll();
      setTransactions(response);
    }

    fetchTransactions();
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
    <div className="all-container">
      <Buttons />
      <div className="btn-container">
        <Button
          className="btn-add-transaciton"
          variant="success"
          onClick={handleShowForm}
        >
          {" "}
          + Novo lançamento
        </Button>
        <Button className="btn-export-excel" onClick={console.log("click")}>
          {" "}
          exportar{" "}
        </Button>
        <Button className="btn-print" onClick={console.log("click")}>
          {" "}
          imprimir{" "}
        </Button>
        <Button className="btn-show" onClick={console.log("click")}>
          {" "}
          exibir{" "}
        </Button>
        <div className="search-container">
          <input type="text" placeholder="Pesquisar..." />
          <SearchIcon className="search-icon" />
        </div>
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
        <MainCards />

        {Array.isArray(transactions) && transactions.length > 0 ? (
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>DATA</th>
                <th>ENTRADA R$</th>
                <th>SAÍDA R$</th>
                <th>HISTÓRICO</th>
                <th>FINALIDADE</th>
                <th>BANCO/CAIXA</th>
                <th>AÇÕES</th>
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
                    <td>{item.historico}</td>
                    <td>{item.finalidade}</td>
                    <td>{item.bancoCaixa}</td>
                    <td>
                      {" "}
                      <button onClick={() => handleEdit(item)}>
                        {" "}
                        <EditIcon className="edit-icon" />
                      </button>{" "}
                      <button onClick={() => handleDelete(item.id)}>
                        {" "}
                        <DeleteIcon className="delete-icon" color="red.500" />
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

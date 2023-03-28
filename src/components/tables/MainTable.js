import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment/moment";
import { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { api } from "../../services/lancamentosService/api";
import { MainForm } from "../forms/MainForm";
import { Loading } from "../loading/Loading";

export function MainTable() {
  const [transactions, setTransactions] = useState([]); // state inicial para o objeto "product"
  const [showForm, setShowForm] = useState(false); // state para controlar a abertura e fechamento do modal/form
  const [selectedTransaction, setSelectedTransaction] = useState({}); // state para recuperar o item selecionado da tabela
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Novo Lançamento")

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
    <Fragment>
      <Loading loading={loading} />
      <Button onClick={handleShowForm}>Novo lançamento</Button>
      <MainForm
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionAdded={handleTransactionAdded}
        show={showForm}
        close={handleClose}
        selectedTransaction={selectedTransaction}
        title={title}
      />
      {Array.isArray(transactions) && transactions.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Entrada R$</th>
              <th>Saída R$</th>
              <th>Histórico</th>
              <th>Finalidade</th>
              <th>Banco/Caixa</th>
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
    </Fragment>
  );
}

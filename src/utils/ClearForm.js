function ClearForm(setTransaction) {
  setTransaction((prevTransaction) => ({
    ...prevTransaction,
    valor: 0.0,
    entrada: 0.0,
    saida: 0.0,
    historico: "",
    finalidade: "",
    bancoCaixa: "",
  }));
}

export default ClearForm;  



function ClearForm(setTransaction) {
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
export default ClearForm;  


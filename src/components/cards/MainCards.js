
import { useEffect, useState } from "react";
import { api } from "../../services/lancamentosService/api";
import "./styles.css";

export function MainCards() {

    const [totalEntradas, setTotalEntradas] = useState(0.0);
    const [totalSaidas, setTotalSaidas] = useState(0.0);
    const [saldoAtual, setSaldoAtual] = useState(0.0);



// depois transferir a responsabilidade de verificar se a tabela é nula ou não para o back end, pois isto está sendo feito no front-end
useEffect(() => {
    async function fecthTotais(){
        const responseEntradas = await api.getEntradas();
        const responseSaida = await api.getSaidas();
       if(!responseEntradas || responseEntradas.length === 0){
            return setTotalEntradas(0.0);
       }else {
        setTotalEntradas(responseEntradas);
       }

       if(!responseSaida || responseSaida.length === 0){
        return setTotalSaidas(0.0);
       } else {
        setTotalSaidas(responseSaida);
       }

       const saldoFinal = totalEntradas - totalSaidas;
       setSaldoAtual(saldoFinal);
      
    }

 
    fecthTotais();
    })
    

    
//
return (
        <div className="cards-container">
            <div className="card-entrada">
                <h1>Total entradas R$</h1>
                <p> {totalEntradas.toFixed(2)}</p>
    
            </div>
            <div className="card-saida">
                <h1>Total saídas R$</h1>
                <p>{totalSaidas.toFixed(2)}</p>

            </div>
            <div className="card-saldo-anterior">
                <h1>Saldo anterior R$</h1>
                <p> 1000.00</p>
            </div>
            <div className="card-saldo-atual">
                <h1>Saldo atual R$</h1>
                <p> {saldoAtual} </p>
            </div>
        </div>

    
)
}
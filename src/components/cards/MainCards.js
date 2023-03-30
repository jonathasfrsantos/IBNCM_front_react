import { Card } from "react-bootstrap";
import "./styles.css";

export function MainCard() {

return (
    <div >
        <Card className="cards-container" >
            <Card.Body variant="sucess" className="card-entrada">
                <Card.Title> TOTAL ENTRADAS R$ </Card.Title>
                <Card.Text> 10.000,00 </Card.Text>
            </Card.Body>
            <Card.Body variant="danger" className="card-saida">
                <Card.Title> TOTAL SAÍDAS R$ </Card.Title>
                <Card.Text> 10.000,00 </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title> SALDO ANTERIOR R$ </Card.Title>
                <Card.Text> 10.000,00 </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title> SALDO ATUAL R$ </Card.Title>
                <Card.Text> 10.000,00 </Card.Text>
            </Card.Body>
        </Card>

    </div>
)
}
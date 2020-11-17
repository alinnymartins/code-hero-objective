import { Component } from 'react';
import { Link } from 'react-router-dom';

class Erro extends Component{
    render() {
        return(
            <div>
                <h3>Ops! A página que você está procurando não existe.</h3>
                <Link to="/">Clique aqui para voltar para a Home</Link>
            </div>
        )
    }
}

export default Erro;
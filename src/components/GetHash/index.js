import { Component } from 'react';
import {calcMD5} from '../Md5Encrypt';

class GetHour extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            chave: ''
        };
     }
//Gerando acesso a API

componentDidMount() {
    this.setState({data: ''+ new Date().getDay() + new Date().getHours() + 
    new Date().getMinutes() + new Date().getSeconds() +
    new Date().getMilliseconds(),

    chave: '0ace85cefb3545bd271c244e52c880828be703d1e82af304dc3ec43785e87c522aa2b7b7'

});
}

    render() {
        const apikey = 'e82af304dc3ec43785e87c522aa2b7b7';
        const hashI = '' + this.state.data + this.state.chave;
        const hash = calcMD5(hashI);
        const marvel = 'http://gateway.marvel.com/v1/public/characters?';
        const hashFinal = `${marvel}ts=${this.state.data}&apikey=${apikey}&hash=${hash}`;
        return(
            <>
            {hashFinal}
            </>
        );
    }
}

export default GetHour;
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import './style.css';
import search from '../../images/search.png';

let timer;

function timeout(callback, ms = 1000) {
  clearTimeout(timer);
  timer = setTimeout(callback, ms);
}

// HOME FEITA EM CLASS COMPONENT

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        characters: [],
        search: null,
        searchClick: false,
        searchValue: '',
        finalPagination: 1,
        verifyCurrentPage: 0
      };
    }
  
    componentDidMount() {
      this.loadCharacters();
    }
  
    loadCharacters = (props) => {

        if( this.state.search !== null) {
            console.log('entrou no search')
        const searchName = `name=${this.state.search}&`;
        let url = `http://gateway.marvel.com/v1/public/characters?${
            this.state.search ? searchName : ""
        }offset=0&limit=100&ts=3164618450&apikey=e82af304dc3ec43785e87c522aa2b7b7&hash=88d05abbddffc92d5483e6d4c60c5b8b`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
            this.setState({ characters: json.data.results });
            });
        }
        else if (props === true) {
            const oldCharacters = this.state.characters;
            const currentPage = this.state.verifyCurrentPage;
            let url = `http://gateway.marvel.com/v1/public/characters?offset=${
            (currentPage + 1) * 100
            }&limit=100&ts=3164618450&apikey=e82af304dc3ec43785e87c522aa2b7b7&hash=88d05abbddffc92d5483e6d4c60c5b8b`;
            fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                characters: [...oldCharacters, ...json.data.results],
                verifyCurrentPage: this.state.verifyCurrentPage + 1
                });
            });
        } else {
            let url = `http://gateway.marvel.com/v1/public/characters?offset=0&limit=100&ts=3164618450&apikey=e82af304dc3ec43785e87c522aa2b7b7&hash=88d05abbddffc92d5483e6d4c60c5b8b`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
            this.setState({ characters: json.data.results });
            });
        }
    };
  
    searchSpace = (event) => {
      let keyword = event.target.value;
      this.setState({ search: keyword });
    };
    clickSearch = () => {
        this.setState({ searchClick: true });
        this.loadCharacters();
    }
    backHome = () => {
        this.setState({ 
            search: null,
            searchClick: false 
         });
        timeout(() => {
            this.loadCharacters();
        })
    }
  
  
    renderNewPagination = () => {
        timeout(() => {
            this.loadCharacters(true);
            this.setState({ finalPagination: this.state.finalPagination + 7 })
          })
    };
  
    render() {
      return this.state.characters.length === 0 ? (
        "Carregando"
      ) : (
        <div className="main">
          <div className="container">
            <h1 className="title">Busca de personagens</h1>
            <h2 className="subTitle">Nome do personagem</h2>
            <div className="search">
              <input
                type="text"
                placeholder="Pesquisar"
                className="searchInput"
                onChange={(e) => this.searchSpace(e)}
                value={this.state.search ? this.state.search : this.state.searchValue}
              />
              <div className="buttonSearchContainer">
                <button
                  onClick={(e) => this.clickSearch()}
                  className="buttonSearch"
                >
                  <img src={search} alt="Buscar" title="Buscar" width="17" />
                </button>
              </div>
            </div>
            {this.state.searchClick === true ?
            <>
                <buttom className="backHome" onClick={() => this.backHome()}> &#8678; Voltar para Home</buttom>
                <div className="searchResult">
                    Resultados da Pesquisa:
                </div>
            </>
             : ''}
            <div className="characterContent">
              <h4 className="characterContentText persons">Personagem</h4>
              <h4 className="characterContentText series">Séries</h4>
              <h4 className="characterContentText events">Eventos</h4>
            </div>
            </div>
            <div className="characterContentBox">
              <Pagination
                data={this.state.characters}
                dataOffset={10}
                controlsOffset={5}
                render={(data, index, array, verifyCurrentPage) => {
                  const isLastPage = verifyCurrentPage(
                    this.state.finalPagination
                  );
                  const isLastItem = index === array.length - 1;
  
                  return (
                    <div className="characterItems" key={index}>
                      {isLastPage && isLastItem ? this.renderNewPagination() : ""}
                        <Link to={`/personagem/${data.id}`}>
                            <article className="characterItemsBox">
                                <div className="characterContentCol imageAndName">
                                <div className="characterContentBoxCol">
                                    <div className="characterImg">
                                    <img
                                        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                                        alt={data.name}
                                        width="50"
                                    />
                                    </div>
                                </div>
                                <div className="characterContentBoxCol name">
                                    <p className="characterTextName">{data.name}</p>
                                </div>
                                </div>
                                <div className="characterContentCol series">
                                <div className="characterContentBoxCol">
                                    {data.series.items
                                    .filter(function (el, index) {
                                        return index <= 2;
                                    })
                                    .map((item, index2) => {
                                        return (
                                        <p key={index2} className="characterText">
                                            {item.name}
                                        </p>
                                        );
                                    })}
                                </div>
                                </div>
                                <div className="characterContentCol events">
                                {data.events.items
                                    .filter(function (el, index) {
                                    return index <= 2;
                                    })
                                    .map((item, index3) => {
                                    return (
                                        <p key={index3} className="characterText">
                                        {item.name}
                                        </p>
                                    );
                                    })}
                                </div>
                            </article>
                        </Link>
                    </div>
                  );
                }}
              />
            </div>
        </div>
      );
    }
  }
  
  export default Home;  
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';

// PAGINA PERSONAGEM FEITA EM HOOKS

export default function Personagem() {

    const [characters, setCharacters] = useState([]);
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        let url = `http://gateway.marvel.com/v1/public/characters/${id}?&ts=3164618450&apikey=e82af304dc3ec43785e87c522aa2b7b7&hash=88d05abbddffc92d5483e6d4c60c5b8b`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setCharacters(json.data.results);
            });
    }, [id]);

    return (
        <div className="mainCharacters">
            <div className="back"><Link to="/">&#8678; Voltar para Home</Link></div>
            <h1 className="titleContainer">Detalhes do Personagem</h1> 
            {characters?.map((item) => {
                return (
                    <>
                        <div className="charactersContainer">
                            <div className="charactersContainerGrid">
                                <div className="imageCharacter">
                                    <img
                                        src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                        alt={item.name}
                                        height="400"
                                    />
                                </div>
                            </div>
                            <div className="charactersContainerGrid gridDetails">
                                <div className="characterName">Personagem: {item.name}</div>
                                <hr />
                                <div className="characterDescription">{item.description}</div>
                                <div className="charactersInfo">
                                    <div className="characterSeries">
                                        <h3>Séries</h3>
                                        {item.series.items.map((item, index2) => {
                                            return (
                                            <p key={index2} className="characterTexts">&#8902; 
                                                {item.name}
                                            </p>
                                            );
                                        })}
                                    </div>
                                    <div className="characterEvents">
                                        <h3>Eventos</h3>
                                        {item.events.items.map((item, index2) => {
                                            return (
                                            <p key={index2} className="characterTexts">&#8902; 
                                                {item.name}
                                            </p>
                                            );
                                        })}
                                    </div>
                                </div>            
                            </div>
                        </div>
                        
                    </>
                )
            })}
        </div>
    )
}
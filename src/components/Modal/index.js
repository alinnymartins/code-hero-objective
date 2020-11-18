import { useState, useEffect } from 'react';
import './style.css';
export default function Modal(props) {

    const [charactersModal, setCharactersModal] = useState([]);

    useEffect(() => {
        if (!props.id) return
        let url = `http://gateway.marvel.com/v1/public/characters/${props.id}?&ts=3164618450&apikey=e82af304dc3ec43785e87c522aa2b7b7&hash=88d05abbddffc92d5483e6d4c60c5b8b`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setCharactersModal(json.data.results);
            });
    }, [props.id]);

    return (
        <div>
            <div id="openModal" className="modalDialog">
                <div><a href="#close" title="Fechar" className="close">X</a>
                    <div className="mainCharacters">
                        <h1 className="titleContainer">Detalhes do Personagem</h1> 
                        {charactersModal?.map((item) => {
                            return (
                                <>
                                    <div className="charactersContainer">
                                            <div className="imageCharacter">
                                                <img
                                                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                                    alt={item.name}
                                                    height="400"
                                                />
                                            </div>
                                        <div className="textsDisplay">
                                            <div className="characterName">Personagem: {item.name}</div>
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
                </div>
            </div>   
        </div>
    )
}

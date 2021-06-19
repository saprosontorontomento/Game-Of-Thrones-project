/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage/';
import GotService from '../../services/gotService';

function RandomChar() {

    const [char, setChar] = useState({}),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(false);

    useEffect(() => {
        updateChar();

        const timerId = setInterval(updateChar, 4000);
        
        return () => {
            clearInterval(timerId);
        }
    }, [])

    const gotService = new GotService();

    const updateChar = () => {
        // const id = 1300000 // тест ошибки
        const id = Math.floor(Math.random() * 140 + 25); // диапазон 25-140
        gotService.getCharacter(id) // эта конструкция возвращает нам промис
            .then((data) => {
                setChar(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }


    const errorMessage = error ? <ErrorMessage/>  : null;
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
export default RandomChar;
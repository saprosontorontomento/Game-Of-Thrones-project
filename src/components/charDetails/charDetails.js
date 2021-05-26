import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>  
        </li> // Не можем вытащить item. Время того, как мы создаем поля, наш charDetails не знает что ему нужно отобразить
    )
}

export {
    Field
}

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) { // предыдущие пропсы которые использовались в компоненте
        if (this.props.charId !== prevProps.charId) { // всегда делаем эту проверку иначе бесконечный цикл
            this.updateChar();
        }
    }
    
    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
    
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })

        // this.foo.bar = 0; // test error
    }


    render() {

        if (!this.state.char) {
            return <span className='secet-error'>Please select a character</span>
        }

        const {char} = this.state;
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => { // как child может прийти что угодно
                            return React.cloneElement(child, {char})
                        })
                    } 
                </ul>
            </div>
        );
    }
}
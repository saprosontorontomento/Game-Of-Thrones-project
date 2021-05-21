import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import gotService from '../../services/gotService';


export default class ItemList extends Component {

    gotService = new gotService();

    state = { // в этом состоянии будем хранить список наших персонажей
        itemList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
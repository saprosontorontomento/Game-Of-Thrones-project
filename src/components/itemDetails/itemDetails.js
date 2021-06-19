import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './itemDetails.css';


const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
};

let itemIdLast;
function ItemDetails({itemId, getData, children}) {
   
 const [item, setItem] = useState([]);
 const [loading, setLoad] = useState(true);
 const [error, setError] = useState(false);
 
    useEffect(()=>{
        
        if(itemId !==itemIdLast) {
          
            if(!itemId){
                return;
            }
 
            getData(itemId) 
                .then((data)=>{
                    setItem(data);
                    setLoad(false);
                    setError(false);
                })   
                .catch(onError)
            return () => { itemIdLast = itemId;}
        } 
    })
   
   
    function onError() {
        console.log('error load')
        setLoad(false);
        setError(true);
    }
 
    if(!itemId){
        return <span className = "select-error">Please select a item</span>
    }
   
   const {name} = item; 
   const spinner = loading ? <Spinner/>: null;
   const errorMessage = error ? <ErrorMessage/>: null;
    return (
        <div>
            <h4>{name}</h4>
            <ul>
                {errorMessage}
                {spinner}
                {
                    React.Children.map(children,(child)=>{
                       return React.cloneElement(child,{item})
                    })
                  
                }
            </ul>
        </div>
    );
} 
export default ItemDetails;
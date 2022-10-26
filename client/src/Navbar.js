import React from 'react'

function Navbar(props) {




    return (
        <table className='Navbar'>
        <tbody><tr>
        <th  onClick={props.getProducts}>All Products</th>
         <th  onClick={props.getTradingCards}>Trading Cards</th>
         <th  onClick={props.getFigures}>Figures</th>
         <th  onClick={props.getPlushies}>Plushies</th>
         <th  onClick={props.getVideoGames}>Video Games</th>
         <th  onClick={props.getConsoles}>Consoles</th>
        </tr></tbody>
        </table>
    )
}

export default Navbar

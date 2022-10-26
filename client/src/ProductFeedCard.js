const ProductFeedCard = (props) => {
    return ( 
        <>
         <div className="product" >
              
              <div>
                <div className="cardFont">{props.val.product_name}</div>
                <div className="cardFont">Dept: {props.val.dept}</div>
                <div className="cardFont">Description: {props.val.product_description}</div>
                <img className="productImg" src={props.val.product_image} alt="product image"/>
                <div className="cardFont">Price: ${props.val.product_price}</div>
              </div>
            </div>
        </>
     );
}
 
export default ProductFeedCard;
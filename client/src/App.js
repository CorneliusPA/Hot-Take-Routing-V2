import { useState, useEffect } from "react";
import './App.css';
import './index.css';
import Axios from "axios";
import Logo from "./Logo";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import CreateProduct from "./CreateProduct";
import ProductFeedCard from "./ProductFeedCard";


function App() {

  
  const [product_name, setName] = useState("");
  const [dept, setDept] = useState(0);
  const [product_description, setDescription] = useState("");
  const [product_image, setImage] = useState("");
  const [product_price, setPrice] = useState(0);

  const [newPrice, setNewPrice] = useState(0);

  const [productList, setProductList] = useState([]);

  const addProduct = () => {
    Axios.post(`https://cornelius-portfolio.herokuapp.com/create`, {
      product_name,
      dept,
       product_description,
      product_image,
       product_price,
    }).then((response) => {
      setProductList([
        ...productList,
        {
          product_name,
           dept,
          product_description,
           product_image,
           product_price,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("https://cornelius-portfolio.herokuapp.com/products").then((response) => {
      setProductList(response.data);
    });
  }, []);

  const getProducts = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/products`).then((response) => {
      setProductList(response.data);
    });
  };

  const getTradingCards = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/trading_cards`).then((response) => {
      setProductList(response.data);
    });
  };

  const getFigures = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/figures`).then((response) => {
      setProductList(response.data);
    });
  };

  const getPlushies = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/plushies`).then((response) => {
      setProductList(response.data);
    });
  };

  const getVideoGames = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/video_games`).then((response) => {
      setProductList(response.data);
    });
  };

  const getConsoles = () => {
    Axios.get(`https://cornelius-portfolio.herokuapp.com/consoles`).then((response) => {
      setProductList(response.data);
    });
  };


  const updateProduct_Price = (id) => {
    Axios.put(`https://cornelius-portfolio.herokuapp.com/update`, { product_price: newPrice, id: id }).then(
      (response) => {
        setProductList(
          productList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  product_name: val.product_name,
                  product_description: val.product_description,
                  dept: val.dept,
                  product_image: val.product_image,
                  product_price: newPrice,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteProduct = (id) => {
    Axios.delete(`https://cornelius-portfolio.herokuapp.com/delete/${id}`).then((response) => {
      setProductList(
        productList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <>


     <h1 className="title App">Turbo Tiger Trades </h1>
       <Logo/>
       <Logo/>
   
    <div className="App">
    
   
  <div>
    <Navbar
    
           getProducts={getProducts}
           getTradingCards={getTradingCards}
           getFigures={getFigures}
           getPlushies={getPlushies}
           getVideoGames={getVideoGames}
           getConsoles={getConsoles}
    
    />
  </div>

         <div className="feed">

      <div className="products">
        
<div className="productGrid"> 
        {productList.map((val) => {
          return ( 
         
           <ProductFeedCard val={val} key={val.product_name}/>

          );
        })}
      </div>
      
      </div>
    
    </div> 

 </div>
   
    </>
)  
}

export default App;
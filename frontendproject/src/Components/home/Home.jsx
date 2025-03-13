import React, { useState } from 'react';
import '../home/homeCss.scss';

const foodItems = [
  { id: 1, name: 'Margherita Pizza', price: 12 },
  { id: 2, name: 'Cheeseburger', price: 10 },
  { id: 3, name: 'Caesar Salad', price: 8 },
  { id: 4, name: 'Pasta Alfredo', price: 14 },
  { id: 5, name: 'Pasta nudels', price: 18 },
  { id: 6, name: 'Pasta Alfredo', price: 16 },
  { id: 7, name: 'chees', price: 15 },
  { id: 8, name: 'Pasta ', price: 14 }

];

function Home() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const addToCart = (item) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart!");
      return;
    }
  
    setCart([...cart, item]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='food-menu-container'>
      <header className='food-menu-header bg-dark'>
        <h1>Food Menu</h1>
        <div className='d-flex justify-content-center gap-3'> 
          <input
          type='text'
          placeholder='Search food...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-bar p-1 '
        />

          <div className='header-icons'>
            <button className='cart-button' onClick={toggleModal}><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
          </div>
      </header>

      <div className='food-items-list'>
        {filteredFoodItems.map((item) => (
          <div key={item.id} className='food-item'>
            <h4>{item.name}</h4>
            <p className='fs-3'>${item.price}</p>
            <button onClick={() => addToCart(item)} >Add to Cart</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='cart-modal'>
          <div className='cart-content'>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price}</li>
                  ))}
                </ul>
                <h3>Subtotal: ${getSubtotal()}</h3>
              </>
            )}
            <button onClick={toggleModal} className=''>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

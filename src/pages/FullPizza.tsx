import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {   
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://6544d6275a0b4b04436d1080.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы...');
                navigate(`/`)
            }
        }
           
        fetchPizza();
    }, [])

    if (!pizza) {
        return 'Loading';
    }
    
    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} rub</h4>
        </div>
  );
}

export default FullPizza

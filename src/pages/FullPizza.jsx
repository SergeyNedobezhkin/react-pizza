import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6499a51979fbe9bcf83fb147.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error, "Ошибка при получении пиццы!");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} руб</h3>
    </>
  );
}

export default FullPizza;

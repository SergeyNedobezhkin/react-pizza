import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "../components/PizzaBlock/SkeletonLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    try {
      setIsLoading(true);
      async function axiosData() {
        const pizzasResponse = await axios.get(
          `https://3e507001f067fc57.mokky.ru/items?${
            categoryId > 0 ? `category=*${categoryId}` : ""
          }&sortBy=${sortType.sortProperty}`
        );
        setIsLoading(false);
        window.scrollTo(0, 0);
        return setPizzas(pizzasResponse.data);
      }
      axiosData();
    } catch (error) {
      console.error("Ошибка при запросе данных!");
      alert("Ошибка при запросе данных!");
    }
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            onChangeCategory={(index) => {
              setCategoryId(index);
            }}
          />
          <Sort
            value={sortType}
            setSortType={setSortType}
            onChangeSort={(index) => setSortType(index)}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </>
  );
}

export default Home;

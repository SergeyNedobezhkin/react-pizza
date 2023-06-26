import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";
import SkeletonLoader from "../components/PizzaBlock/SkeletonLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import { AppContext } from "../App";

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort);

  const { searchValue } = useContext(AppContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pizzasPerPage] = useState(4);
  // page=${currentPage}&limit=${pizzasPerPage}&

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=*${categoryId}` : "";
      const sortBy = sortType.sortProperty;
      const search = searchValue ? `&title=*${searchValue}*` : "";
      async function axiosData() {
        const pizzasResponse = await axios.get(
          `https://6499a51979fbe9bcf83fb147.mockapi.io/items?page=${currentPage}&limit=${pizzasPerPage}&${category}&sortBy=${sortBy}${search}`
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
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaList = pizzas.map((obj) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  const skeletons = [...new Array(6)].map((_, index) => (
    <SkeletonLoader key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onChangeCategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? skeletons : pizzaList}
        </div>
        <Pagination
          pizzasPerPage={pizzasPerPage}
          onPageChange={(number) => setCurrentPage(number)}
        />
      </div>
    </>
  );
}

export default Home;

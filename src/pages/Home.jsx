import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setCategoryId,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import SkeletonLoader from "../components/PizzaBlock/SkeletonLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sort = useSelector((state) => state.filterSlice.sort);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasPerPage] = useState(6);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    try {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}&` : "";
      const sortBy = sort.sortProperty;
      const search = searchValue ? `&title=${searchValue}` : "";

      async function axiosData() {
        const pizzasResponse = await axios.get(
          `https://6499a51979fbe9bcf83fb147.mockapi.io/items?page=${currentPage}&limit=${pizzasPerPage}&${category}sortBy=${sortBy}${search}`
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
  };
  useEffect(() => {
    //Изначально isMounted=false, но если был первый рендер, то тогда  isMounted=true и добавь URL-параметры в строку URL.
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    //Если первый рендер завершился, то тогда измени на true
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

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
          currentPage={currentPage}
          pizzasPerPage={pizzasPerPage}
          onPageChange={onChangePage}
        />
      </div>
    </>
  );
}

export default Home;

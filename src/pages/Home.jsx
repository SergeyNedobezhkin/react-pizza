import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  setCategoryId,
  setFilters,
} from "../redux/slices/filterSlice";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import SkeletonLoader from "../components/PizzaBlock/SkeletonLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue, currentPage, sort, categoryId } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzasSlice);
  const [pizzasPerPage] = useState(6);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const sortBy = sort.sortProperty;
    const search = searchValue ? `&title=${searchValue}` : "";

    dispatch(
      fetchPizzas({ category, sortBy, search, pizzasPerPage, currentPage })
    );
    window.scrollTo(0, 0);
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
  }, [categoryId, sort, currentPage]);

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
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzaList = items.map((obj) => {
    return (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    );
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
        {status === "error" ? (
          <div className="content__error-info">
            \
            <h2>
              Произошла ошибка<span>😕</span>
            </h2>
            <p>К сожалению, не удалось получить пиццы!</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzaList}
          </div>
        )}

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

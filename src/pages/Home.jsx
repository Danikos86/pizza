import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { selectFilter, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);


  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;
 

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);

    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
      getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => (<Link to={`/pizza/${obj.id}`}><PizzaBlock key={obj.id} {...obj} /></Link>));
    
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' 
          ? 
          <div className="content__error-info">
            <h2>Что то пошло не так =(</h2>
            <p>Попробуйте позже.</p>
          </div> 
          :
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        }
        
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;

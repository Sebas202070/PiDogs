import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import { Paginate } from "../Components/Paginate";
import Search from "../Components/Search";
import {
  filterBySource,
  filterByTemperaments,
  getAllDogs,
  getAllTemperaments,
  orderByName,
  orderByWeight,
} from "../Redux/actions";
import styled from "./Home.module.css";

function Home() {
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [alfabetical, setAlfabetical] = useState("");
  const [weight, setWeight] = useState("");
  /* console.log(dogs) */
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 8;
  const ultimo = currentPage * videogamesPerPage;
  const primero = ultimo - videogamesPerPage;
  const dogies = dogs.slice(primero, ultimo);
  /* console.log("hola1", games) */

  const setPagination = (page) => {
    return setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handlerTemperaments = (event) => {
    event.preventDefault();
    dispatch(filterByTemperaments(event.target.value));
  };

  const handlerSource = (event) => {
    event.preventDefault();
    dispatch(filterBySource(event.target.value));
   
  };

  const handlerName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setAlfabetical(`Order ${event.target.value}`);
  };

  const handlerWeight = (event) => {
    event.preventDefault();
    dispatch(orderByWeight(event.target.value));
    setWeight(`Order ${event.target.value}`);
    console.log("w", event.target.value)
  };

  return (
    <div className={styled.back1}>
      <div className={styled.background}>
  <h1 className={styled.title}>DOGS</h1>
        <Search />
        <div className={styled.labs}>
        <div className="filter">
          <label className={styled.label}>Filtra por temperamentos: </label>
          <select
            key="selectFilterTemps"
            onChange={(event) => handlerTemperaments(event)}
          >
            <option key="ALLTEMPS" defaultValue="ALL"></option>
            {temperaments &&
              temperaments.map((temp) => (
                <option key={temp} value={temp}>
                  {temp}
                </option>
              ))}
          </select>
        </div>
        <div className="filter">
          <label className={styled.label}> Filtra por fuente:</label>
          <select key="selectSource" onChange={(event) => handlerSource(event)}>
            <option key="ALLCREATION" defaultValue="ALL"></option>
            <option key="bdd" value="bdd">
              Database
            </option>
            <option key="api" value="api">
              API
            </option>
          </select>
        </div>
        <div className="filter">
          <label className={styled.label}> Ordena por Nombre: </label>
          <select
            key="selectFilterName"
            name="FilterByName"
            onChange={(event) => handlerName(event)}
          >
            <option key="ALLBYNAME" defaultValue="ALL"></option>
            <option key="A-Z" value="A-Z">
              A-Z
            </option>
            <option key="Z-A" value="Z-A">
              Z-A
            </option>
          </select>
        </div>
        <div className="filter">
          <label className={styled.label}>Ordena por Peso: </label>
          <select
            key="selectFilterWeight"
            name="FilterByWeight"
            onChange={(event) => handlerWeight(event)}
          >
            <option key="ALLBYNAME" defaultValue="ALL"></option>
            <option key="0-200" value="0-200">
              0-200Kgs
            </option>
            <option key="200-0" value="200-0">
              200-0Kgs
            </option>
          </select>
        </div>
        </div>
        <div className={styled.con}>
          {dogies?.length > 0 &&
            dogies?.map((d) => {
              /*  console.log("T", d.temperaments) */
              return (
                <Card
                  key={crypto.randomUUID()}
                  id={d.id}
                  img={d.image}
                  name={d.name}
                  weight={d.weight + " kgs"}
                  /*   height={d.height}
       life_span={d.life_span} */

                  temperaments={
                    d.temperament || d.temperaments?.map((e) => e.name + ",")
                  }
                />
              );
            })}
        </div>
        
        <div>
          <Paginate
            videogamesPerPage={videogamesPerPage}
            allVideogames={dogs.length}
            setPagination={setPagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import "./Starwars.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setPeopleData, setSearchData, setCurrentPage } from '../Component/Redux/peopleSlice';

function Starwars() {
  const dispatch = useDispatch();
  const { peopleData, searchData, currentPage, itemsPerPage } = useSelector((state) => state.people);

  useEffect(() => {
    getPeople();
  }, [currentPage, searchData]);

  function getPeople() {
    axios.get(`https://swapi.dev/api/people/?search=${searchData}`).then((res) => {
      dispatch(setPeopleData(res.data.results));
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peopleData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="form-group mb-5 w-25" style={{ marginLeft: '50px' }}>
        <label htmlFor="usr">Search:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => dispatch(setSearchData(e.target.value))}
          id="usr"
        />
      </div>

      <div className="container">
        <div className="row">
          {currentItems.map((item, index) => (
            <div key={index} className="col-4 col-sm-4">
              <CharacterCard
                name={item.name}
                dob={item.birth_year}
                eye={item.eye_color}
                skin={item.skin_color}
                gender={item.gender}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3 mb-2">
        <button
          className="btn btn-primary me-2"
          onClick={() =>
            dispatch(setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)))
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="btn btn-primary ms-2"
          onClick={() =>
            dispatch(setCurrentPage((prevPage) =>
              Math.min(prevPage + 1, Math.ceil(peopleData.length / itemsPerPage))
            ))
          }
          disabled={indexOfLastItem >= peopleData.length}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Starwars;

const CharacterCard = ({name,dob,eye,gender ,skin }) => {
    return (
      <div className="col-4 mb-4"> 
        <div className="card" style={{ width: "18rem" }}>
          <img src='' className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Name:{name} </h5>
            <p className="card-text">DOB:{dob} </p>
            <p>Skin: {skin}</p>
            <p>Eyes Color: {eye}</p> 
          </div>
        </div>
      </div>
    );
  };
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function Read() {
  const navigate = useNavigate();
  const [student, setStudents] = useState([]);

  const getStudents = () => {
    axios.get(`http://localhost:8000/get`)
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleRegister = () => {
   
    navigate('/create');
  }

  const handleLocalStorage = (id,name,addr,stream,year) => {
    
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("addr", addr);
    localStorage.setItem("stream", stream);
    localStorage.setItem("year",year);
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className="container mt-3 mb-3">
        <button className='btn btn-info m-2' onClick={handleRegister}>Register</button>
        <h3>Students</h3>
        <div className="row mt-3 mb-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Stream</th>
                <th scope="col">Year</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {
                student.map((student) => {
                  return (
                    <tr>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.addr}</td>
                      <td>{student.stream}</td>
                      <td>{student.year}</td>
                      <td>
                        <Link to="/update">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              handleLocalStorage(
                                student.id,
                                student.name,
                                student.addr,
                                student.stream,
                                student.year,
                              )
                            }
                          >
                            Update
                          </button>
                        </Link>
                      </td>
                     
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}


import React, { useRef, useState } from 'react'
import axios from 'axios'
export default function Update() {
  const [s_name, setName] = useState("");
  const [s_addr, setAddr] = useState("");
  const [s_stream, setStream] = useState("");  
  const [s_year, setYear] = useState("");

  let id = localStorage.getItem('id');
  let name = localStorage.getItem('name');
  let addr = localStorage.getItem('addr');
  let stream = localStorage.getItem('stream');
  let year = localStorage.getItem('year');

  console.log(id, name, addr, stream, year);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(s_name,s_addr,s_stream,s_year);
    axios.put(`http://localhost:/update/${id}`, {
      name: s_name,
      addr: s_addr,
      stream: s_stream,
      year: s_year
    }).then((response) => { 
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div className="container mt-3 mb-3">
        <form className="myForm p-3">
          <div className="text-center">
            <h2>Update User</h2>
          </div>
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputUserName"
              
              onChange={(e) => {
                setName(e.target.value);
              }}
            
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputName"
              
              onChange={(e) => {
                setAddr(e.target.value);
              }}
            
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Stream</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputName"
              
              onChange={(e) => {
                setStream(e.target.value);
              }}
            
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Year</label>
            <input
              type="Number"
              class="form-control"
              id="exampleInputyear"
              
              onChange={(e) => {
                setYear(e.target.value);
              }}
            
            />
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleUpdate}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

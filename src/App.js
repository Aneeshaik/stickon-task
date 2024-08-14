import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  },[])
  const fetchData = async() => {
    const data = await fetch('https://randomuser.me/api/?results=100');
    const jsonData = await data.json();
    setTableData(jsonData.results);
    setFilteredData(jsonData.results);
  }
  const changeHandler = (e) => {
    setSearchValue(e.target.value);
    const filteredSearch = filteredData.filter((user) => (
      user.location.street.name.toLowerCase().includes(searchValue.toLowerCase()) || user.location.country.toLowerCase().includes(searchValue.toLowerCase())
    ))
    setTableData(filteredSearch);
  }
  // console.log(searchValue);
  return (
    <div className="App">
    <center>
      <h1>Users List</h1>
      <input type='text' name='user' placeholder='Search...' onChange={changeHandler} value={searchValue}></input>
      <table>
        <thead>
          <tr>
            <th>city</th>
            <th>state</th>
            <th>country</th>
            <th>postcode</th>
            <th>number</th>
            <th>name</th>
            <th>latitude</th>
            <th>longitude</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user, index) => (
            <tr key={index}>
              <td>{user.location.city}</td>
              <td>{user.location.state}</td>
              <td>{user.location.country}</td>
              <td>{user.location.postcode}</td>
              <td>{user.location.street.number}</td>
              <td>{user.location.street.name}</td>
              <td>{user.location.coordinates.latitude}</td>
              <td>{user.location.coordinates.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

const url = 'http://localhost:3005/';

const List = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`${url}getTypedValue`)
    .then(response => response.json())
    .then(data => {;
      setData(data)
      setLoading(false);
    })
    .catch(error => console.log(error));
  }
  useEffect(() => {
    fetchData();
  },[])

  function handleInputChange(event) {
    const { value } = event.target;
    setInputText(value);
  }

  function handleSubmit(event) {
    setLoading(true);
    setInputText('');
    fetch(`${url}setTypedValue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: inputText})
    })
      .then(response => response.json())
      .then(() => {
        fetchData()
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
    });
  }
  console.log('data', data);
  return (
    <div>
      <h1>List</h1>
      <ul>
        {loading ? <span>Loading...</span> : data.map(item => <li>{item.name}</li>
        )}
      </ul>
        <input value={inputText} onChange={handleInputChange} type="text"></input>
        <button onClick={handleSubmit}>Click To Add</button>
    </div>
  );
};

export default List;

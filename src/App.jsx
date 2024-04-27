import { useState } from "react";
import { useEffect } from "react";
import { AddForm } from "./components/AddForm";
import { EmployerList } from "./components/EmployerList";
import { EditForm } from "./components/EditForm";

const App = () => {

  const url = "http://localhost:3001/employList";
  const [employList, setEmployList] = useState([]);
  const [editEmployerItem, setEditEmployerItem] = useState('');
  const [editEmployerId, setEditEmployerId] = useState('');
  const [isEditActive, setIsEditActive] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getData();
  }, [update]);

  const getData = () => {
    fetch(url)
      .then(response => response.json())
      .then(json => setEmployList(json))
      .catch(error => console.error(error));
  };  


  const toggleEmployerActive = (employerActiveId) => {
    console.log(employerActiveId);

    let employer = employList.find(elem => elem.id == employerActiveId);
    employer.active = (employer.active) ? false : true;  

      fetch(`${url}/${employerActiveId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json; charset=utf=8'
        },
        body: JSON.stringify(employer)
      })
        .then( getData() )
        .then( setUpdate(prev => !prev) )
        .catch(error => console.error(error));
  }

  
  const delEmployer = (employerId) => {
    console.log(employerId);

    fetch(`${url}/${employerId}`, {method: 'DELETE'})
      .then( getData() )
      .then( setUpdate(prev => !prev) )
      .catch(error => console.error(error));
  }


  const addEmployer = (employer) => {
    const lastId = +employList[employList.length - 1].id;
    console.log(lastId);
    
    employer.id = String(lastId + 1);

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf=8'
      },
      body: JSON.stringify(employer)
    })
      .then( getData() )
      .then( setUpdate(prev => !prev) )
      .catch(error => console.error(error));  
  }

  
  const editEmployerHandler = (employerId) => {
    console.log(employerId);
    let index = employList.findIndex(elem => elem.id == employerId);
    console.log(index);
    setEditEmployerId(employerId);
    setIsEditActive(true);
    setEditEmployerItem(employList[index]);
  }

  const editEmployer = (editEmpItem) => {
    console.log(editEmpItem); 
    console.log(editEmployerItem);

    fetch(`${url}/${editEmployerItem.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf=8'
      },
      body: JSON.stringify(editEmpItem)
    })
      .then( setIsEditActive(false) )
      .then( getData() )
      .then( setUpdate(prev => !prev) )
      .catch(error => console.error(error));
  }


  return (
    <div className="container">
      <h1>Employer list app</h1>

      <div className="employer-list-app">
        <AddForm addEmployer={ addEmployer } isEditActive={ isEditActive } />

        { isEditActive && <EditForm 
            editEmployerName={ editEmployerItem.name } 
            editEmployerSurname={ editEmployerItem.surname } 
            editEmployer={ editEmployer } 
            getData={ getData }
        />}

        <div className="employer-list-block">
          <p className="employer-list-count">
            Employers count: <span>{ employList.length }</span>
          </p>

          <EmployerList 
              data={ employList } 
              toggleEmployerActive={toggleEmployerActive}
              delEmployer={ delEmployer } 
              editEmployerHandler={ editEmployerHandler }
              isEditActive={ isEditActive }
              editEmployerId={editEmployerId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./AddForm.css";

export const AddForm = (props) => {
  const { addEmployer, isEditActive } = props;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const addName = (e) => {
    setShowWarningMessage(false);
    setName(e.target.value)
  }

  const addSurname = (e) => {
    setShowWarningMessage(false);
    setSurname(e.target.value)
  }

  const addHandler = () => {
    if (isEditActive) return;
       
    const employer = {
      name,
      surname,
      active: true
    };

    if (employer.name == '' || employer.surname == '') {
      setShowWarningMessage(true);
      return
    }

    addEmployer(employer);
    console.log(employer);
    
    setName('');
    setSurname('');
  }

  return (
    <div className="employer-add">
      <div className="employer-add-form">
        <label>Name
          <input 
            className="employer-add-form__input" 
            value={ name }
            type="text"
            onChange={ (e) => addName(e) } 
          
          />
        </label>
        
        <label>Surname
          <input 
            className="employer-add-form__input"
            value={ surname }
            type="text" 
            onChange={ e => addSurname(e) }
          />
        </label>
        <button
          className="employer-add-form__btn"
          onClick={ addHandler }         
        >
          Add
        </button>
      </div>
      <div 
        className={`employer-add__message ${showWarningMessage && "showMessage"}`}>
          Enter Name and Surname please
      </div>
    </div>
  );
};
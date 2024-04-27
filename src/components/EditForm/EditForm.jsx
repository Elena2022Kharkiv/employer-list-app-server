
import { useState } from "react";
import "./EditForm.css";

export const EditForm = (props) => {
  const { editEmployerName, editEmployerSurname, editEmployer } = props;

  const [editName, setEditName] = useState(editEmployerName);
  const [editSurname, setEditSurname] = useState(editEmployerSurname);
    
  const editHandlerItem = () => {
    const editEmpItem = {
      name: editName,
      surname: editSurname,
      active: true
    };
    editEmployer(editEmpItem);
  }

    return (
    <div className="employer-edit-form">
      <label>Name
        <input
          onChange={ e => setEditName(e.target.value) }
          value={ editName }
          type="text" 
          className="employer-edit-form__input" 
        />
      </label>
      
      <label>Surname
         <input 
          onChange={ e => setEditSurname(e.target.value) }
          value={ editSurname }
          type="text" 
          className="employer-edit-form__input" 
        />
      </label>
      <button
        onClick={ editHandlerItem } 
        className="employer-edit-form__btn"
      >
        Edit
      </button>
    </div>
  );
};
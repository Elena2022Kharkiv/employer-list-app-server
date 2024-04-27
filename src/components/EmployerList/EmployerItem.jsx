import "./EmployerItem.css";

export const EmployerItem = (props) => {
  const { item, index, delEmployer, isEmployerActive, toggleEmployerActive, editEmployerHandler, isEditActive, editEmployerId} = props;
  const modifEdit = (isEditActive && item.id == editEmployerId) ? "edit" : '';
  const modifActive = isEmployerActive ? '' : "unactive";

  const toggleActiveHandler = (e) => {
    if (isEditActive) return;
    const employerActiveId = String(e.target.dataset.id);
    toggleEmployerActive(employerActiveId);
  }

  const delHandler = (e) => {
    const employerId = e.target.dataset.id;
    if (isEditActive) return;
    delEmployer(employerId);
    console.log(employerId);
  };

  const editHandler = (e) => {
    let editEmployerId = String(e.target.dataset.id);
    console.log(editEmployerId);    
    if (isEditActive) return;      
    editEmployerHandler(editEmployerId);
  };

  return (
    <li className={`employer-item ${modifEdit} ${modifActive}`}> 
      <p>{ isEmployerActive ? '' : "Employer not used" }</p>
      <div className="employer-item__content">
        <input 
          type="checkbox" 
          checked = { isEmployerActive ? '' : "checked" }
          className="employer-item__checkbox"
          data-id={ item.id }
          onChange={ e => toggleActiveHandler(e)} 

        /> 
        <span className="employer-item__number">{ index + 1 }.</span>
        <div className="employer-item__info-block">
            <span className="employer-item__info employer-item__info_name">{ item.name }</span>
            <span className="employer-item__info employer-item__info_surname">{ item.surname }</span>
        </div>
        <div className="employer-item__action-block">
          <button 
            className="employer-item__btn employer-item__btn_edit"
            data-id={ item.id }
            disabled={ isEmployerActive ? false : true }
            onClick={(e) => editHandler(e)}
          >
            Edit
          </button>
          <button 
            className="employer-item__btn employer-item__btn_del"
            data-id={ item.id }
            disabled={ isEmployerActive ? false : true }
            onClick={(e) => delHandler(e)}
          >
            Del
          </button>
        </div>
      </div>
    </li>
  );
};

/* eslint-disable */
import React from 'react'
import { Link ,NavLink} from 'react-router-dom';

const DropDown = ({dropdownName,listArray, classList, adddetailsId ,add}) => {

  return (
    <div  className="dropdown dropdown-defult" id={adddetailsId}>
            <Link className="btn btn-secondary dropdown-toggle inner-select"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {dropdownName}
            </Link>
            {/* all dropdown items display using map function */}
            <ul className="dropdown-menu" id={classList}>
                {listArray 
        ? listArray.map((itemVal, index) => (
                    <li key={index}>
                    <Link className="dropdown-item" >{itemVal}</Link>
                    </li>
                )):null}
              {add?<li><NavLink className="dropdown-item add-item" to={"/page2"}>Add {dropdownName}</NavLink></li>:<li/>
              }
            </ul>
        </div>
  )
}

export default DropDown;




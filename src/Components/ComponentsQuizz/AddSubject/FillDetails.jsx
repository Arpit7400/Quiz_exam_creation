import React from 'react'
import DropDown from '../../ComponentsNotRequire/DropDown'
import { State } from '../../Context/Provider'

const FillDetails = () => {
  const { dsubject,dtopic,dstopic} = State();
   
  return (
    <div className="fill-details">
      {/* pass all dropdown list using this.props */}
      <DropDown dropdownName={"Class1"} listArray={["1", "2", "3", "4", "5", "6", "7", "8", "9"]} classList={"classChange"} add={true} />
        <DropDown dropdownName={"Subject"} listArray={dsubject} add={true}/>
        <DropDown dropdownName={"Topic"} listArray={dtopic} add={true}/>
        <DropDown dropdownName={"Sub topic"} listArray={dstopic}add={true} />
        <DropDown dropdownName={"Level"} listArray={["Beginner", "Intermediate" , "Advance"]} add={false}/>
        <DropDown dropdownName={"Quiz Type"} listArray={["Multiple choice - Single answer", "Multiple choice - multiple answers", "Yes or No", "True or False"]} add={false}/>
    </div>
  )
}

export default FillDetails

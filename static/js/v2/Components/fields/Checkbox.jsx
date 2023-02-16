import React from "react"
export default function Field({name,id,children,onChange,value,checked}){
    return(
        <div className="custom-control custom-radio">
            <input id={id} name={name} type="radio" onChange={onChange} value={value}
             className="custom-control-input" checked={checked=='true' ? true : false}  required=""/>
            <label className="custom-control-label" htmlFor={id}>{children}</label>
         </div>
    )
}
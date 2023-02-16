import React from 'react';
import '../../../css/Fields.css'
export default function Input({name,value,onChange,type,children,classNamename = ''}){
    return(<div className="Cbn">
        {children ? 
        <label htmlFor={name}>{children}</label>:''}
        <input type={type} value={value} onChange={onChange} id={name} name={name} className={"Text-form"+ classNamename}/>
    </div>)
}
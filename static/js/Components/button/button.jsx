import React from 'react'
export default function Button({variant='',onClick,disabled,children,type}){
    return(
      <button type={type} className={'sqdOP Xdg L3NKy ZIAjV ' + variant} 
      disabled={disabled} onClick={onClick}>{children}</button>
    )
}
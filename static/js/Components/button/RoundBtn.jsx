import React from 'react'
export default function RoundButton({variant='',onClick,disabled,children,type}){
    return(
      <button type={type} className={'Fdo sqdOP L4fx ZIAjV Lnl bBB' + variant} disabled={disabled} onClick={onClick}>{children}</button>
    )
}
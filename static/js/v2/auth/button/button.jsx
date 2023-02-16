import React from 'react'
export default function Button({ variant = '', onClick, disabled, children, type }) {
  return (
    <>
      {disabled ?
        <div className={' btn  disabled ' + variant}
          >{children}</div>
        :
        <button type={type} className={'btn  ' + variant}
          onClick={onClick}>{children}</button>
      }
    </>
  )
}
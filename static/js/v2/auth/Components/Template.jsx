import React from "react";
function TemplateCheck({ onClick, checkbox, children, active }) {
  return <div className={active ? "page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc QOqBd" : "page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc"} onClick={onClick}>
    <div className="page ElL Ngt">
      <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
        <div className="Fdo Aic">
          {checkbox}
        </div>
        <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
          <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{children}</div>
        </div>
      </div>
    </div>
  </div>
}

function Step({step,stepLength}) {
  let row = [];
  for (let i = 0; i < stepLength; i++) {
    row.push(
      <div className='Fdo ELG Pap' key={i}>
        <div className={`step ${step === i+1 ? 'bBA' : ''}`}></div>
      </div>
    )
  }
  
  return <>
    <div className='Fdo Kmm'>
      {row}
    </div>
    <div className='Kmm'>
      <span>Etapes</span>
      <div>
        <span>{step}</span>
        <span>/</span>
        <span>{stepLength}</span>
      </div>
    </div>
  </>
}
export { TemplateCheck,Step }
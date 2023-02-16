import React from 'react'
import { Modal } from 'react-bootstrap'
import { Close } from '../../v2/icon/icons';
export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.titre &&
        <div className="Fdo Vnk g4R aBv  kzZ Vpe">
          <div className="ELG zI7 iyn Hsu Pac vcx">
            <h5 className="lH1 dyH iFc SMy kON pBj IZT ">{props.titre}</h5>
          </div>
          <div className="Fdo close">
            <div className='Fdo Aic' onClick={props.onHide}><Close size={32} /></div>
          </div>
        </div>
      }
      <div  className={`${props.nopadding === 'true' ? '' : 'Fdo g4R aBv Anv'}`}>
        {props.children}
      </div>
    </Modal>
  );
}

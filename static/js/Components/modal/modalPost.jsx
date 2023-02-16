import React from 'react'
import MyVerticallyCenteredModal from './modalCore'
import Button from '../button/button'
export default function modalPost({children}) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
          <Button variant="agf bBB" onClick={() => setModalShow(true)}>Creer une publication</Button>
        <MyVerticallyCenteredModal
          show={modalShow} children={children}
          onHide={() => setModalShow(false)}
          titre="Creer une publication" 
          size="lg"
        />
        </>
    );
  }

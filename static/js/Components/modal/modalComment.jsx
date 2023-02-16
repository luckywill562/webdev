import React from 'react'
import MyVerticallyCenteredModal from './modalCore'
  
  function App({children}) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <>
          <button className="post-action Comment-button" onClick={() => setModalShow(true)}></button>
        <MyVerticallyCenteredModal
          show={modalShow} children={children}
          onHide={() => setModalShow(false)}
          titre="Ajouter une reponse"
        />
        </>
    );
  }

  export default App
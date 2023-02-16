import React from 'react'
import Button from '../button/button'
import MyVerticallyCenteredModal from './modalCore'
  function App({children}) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <div className="right-pannel">
        <div className="profile-bouton-action a1C">
          <Button className="profile-lg-btn Fdo Aic small-btn-default btn-pc-medium" onClick={() => setModalShow(true)}>Ouvrir le filtre</Button>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow} children={children}
          onHide={() => setModalShow(false)}
          titre="Configurer le Filtre"
        />
        </div>
    );
  }

  export default App
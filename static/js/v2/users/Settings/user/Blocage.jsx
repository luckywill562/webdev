import React from "react"
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore"
const Blocage = (props)=>{
    return <div>
        {props.children}
        <MyVerticallyCenteredModal
            show={props.modal}
            onHide={()=>props.modalAction()}
        >
            <div className="">
                <h1>bloquer cette utilisateur</h1>
            </div>
        </MyVerticallyCenteredModal>
    </div>
}
export default Blocage
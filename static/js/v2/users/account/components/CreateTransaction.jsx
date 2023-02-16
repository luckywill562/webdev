import React from "react";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import { ArrowBack, ArrowCondensed, ArrowUp, CardCredit } from "../../../icon/icons";
import Send from "./Transactions/Send";
const CreateTransactions = () => {
    const [modal, setModal] = React.useState({
        type: '',
        open: false,
    });
    const openModal = (type) => {
        setModal({ type, open: !modal.open });
    }
    return <div className="Fdo Aic Lns ELG hty">
        <div className="Fdo">
            <div className="Fdo transaction_card" >
                <div className="oocd Ngt pIc" onClick={() => openModal('DEPOT')}>
                    <div className="Fdo Aic hty Anv rOtsg Lns mWe ">
                        <Icon>
                            <CardCredit size={28} />
                        </Icon>
                        <Text>Déposer de l'argent</Text>
                    </div>
                </div>
            </div>

            <div className="Fdo transaction_card">
                <div className="Fdk Ngt pIc" onClick={() => openModal('SEND')}>
                    <div className="Fdo Aic hty Anv Lns rOtsg mWe " >
                        <Icon>
                            <ArrowCondensed size={22} />
                        </Icon>
                        <Text>Envoyer de l'argent</Text>
                    </div>
                </div>
            </div>
            <div className="Fdo transaction_card">
                <div className="Gdl Ngt pIc" onClick={() => openModal('RETIRE')}>
                    <div className="Fdo Aic hty Anv Lns rOtsg mWe ">
                        <Icon>
                            <ArrowUp size={24} />
                        </Icon>
                        <Text>Rétirer de l'argent</Text>
                    </div>
                </div>
            </div>
        </div>
        <MyVerticallyCenteredModal
            show={modal.open}
            titre={modal.type === 'DEPOT' ? "Déposer de l'argent" :
                modal.type === 'SEND' ? "Envoyer de l'argent" : modal.type === "RETIRE" ? "Rétirer de l'argent" : ""}
            onHide={() => setModal({ open: false })}
            nopadding="true"
        >
            {modal.type === 'DEPOT' ?
                <div className="">Deposer de l'argent</div> :
                modal.type === 'SEND' ?
                        <Send closeModal={() => setModal({ open: false })}/>:
                    modal.type === "RETIRE" ?
                        <div className="">retirer de l'argent</div> :
                        ""
            }
            
        </MyVerticallyCenteredModal>
    </div>
}
export default CreateTransactions

function Text({ children }) {
    return <div className="Ert Vpe Tpc">{children}</div>
}
function Icon({ children }) {
    return <div className="Fdo">
        <div className="Fdo Tpc Lns vDrT Aic hty">
            {children}
        </div>
    </div>
}
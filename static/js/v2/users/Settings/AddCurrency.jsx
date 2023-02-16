import React,{useState} from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import Fetch from "../../util/Fetch";
import { LoadingXlContent } from "../../icon/icons";
const AddCurrency = () => {
    const [modal, setModal] = useState(false);
    const Logout = (e) => {
        e.preventDefault();
        setModal(true);
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Auth/Logout')
        Fetch('/logout', formData, (res) => {
            if (res.success === 1) {
                window.location.href = "/";
            }
        }
        )
    }
    return <div className="Fdo A2s">
        <div className="Fdo Anv Aic sra5f Lns">
            <div className="logo">
                <img src="/assets/brand.96cf97dc.png" />
            </div>
            <div className="v2ao bi6gxh9e">
                <div className=" iFc SMy SNs pBj bi6gxh9e IZT mWe">Selectionner la devise utiliser au quoitidien</div>
                <p className="">Selectionner une devise qui vous convient pour que vous puisser faire du transanctions
                </p>
            </div>
            <div className="Fdo bi6gxh9e">
                select
            </div>
            <div className="Fdo">
                <button className="sqdOP Xdg L3NKy ZIAjV G6S" onClick={Logout}>Se deconnecter</button>
            </div>
            <div className="" dangerouslySetInnerHTML={{ __html: '&copy tafaray 2023' }}></div>
        </div>
        <MyVerticallyCenteredModal
            show={modal}
            size="logout">
            <div className="Fdo Anv Bsj f10w8fjw">
                <div className="Fdo Bsj Anv">
                    <LoadingXlContent />
                </div>
            </div>
        </MyVerticallyCenteredModal>
    </div>
}
export default AddCurrency
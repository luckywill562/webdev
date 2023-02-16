import React from "react";
import { GetCurrency } from "../../Template/Template";
import Button from "../button/button";

const RegisterStepFive = (props) => {
    return <div className="Fdo A2s Anv">
        <div className="Fdo Anv Aic sra5f Lns">
            <div className="v2ao bi6gxh9e">
                <p className="">Selectionner une devise qui vous convient pour que vous puisser faire du transanctions
                </p>
                <div className=" iFc SMy SNs pBj bi6gxh9e IZT mWe">
                    <GetCurrency onchange={props?.onChange} value={props?.value}/>
                </div>
            </div>
        </div>
        <div className='Fdo Kmm Lns'>
            <div className='Lsy LDv'>
                <Button variant='primary' onClick={() => props?.setStep(4)}>Revenir</Button>
            </div>
            <div className='Lsy LDv'>
                {parseInt(!props?.currency) > 0 ?
                    <Button variant='_Dvgb disabled' disabled>Suivant</Button>
                    :
                    <Button variant='_Dvgb' onClick={()=>props?.setStep(6)}>Suivant</Button>
                }
            </div>
        </div>
    </div>
}
export default RegisterStepFive
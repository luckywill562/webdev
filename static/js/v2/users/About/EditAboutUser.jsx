import React from "react";
import { withRouter } from "../../util/WithRouter";
const EditAboutUser = () => {
    const [taille, setTaille] = React.useState(100);
    let rowTaille = [];
    for (let i = 1; i <= 31; i++) {
        rowTaille.push(
            <option value={i} key={i}>{i}</option>
        )
    }
    const handleChange = () => {

    }
    return <div className="Fdo Anv">
        <div className="Fdo Vpe">
            <div className="SH1 tlK SMy Vft">a propos de vous</div>
        </div>
        <div className="Fdo Anv">
            <div className="customized-select">
                <select value={taille} onChange={handleChange} name="taille" ><option value='' selected>J'habite a</option>{rowTaille}</select>
            </div>
            <div className="customized-select">
                <select value={taille} onChange={handleChange} name="taille" ><option value='' selected>taille</option>{rowTaille}</select>
            </div>

            <div className="customized-select">
                <select value={taille} onChange={handleChange} name="poids" ><option value='' selected>poids</option>{rowTaille}</select>
            </div>
            <EditableSection>
                <div className="customized-select">
                    <select  onChange={handleChange} name="sexe">
                        <option>Origine</option>
                        <option value="Y">Gasy petaka</option>
                        <option value="N">Métisse</option>
                        <option value="Y">Asiatique</option>
                        <option value="N">Africains</option>
                        <option value="N">Européens</option>
                        <option value="N">Arabe</option>
                    </select>
                </div>
            </EditableSection>
        </div>
        <div className="Fdo Vpe">
            <div className="SH1 tlK SMy Vft">aprops de la personne que voulez rencontrer</div>
        </div>
    </div>
}
export default withRouter(EditAboutUser);

function EditableSection({ children, className = '' }) {
    return <div className={`line ${className}`}>
        {children}
    </div>
}
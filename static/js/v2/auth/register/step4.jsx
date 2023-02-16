import React from 'react'
import Button from '../button/button'
import { TemplateCheck } from '../Components/Template';
import { CircleEmpty, CircleSelected } from "../../icon/icons";

export default class Step4 extends React.Component {
    constructor(props) {
        super(props)
    }
    nextStep = () => {
        this.props.setStep(3);
    }
    handleChangesexe = (sexe) =>{
        this.props.handleChangesexeSearch(sexe)
    }
    render() {
        return (
            <>
                <div className='Fdo Kmm Lns'>
                    <div className="SH1 tlK SMy Vft">Genre de relation que j'accepte </div>
                </div>
                <div className='Fdo Kmm'>
                    <TemplateCheck onClick={() => this.handleChangesexe(1)}
                        active={this.props.sexe === 1 ? true
                            :
                            false}
                        checkbox={this.props.sexe === 1 ? <CircleSelected />
                            :
                            <CircleEmpty />}> Amitié seulement
                    </TemplateCheck>
                    <TemplateCheck onClick={() => this.handleChangesexe(2)}
                        active={this.props.sexe === 2 ? true
                            :
                            false}
                        checkbox={this.props.sexe === 2 ? <CircleSelected />
                            :
                            <CircleEmpty />}> Rélation amoureuse
                    </TemplateCheck>
                    <TemplateCheck onClick={() => this.handleChangesexe(3)}
                        active={this.props.sexe === 3 ? true
                            :
                            false}
                        checkbox={this.props.sexe === 3 ? <CircleSelected />
                            :
                            <CircleEmpty />}> Toute relation possible
                    </TemplateCheck>
                </div>
                {this.props.children}
            </>
        )
    }
}
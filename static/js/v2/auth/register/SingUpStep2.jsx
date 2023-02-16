import React from 'react'
import Button from '../button/button'
import { TemplateCheck } from '../Components/Template';
import { CircleEmpty, CircleSelected } from "../../icon/icons";

export default class SingUpStep2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            day: '',
            month: '',
            year: ''
        }
    }
    nextStep = () => {
        this.props.setStep(3);
    }
    handleChangesexe = (sexe) => {
        this.props.handleChangesexeSearch(sexe)
    }
    render() {
        return (
            <>

                <div className='Fdo Kmm Lns'>
                    <div className="SH1 tlK SMy Vft">Je suis interessé par</div>
                </div>
                <div className='Fdo Kmm'>
                    <TemplateCheck onClick={() => this.handleChangesexe("M")}
                        active={this.props.sexe === "M" ? true
                            :
                            false}
                        checkbox={this.props.sexe === "M" ? <CircleSelected />
                            :
                            <CircleEmpty />}> Les hommes
                    </TemplateCheck>
                    <TemplateCheck onClick={() => this.handleChangesexe("F")}
                        active={this.props.sexe === "F" ? true
                            :
                            false}
                        checkbox={this.props.sexe === "F" ? <CircleSelected />
                            :
                            <CircleEmpty />}> Les femmes
                    </TemplateCheck>
                    <TemplateCheck onClick={() => this.handleChangesexe("A")}
                        active={this.props.sexe === "A" ? true
                            :
                            false}
                        checkbox={this.props.sexe === "A" ? <CircleSelected />
                            :
                            <CircleEmpty />}> Les hommes / des femmes
                    </TemplateCheck>
                </div>
                <div className='Fdo Kmm Lns'>
                    <div className='Lsy LDv'>
                        <Button variant='primary' onClick={() => this.props.setStep(1)}>Revenir</Button>
                    </div>
                    <div className='Lsy LDv'>
                        <Button variant='_Dvgb' onClick={this.nextStep}>Suivant</Button>
                    </div>
                </div>
            </>
        )
    }
}
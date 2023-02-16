import React from 'react'
import { AgeSearchedMinimum } from '../../Template/Template'
import Button from '../button/button'
export default class Step3 extends React.Component {
    constructor(props) {
        super(props)
    }
    nextStep = () => {
        if (this.props.age_required.min < 18 || this.props.age_required.max > 99) {
            alert('l\'age doit comprise entre 18 et 99 ans');
        } else {
            this.props.setStep(4);
        }
    }
    HandleChange = (e) => {
        this.props.handleChangeAgeSearch(e)
    }
    render() {
        return (
            <>

                <div className='Fdo Kmm Lns'>
                    <div className="SH1 tlK SMy Vft">J'aimerai rencontrer des personnes entre</div>
                </div>
                <div className='message_status'> 
                    {this.props.age_required.min > this.props.age_required.max ?
                        <span>l'age minimum doit etre inferieur a l'age maximum</span>
                        :
                        <span></span>}
                </div>
                <div className='Fdo mQ8 Kmm'>
                    <div className="LPN SFD hgdfroi bnf">
                        <AgeSearchedMinimum value={this.props.age_required.min} onChange={this.HandleChange} name="min" />
                    </div>

                    <div className="LPN SFD hgdfroi bnf">
                        <AgeSearchedMinimum value={this.props.age_required.max} onChange={this.HandleChange} name="max" />
                    </div>
                </div>

                <div className='Fdo Kmm Lns'>
                    <div className='Lsy LDv'>
                        <Button variant='primary' onClick={() => this.props.setStep(2)}>Revenir</Button>
                    </div>
                    <div className='Lsy LDv'>
                        {parseInt(this.props.age_required.min) > parseInt(this.props.age_required.max) ?
                            <Button variant='_Dvgb disabled' disabled>Suivant</Button>
                            :
                            <Button variant='_Dvgb' onClick={this.nextStep}>Suivant</Button>
                        }
                    </div>
                </div>
            </>
        )
    }
}
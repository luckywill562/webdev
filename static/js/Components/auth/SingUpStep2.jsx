import React from 'react'
export default class SingUpStep2 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            day: '',
            month: '',
            year: ''
        }
    }

    render(){
        return(
            <div className="LPN SFD">
            <div className="LPN Rad">
                <div className="LPN SFD">
                <label htmlFor="day">Jour</label>
                <select defaultValue={this.state.day} onChange={this.handleChange} className="custom-select">
                    <option>1</option>
                    <option>2</option>
                </select>
                </div>
                <div className="LPN SFD">
                <label htmlFor="mois">mois</label>
                <select defaultValue={this.state.month} onChange={this.handleChange} className="custom-select">
                    <option>septembre</option>
                    <option>octobre</option>
                </select>
                </div>
                <div className="LPN SFD">
                <label htmlFor="annee" >annee</label>
                <select defaultValue={this.state.day} onChange={this.handleChange} className="custom-select">
                    <option>2003</option>
                    <option>2004</option>
                </select>
                </div>
            </div>
            <div className="LPN SFD">
                Je suis un(e)
                <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required=""/>
                 <label className="custom-control-label" htmlFor="credit">Home</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required=""/>
                <label className="custom-control-label" htmlFor="debit">Femme</label>
              </div>
            </div>
            <div className="">
                Je suis ici pour
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="same-address"/>
                  <label className="custom-control-label" htmlFor="same-address">Retrouver de amis</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="save-info"/>
                  <label className="custom-control-label" htmlFor="save-info">Pour des rencontre amoureux</label>
                </div>
            </div>
            </div>
        )
    }
}
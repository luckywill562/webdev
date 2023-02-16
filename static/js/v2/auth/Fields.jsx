import React from 'react';
import { Eye, EyeClose } from '../icon/icons';
export default function Input({ name, value, onChange, type, children, classNamename = '', placeholder }) {
    const [state, stateSet] = React.useState({
        showpassword: false,
    });
    const showpassword = () => {
        if (state.showpassword === false) {
            stateSet({ ...state, showpassword: true })
        } else {
            stateSet({ ...state, showpassword: false })
        }
    }
    return (<div className="Cbn ELG RpG">
        {children ?
            <label htmlFor={name}>{children}</label> : ''}
        {type === 'password' ?
            <input autoComplete='false' type={state.showpassword === true ? "text" : 'password'} value={value} onChange={onChange} id={name} name={name} className={"Text-form" + classNamename} placeholder={placeholder} />
            :
            <input autoComplete='false' type={type} value={value} onChange={onChange} id={name} name={name} className={"Text-form" + classNamename} placeholder={placeholder} />
        }
        {type === 'password' && value.length > 0 &&
            <div className="pIc Fdo Aic Lns ApE Tpc" style={{ right: 9, bottom: 10 }} onClick={showpassword}>
                {state.showpassword ?
                    <span><Eye size={22} /></span>
                    :
                    <span><EyeClose size={22} /></span>
                }
            </div>
        }
    </div>)
}
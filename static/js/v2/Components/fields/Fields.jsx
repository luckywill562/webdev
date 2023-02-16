import React, { useEffect, useRef } from 'react'

import { Spinner } from 'react-bootstrap'
function Button({ variant = '', onClick, disabled, children, type, isLoading = false }) {
    return (
        <div className={`Fdo Bsj page ${type === 'button' ? 'Lbdf ' : ''}`}>
            <div className="Fdo page RpE">
                {isLoading &&
                    <div className="ApE kVc hty ELG p1c">
                        <div className="Fdo hty  Aic Lns">
                            <Spinner size="sm" animation="border" />
                        </div>
                    </div>
                }
                {disabled || isLoading ?
                    <div className={' sqdOP Xdg L3NKy ZIAjV  disabled ' + variant}
                    >{children}</div>
                    :
                    <button type={type} className={'sqdOP Xdg L3NKy ZIAjV  ' + variant}
                        onClick={onClick}>{children}</button>
                }
            </div>
        </div>
    )
}
const NavbarSearch = ({ onSearch, closeBox }) => {
    const [showplaceholder, setShowplaceholder] = React.useState(true)
    const fieldRef = useRef(null)

    useEffect(() => {
        // Function for click event
        function handleOutsideClick(event) {
            if (fieldRef.current && !fieldRef.current.contains(event.target)) {
                if (!showplaceholder) {
                    setShowplaceholder(true);
                    if (closeBox) {
                        closeBox(false);
                    }
                }
            }
        }

        // Adding click event listener
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [showplaceholder]);
    const onFocus = () => {
        setShowplaceholder(false)
        fieldRef.current.focus();
        if (closeBox) {
            closeBox(true)
        }
    }
    return < >
        <input className="area-search" ref={fieldRef} onChange={onSearch} placeholder="Rechercher" />
        {showplaceholder ?
            <div className='_aaw8' onClick={onFocus}>
                <div className='_aaw9'>
                    <div className='_aawa'>
                        <svg aria-label="Rechercher" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                    </div>
                    <span className='_aawc _aawd'>Rechercher</span>
                </div>
            </div>
            : null
        }
    </>
}

export { Button, NavbarSearch }

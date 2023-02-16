import React from 'react';
import Nav from './Components/Nav';
import defaultBrand from '../../../images/brand.png'
export default function Container({ children, logo }) {
  return (
    <>
      <Nav logo={logo} />
      <div className='background'>
        <div className='container'>
          <div className='landing Fdo Anv Aic'>
            <div className="Bfg bnf">
              <div className="Gdt bnf">
                <div className="Vfs bnf">
                  <div className="login-box bnf">
                    <div className='Fdo Aic Anv Lns'>
                      <div className='Lgv w0hvl6rk'>
                        <img className='' src={defaultBrand} />
                      </div>
                    </div>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
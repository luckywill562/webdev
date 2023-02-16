import React from 'react';
import Logo from '../../../images/logo.png'
export default function Container({children }) {
    return (
        <div className="_1cb"> 
          <div className="Bfg bnf">
            <div className="Gdt bnf">
              <div className="logo">
            <img src={Logo} className="App-logo" alt="logo" />
            </div>
              <div className="Vfs bnf">
                <div className="login-box bnf">
                    {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        )
  }
import React from "react";
const CustomToggle = React.forwardRef(({ children, onClick}, ref) => (
    <div className='Fdo sqdOP L4fx ZIAjV'
    ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
     <div className="Fdo Aic">{children}</div> 
    </div>
  ));
 export default CustomToggle
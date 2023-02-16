import React from 'react';

const CustomMenu = React.forwardRef(
    ({children, style, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className="dropdown-menu  nt-flyout popop-right"
          aria-labelledby={labeledBy} 
        >
         {children}
        </div>
      );
    },
  );
  export default CustomMenu
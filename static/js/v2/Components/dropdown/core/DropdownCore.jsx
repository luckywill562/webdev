import React from 'react';

const CustomMenu = React.forwardRef(
    ({children, style, 'aria-labelledby': labeledBy,customClass='' }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={"dropdown-menu  nt-flyout " + customClass}
          aria-labelledby={labeledBy} 
        > 
         {children}
        </div>
      );
    },
  );
  export default CustomMenu
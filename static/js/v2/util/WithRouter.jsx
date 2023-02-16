import React from "react";
import { useLocation, useNavigate, useParams} from "react-router";
export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      const useparams = useParams();
      return <Child { ...props } navigate={navigate} location={ location } useParams={useparams}/>;
    }
  }
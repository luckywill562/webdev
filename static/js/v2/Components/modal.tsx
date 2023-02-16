import * as React from "react";
import {
    useNavigate,
    useParams,
  } from "react-router-dom";
  import { IMAGES, getImageById } from "../images";
  
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
export default function Modal() {
    let navigate = useNavigate();
    let { id } = useParams<"id">();
    let image = getImageById(Number(id));
    let buttonRef = React.useRef<HTMLButtonElement>(null);
    function onDismiss() {
      navigate(-1);
    }
  
    if (!image) return null;
  
    return (
      <MyVerticallyCenteredModal
                      show={true}
                      onHide={()=>onDismiss()}
                      titre="Qui peut voir le contenu ?"
                      size="lg">
                     <h1>{id}</h1>
                  </MyVerticallyCenteredModal>
    );
  }
import { useEffect, useState } from "react";
import "./style.css";

export default function PopupGenerico({conteudo, bg, setVariavelDeEstado}) {
    const [isNotHidden, setIsNotHidden] = useState(true);
    const [isLeaveActive, setIsLeaveActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsNotHidden(false);
            setVariavelDeEstado(false);
        }, 4000);
        setTimeout(()=>{
            setIsLeaveActive(true)
        }, 3700)

    }, []);

    const closePopup = () => {
        setTimeout(()=>{
            setIsNotHidden(false);
            setVariavelDeEstado(false);
        }, 300)
        setIsLeaveActive(true);
    };

    return (
        <div className="popup-flutuante">
            {isNotHidden && (
                <div
                    className={`notification ${bg} fade-enter-active sticky ${isLeaveActive ? "fade-leave-active" : ""
                        }`}
                >
                    <button
                        className="delete"
                        onClick={closePopup}
                    ></button>
                    <div id="notification-content">{conteudo}</div>
                </div>
            )}
        </div>
    );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import "./style.css"


export default function Loading() {
    return <div className='modal is-active fundo-escuro'>
        <FontAwesomeIcon icon={faCircleNotch} className='cor-spin' spin size='3x' />
    </div>
}   
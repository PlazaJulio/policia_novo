export default function Input({placeholder, type, valor, onChange}){
    return <input className="input" type={type} placeholder={placeholder} value={valor} onChange={onChange}/>
}
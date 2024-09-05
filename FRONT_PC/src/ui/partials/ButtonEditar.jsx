export default function ButtonEditar({onHandle, children}){
    return <button className="button is-success mr-1" onClick={onHandle}>{children}</button>
}
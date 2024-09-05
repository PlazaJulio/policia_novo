export default function ButtonExcluir({onHandle, children}){
    return <button className="button is-danger" onClick={onHandle}>{children}</button>
}
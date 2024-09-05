export default function Button({onHandle, children}){
    return <button className="button is-fullwidth" onClick={onHandle}>{children}</button>
}
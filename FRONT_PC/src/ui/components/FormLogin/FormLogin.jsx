import { useState, useContext, useEffect } from "react"
import Input from "../../partials/Input"
import Button from "../../partials/Button"
import requestPost from "../../../data/utils/requestPost";
import { TokenContext } from "../../../data/context/TokenContext";
import { useNavigate } from "react-router-dom";

export default function FormLogin(){
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const { setTokenReact }= useContext(TokenContext)

    const navigate = useNavigate()
    
    return <div className="mt-6 column is-4 has-text-centered">
        <div className="field mb-6">        
            <figure className="image is-128x128 mx-auto">
                <img src="src/assets/Images/Logo.png"/>
            </figure>
        </div>
        <div className="field">
            <Input placeholder="usuario" type="text" valor={usuario} onChange={(event)=>setUsuario(event.target.value)}/>
        </div>
        <div className="field">
            <Input placeholder="senha" type="password" valor={senha} onChange={(event)=>setSenha(event.target.value)}/>
        </div>
        <div className="field">
            <Button onHandle={async ()=> {
                try{   
                    const resultado = await requestPost("/autorizacao/login", {"usuario": usuario, "password": senha})
                    setTokenReact(resultado.data["access_token"])
                    navigate("/")
                }catch(Exception){
                    console.log(Exception)
                }
            }
            }>Entrar</Button>
        </div>     
    </div>
}
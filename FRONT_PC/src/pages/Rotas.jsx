import { BrowserRouter, Route, Routes } from "react-router-dom"
import TatuagemPage from "./Tatuagem/TatuagemPage"
import CriminosoPage from "./Criminoso/CriminosoPage"
import LoginPage from "./Login/LoginPage"
import UsuarioPage from "./Usuario/UsuarioPage"

export default function Rotas() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<CriminosoPage />} />
            <Route path="/tatuagem" element={<TatuagemPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/usuarios" element={<UsuarioPage/>}/>
        </Routes>
    </BrowserRouter>
}
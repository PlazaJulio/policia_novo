import { useState, useEffect, useContext } from "react";
import requestGet from "../../data/utils/requestGet";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../data/context/TokenContext";
import Menu from "../../ui/components/Menu/Menu";
import TableUsuarios from "../../ui/components/TableUsuarios/TableUsuarios";
import Paginacao from "../../ui/components/Paginacao/Paginacao";
import ModalGenerico from "../../ui/components/ModalGenerico/ModalGenerico";
import Loading from "../../ui/components/Loading/Loading";
import PopupGenerico from "../../ui/components/PopupGenerico/PopupGenerico";
import "./style.css"
import requestPost from "../../data/utils/requestPost";

export default function UsuarioPage() {
    const [usuarios, setUsuarios] = useState(null);
    const { tokenReact } = useContext(TokenContext)
    const [limiteDeValoresPorRequisicao, setLimiteDeValoresPorRequisicao] = useState(6);
    const [modalAddEnable, setModalAddEnable] = useState(false);
    const [offset, setOffset] = useState(0);
    const [atualizar, setAtualizar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [permissaoDeEscrita, setPermissaoDeEscrita] = useState(false)
    const [popupSucesso, setPopupSucesso] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState("");
    const [popupErro, setPopupErro] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await requestGet("/usuario", { "limite": limiteDeValoresPorRequisicao, "deslocar": offset }, tokenReact);
                const responseData = response.data;
                setUsuarios(responseData);
                setLoading(false);
            } catch (error) {
                if (error.response.status == 401) {
                    navigate("/login")
                }
            }
        }
        fetchData();
    }, [offset, atualizar]);

    return (
        <div className="columns">
            {
                popupErro &&
                <PopupGenerico
                    bg="is-danger"
                    conteudo={conteudoPopup}
                    setVariavelDeEstado={setPopupErro}
                />
            }
            {
                popupSucesso &&
                <PopupGenerico
                    bg="is-success"
                    conteudo={conteudoPopup}
                    setVariavelDeEstado={setPopupErro}
                />
            }
            {
                loading &&
                <Loading />
            }
            <Menu />
            {
                modalAddEnable &&
                <ModalGenerico setModalEnable={setModalAddEnable}
                    titulo="Adicionar usuario"
                    conteudo={
                        <>
                            <div className='mb-3'>
                                <p>Nome do usuario:</p>
                                <input className="input" placeholder="Digite o usuario" value={usuario}
                                    onChange={(event) => setUsuario(event.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <p>Nome:</p>
                                <input className="input" placeholder="Digite o nome" value={nome}
                                    onChange={(event) => setNome(event.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <p>Senha:</p>
                                <input className="input" placeholder="Digite a nova senha" value={senha}
                                    onChange={(event) => setSenha(event.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <div>
                                    <label className='checkbox'>
                                        <input type='checkbox' value={permissaoDeEscrita}
                                            checked={permissaoDeEscrita}
                                            onChange={() => setPermissaoDeEscrita(!permissaoDeEscrita)}></input>
                                        Permissão de escrita
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                    onClickAccept={
                        () => {
                            requestPost("/usuario/inserir", {
                                "usuario": usuario,
                                "permissao_de_escrita": permissaoDeEscrita,
                                "nome": nome,
                                "password": senha
                            }, {}, tokenReact).then(
                                () => {
                                    setModalAddEnable(false)
                                    setAtualizar(!atualizar)
                                    setPopupSucesso(true)
                                    setConteudoPopup("Dado editado com sucesso!")
                                }
                            ).catch(
                                () => {
                                    setModalAddEnable(false)
                                    setAtualizar(!atualizar)
                                    setPopupErro(true)
                                    setConteudoPopup("Erro")
                                }
                            )
                        }
                    } />
            }
            <div className="column">
                <div className="is-flex is-justify-content-flex-end mr-6">
                    <button className="button mt-4 btn-success" onClick={setModalAddEnable}>+ Adicionar</button>
                </div>
                {
                    usuarios &&
                    <>
                        <TableUsuarios valores={usuarios.resultado} countPagination={usuarios.numero_de_dados_totais} limitPagination={limiteDeValoresPorRequisicao} alterOffsetPagination={setOffset} setAltualizarTabela={setAtualizar} atualizar={atualizar} />
                    </>
                }
            </div>
        </div>
    );
}

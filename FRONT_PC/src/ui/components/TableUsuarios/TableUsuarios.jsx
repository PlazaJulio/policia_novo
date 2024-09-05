import ButtonEditar from "../../partials/ButtonEditar";
import ButtonExcluir from "../../partials/ButtonExcluir";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Paginacao from "../Paginacao/Paginacao";
import { useContext, useState } from "react";
import ModalGenerico from "../ModalGenerico/ModalGenerico";
import { TokenContext } from "../../../data/context/TokenContext";
import requestPatch from "../../../data/utils/requestPatch";
import requestDelete from "../../../data/utils/requestDelete";
import PopupGenerico from "../PopupGenerico/PopupGenerico";
import "./style.css"

export default function TableUsuarios({ valores, countPagination, limitPagination, alterOffsetPagination, setAltualizarTabela, atualizar }) {
    const [modalEditEnable, setModalEditEnable] = useState(false);
    const [modalDeleteEnable, setModalDeleteEnable] = useState(false);
    const [popupSucesso, setPopupSucesso] = useState(false);
    const [popupErro, setPopupErro] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState("");
    const [id, setId] = useState(null);
    const [usuario, setUsuario] = useState("")
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [permissaoDeEscrita, setPermissaoDeEscrita] = useState(null)
    const { tokenReact } = useContext(TokenContext)

    return <>
        {
            popupSucesso &&
            <PopupGenerico
                bg="is-success"
                conteudo={<p>{conteudoPopup}</p>}
                setVariavelDeEstado={setPopupSucesso}
            />
        }
        {
            popupErro &&
            <PopupGenerico
                bg="is-danger"
                conteudo={<p>{conteudoPopup}</p>}
                setVariavelDeEstado={setPopupErro}
            />
        }
        {
            modalEditEnable &&
            <ModalGenerico setModalEnable={setModalEditEnable}
                titulo="Editar"
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
                        requestPatch("/usuario/" + id, { 
                            "usuario": usuario,
                            "permissao_de_escrita": permissaoDeEscrita,
                            "nome": nome,
                            "password": senha
                        }, {}, tokenReact).then(
                            () => {
                                setModalEditEnable(false)
                                setAltualizarTabela(!atualizar)
                                setPopupSucesso(true)
                                setConteudoPopup("Dado editado com sucesso!")
                            }
                        ).catch(
                            () => {
                                setModalEditEnable(false)
                                setAltualizarTabela(!atualizar)
                                setPopupErro(true)
                                setConteudoPopup("Erro")
                            }
                        )
                    }
                } />
        }
        {
            modalDeleteEnable &&
            <ModalGenerico setModalEnable={setModalDeleteEnable}
                titulo="Deletar"
                conteudo={<p>Você tem certeza que deseja DELETAR esse dado? ({usuario})</p>}
                onClickAccept={
                    () => {
                        requestDelete("/usuario/" + id, {}, tokenReact).then(
                            () => {
                                setModalDeleteEnable(false);
                                setAltualizarTabela(!atualizar);
                                setPopupSucesso(true)
                                setConteudoPopup("Dadao excluido com sucesso!")
                            }
                        ).catch(
                            () => {
                                setModalDeleteEnable(false);
                                setAltualizarTabela(!atualizar);
                                setPopupErro(true)
                                setConteudoPopup("Erro")
                            }
                        )
                    }
                }
            />
        }
        <table className="table mt-4 is-bordered is-hoverable width-table has-text-centered ml-auto mr-auto">
            <thead>
                <tr>
                    <th className="has-text-centered">Id</th>
                    <th className="has-text-centered">Usuario</th>
                    <th className="has-text-centered">Nome</th>
                    <th className="has-text-centered">Permissão de escrita</th>
                    <th className="has-text-centered">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    valores &&
                    valores.map((dado) => <tr>
                        <td>{dado.id}</td>
                        <td>{dado.usuario}</td>
                        <td>{dado.nome}</td>
                        <td>{dado.permissao_de_escrita ? "Tem permissão" : "Não tem permissão"}</td>
                        <td>
                            <ButtonEditar onHandle={() => {
                                setModalEditEnable(true)
                                setId(dado.id)
                                setUsuario(dado.usuario)
                                setNome(dado.nome)
                                setPermissaoDeEscrita(dado.permissao_de_escrita)
                            }}><FontAwesomeIcon icon={faPenToSquare} /></ButtonEditar>
                            <ButtonExcluir onHandle={() => {
                                setModalDeleteEnable(true)
                                setUsuario(dado.usuario)
                                setId(dado.id)
                                setNome(dado.nome)
                                setPermissaoDeEscrita(dado.permissoa_de_escrita)
                            }}><FontAwesomeIcon icon={faTrash} /></ButtonExcluir>
                        </td>
                    </tr>)
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan='5' className="ml-auto">
                        <Paginacao count={countPagination} limit={limitPagination} alterOffset={alterOffsetPagination} />
                    </td>
                </tr>
            </tfoot>
        </table>
    </>
}

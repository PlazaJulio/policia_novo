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

export default function TableTatuagem({ valores, countPagination, limitPagination, alterOffsetPagination, setAltualizarTabela, atualizar}) {
    const [modalEditEnable, setModalEditEnable] = useState(false);
    const [modalDeleteEnable, setModalDeleteEnable] = useState(false);
    const [popupSucesso, setPopupSucesso] = useState(false);
    const [popupErro, setPopupErro] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState("");
    const [id, setId] = useState(null);
    const [tipo, setTipo] = useState("")
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
                conteudo={<input className="input" placeholder="Digite o tipo da tatuagem" value={tipo}
                    onChange={(event) => setTipo(event.target.value)}></input>}
                onClickAccept={
                    () => {
                        requestPatch("/tipo-de-tatuagem/" + id, { tipo: tipo }, {}, tokenReact).then(
                            () => {
                                setModalEditEnable(false)
                                setAltualizarTabela(!atualizar)
                                setPopupSucesso(true)
                                setConteudoPopup("Dado editado com sucesso!")
                            }
                        ).catch(
                            () => {
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
                conteudo={<p>Você tem certeza que deseja DELETAR esse dado? ({tipo})</p>}
                onClickAccept={
                    () => {
                        requestDelete("/tipo-de-tatuagem/" + id, {}, tokenReact).then(
                            () => {
                                setModalDeleteEnable(false);
                                setAltualizarTabela(!atualizar);
                                setPopupSucesso(true)
                                setConteudoPopup("Dadao excluido com sucesso!")
                            }
                        ).catch(
                            () => {
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
                    <th className="has-text-centered">Tipo</th>
                    <th className="has-text-centered">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    valores &&
                    valores.map((dado) => <tr>
                        <td>{dado.id}</td>
                        <td>{dado.tipo}</td>
                        <td>
                            <ButtonEditar onHandle={() => {
                                setModalEditEnable(true)
                                setId(dado.id)
                                setTipo(dado.tipo)
                            }}><FontAwesomeIcon icon={faPenToSquare} /></ButtonEditar>
                            <ButtonExcluir onHandle={() => {
                                setModalDeleteEnable(true)
                                setTipo(dado.tipo)
                                setId(dado.id)
                            }}><FontAwesomeIcon icon={faTrash} /></ButtonExcluir>
                        </td>
                    </tr>)
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan='3' className="ml-auto">
                        <Paginacao count={countPagination} limit={limitPagination} alterOffset={alterOffsetPagination} />
                    </td>
                </tr>
            </tfoot>
        </table>
    </>
}

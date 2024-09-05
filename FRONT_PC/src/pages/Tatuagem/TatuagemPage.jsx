import { useState, useEffect, useContext } from "react";
import requestGet from "../../data/utils/requestGet";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../data/context/TokenContext";
import Menu from "../../ui/components/Menu/Menu";
import TableTatuagem from "../../ui/components/TableTatuagem/TableTatuagem";
import Paginacao from "../../ui/components/Paginacao/Paginacao";
import ModalGenerico from "../../ui/components/ModalGenerico/ModalGenerico";
import Loading from "../../ui/components/Loading/Loading";
import PopupGenerico from "../../ui/components/PopupGenerico/PopupGenerico";
import "./style.css"
import requestPost from "../../data/utils/requestPost";

export default function TatuagemPage() {
    const [tatuagens, setTatuagens] = useState(null);
    const { tokenReact } = useContext(TokenContext)
    const [limiteDeValoresPorRequisicao, setLimiteDeValoresPorRequisicao] = useState(6);
    const [modalAddEnable, setModalAddEnable] = useState(false);
    const [offset, setOffset] = useState(0);
    const [atualizar, setAtualizar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tipo, setTipo] = useState("")
    const [popupSucesso, setPopupSucesso] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState("");
    const [popupErro, setPopupErro] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await requestGet("/tipo-de-tatuagem", { "limite": limiteDeValoresPorRequisicao, "deslocar": offset }, tokenReact);
                const responseData = response.data;
                setTatuagens(responseData);
                setLoading(false);
            } catch (error) {
                if (error.response.status == 401) {
                    navigate("/login")
                }
            }
        }
        fetchData();
    }, [offset, atualizar]);

    function adicionar() {
        requestPost("/tipo-de-tatuagem/inserir",
            {
                "tipo": tipo
            },
            {},
            tokenReact
        ).then(() => {
            setAtualizar(!atualizar)
            setModalAddEnable(false)
            setPopupSucesso(true)
            setConteudoPopup("Sucesso na adição do dado!!")
        }).catch(() => {
            setPopupErro(true)
            setConteudoPopup("Erro")
        });
    }

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
                <ModalGenerico
                    titulo="Adicionar tatuagem"
                    conteudo={
                        <input className="input" placeholder="Digite o tipo da tatuagem" value={tipo}
                            onChange={(event) => setTipo(event.target.value)}></input>
                    }
                    onClickAccept={
                        () => adicionar()
                    }
                    setModalEnable={setModalAddEnable}
                />
            }
            <div className="column">
                <div className="is-flex is-justify-content-flex-end mr-6">
                    <button className="button mt-4 btn-success" onClick={setModalAddEnable}>+ Adicionar</button>
                </div>
                {
                    tatuagens &&
                    <>
                        <TableTatuagem valores={tatuagens.resultado} countPagination={tatuagens.numero_de_dados_totais} limitPagination={limiteDeValoresPorRequisicao} alterOffsetPagination={setOffset} setAltualizarTabela={setAtualizar} atualizar={atualizar} />
                    </>
                }
            </div>
        </div>
    );
}

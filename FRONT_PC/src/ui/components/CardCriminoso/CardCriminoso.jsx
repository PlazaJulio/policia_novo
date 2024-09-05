import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonEditar from '../../partials/ButtonEditar';
import ButtonExcluir from '../../partials/ButtonExcluir';
import calcularIdade from "../../../data/utils/calcularIdade";
import base64EmImagem from '../../../data/utils/base64EmImagem';
import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../../data/context/TokenContext";
import ModalGenerico from '../ModalGenerico/ModalGenerico';
import PopupGenerico from '../PopupGenerico/PopupGenerico';
import requestDelete from '../../../data/utils/requestDelete';
import requestGet from "../../../data/utils/requestGet";
import requestPatch from "../../../data/utils/requestPatch";
import requestPost from "../../../data/utils/requestPost";
import Loading from '../Loading/Loading';
import ImagemEmBase64 from '../../../data/utils/ImagemEmBase64';

export default function CardCriminoso({ id, nomeCriminoso, imagem, dataNasc, atualizar, setAtualizar, criminosoObj }) {
    const dataString = dataNasc;
    const partesData = dataString.split('-');
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1;
    const dia = parseInt(partesData[2], 10);
    const data = new Date(ano, mes, dia);
    const [modalDeleteEnable, setModalDeleteEnable] = useState(false);
    const [modalViewEnable, setModalViewEnable] = useState(false);
    const [modalEditEnable, setModalEditEnable] = useState(false);
    const [popupSucesso, setPopupSucesso] = useState(false);
    const [popupErro, setPopupErro] = useState(false);
    const [conteudoPopup, setConteudoPopup] = useState("");
    const { tokenReact } = useContext(TokenContext)
    const [objMarca, setObjMarca] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalAddMarca, setModalAddMarca] = useState(false);

    const [nome, setNome] = useState(criminosoObj.nome);
    const [alcunha, setAlcunha] = useState(criminosoObj.alcunha);
    const [genero, setGenero] = useState(criminosoObj.genero);
    const [dataDeNascimento, setDataDeNascimento] = useState(criminosoObj.data_de_nascimento);
    const [pai, setPai] = useState(criminosoObj.pai);
    const [mae, setMae] = useState(criminosoObj.mae);
    const [rg, setRg] = useState(criminosoObj.rg);
    const [cpf, setCpf] = useState(criminosoObj.cpf);
    const [telefone, setTelefone] = useState(criminosoObj.telefone);
    const [obito, setObito] = useState(criminosoObj.obito);
    const [foragido, setForagido] = useState(criminosoObj.foragido);
    const [naturalidade, setNaturalidade] = useState(criminosoObj.naturalidade);
    const [nacionalidade, setNacionalidade] = useState(criminosoObj.nacionalidade);
    const [localDeTrabalho, setLocalDeTrabalho] = useState(criminosoObj.local_de_trabalho);
    const [profissao, setProfissao] = useState(criminosoObj.profissao);
    const [grauDeEscolaridade, setGrauDeEscolaridade] = useState(criminosoObj.grau_de_escolaridade);
    const [altura, setAltura] = useState(criminosoObj.altura);
    const [etnia, setEtnia] = useState(criminosoObj.etnia);
    const [porteFisico, setPorteFisico] = useState(criminosoObj.porte_fisico);
    const [corDosOlhos, setCorDosOlhos] = useState(criminosoObj.cor_dos_olhos);
    const [corDaPele, setCorDaPele] = useState(criminosoObj.cor_da_pele);
    const [corDoCabelo, setCorDoCabelo] = useState(criminosoObj.cor_do_cabelo);
    const [tipoDeCabelo, setTipoDeCabelo] = useState(criminosoObj.tipo_de_cabelo);
    const [fotoDeFrente, setFotoDeFrente] = useState("");
    const [fotoDeFrenteBase64, setFotoDeFrenteBase64] = useState("");
    const [fotoPerfilEsquerdo, setFotoPerfilEsquerdo] = useState("");
    const [fotoPerfilEsquerdoBase64, setFotoPerfilEsquerdoBase64] = useState("");
    const [fotoPerfilDireito, setFotoPerfilDireito] = useState("");
    const [fotoPerfilDireitoBase64, setFotoPerfilDireitoBase64] = useState("");
    const [cep, setCep] = useState(criminosoObj.cep);
    const [rua, setRua] = useState(criminosoObj.rua);
    const [bairro, setBairro] = useState(criminosoObj.bairro);
    const [numero, setNumero] = useState(criminosoObj.numero);
    const [complemento, setComplemento] = useState(criminosoObj.complemento);

    const [tatuagens, setTatuagens] = useState(null);
    const [tipoTatuagemAddMarcaId, setTipoTatuagemAddMarcaId] = useState(null);
    const [ehTatuagem, setEhTatuagem] = useState(false);
    const [descricaoTatuagem, setDescricaoTatuagem] = useState("")
    const [parteDoCorpo, setParteDoCorpo] = useState("")
    const [fotoMarca, setFotoMarca] = useState("")
    const [fotoMarcaBase64, setFotoMarcaBase64] = useState("")


    useEffect(() => {
        setLoading(true)
        if (!modalAddMarca) {
            setTatuagens(null)
            setTipoTatuagemAddMarcaId(1)
            setEhTatuagem(false)
            setDescricaoTatuagem("")
            setParteDoCorpo("")
            setFotoMarca("")
            setFotoMarcaBase64("")
        }
        if (!modalEditEnable) {
            setNome(criminosoObj.nome)
            setAlcunha(criminosoObj.alcunha)
            setGenero(criminosoObj.genero)
            setDataDeNascimento(criminosoObj.data_de_nascimento)
            setPai(criminosoObj.pai)
            setMae(criminosoObj.mae)
            setRg(criminosoObj.rg)
            setCpf(criminosoObj.cpf)
            setTelefone(criminosoObj.telefone)
            setObito(criminosoObj.obito)
            setForagido(criminosoObj.foragido)
            setNaturalidade(criminosoObj.naturalidade)
            setNacionalidade(criminosoObj.nacionalidade)
            setLocalDeTrabalho(criminosoObj.local_de_tabalho)
            setProfissao(criminosoObj.profissao)
            setGrauDeEscolaridade(criminosoObj.grau_de_escolaridade)
            setAltura(criminosoObj.altura)
            setEtnia(criminosoObj.etnia)
            setPorteFisico(criminosoObj.porte_fisico)
            setCorDaPele(criminosoObj.cor_da_pele)
            setCorDoCabelo(criminosoObj.cor_do_cabelo)
            setCorDosOlhos(criminosoObj.cor_dos_olhos)
            setTipoDeCabelo(criminosoObj.tipo_de_cabelo)
            setFotoDeFrente("")
            setFotoDeFrenteBase64("")
            setFotoPerfilDireito("")
            setFotoPerfilDireitoBase64("")
            setFotoPerfilEsquerdo("")
            setFotoPerfilEsquerdoBase64("")
            setCep(criminosoObj.cep)
            setRua(criminosoObj.rua)
            setBairro(criminosoObj.bairro)
            setNumero(criminosoObj.numero)
            setComplemento(criminosoObj.complemento)
        }

        const fetchDataMarca = async () => {
            try {
                const responseMarca = await requestGet("/marca/criminoso/" + id, {}, tokenReact);
                const responseDataMarca = await Promise.all(responseMarca.data.map(async (marca) => {
                    const pegarTipoDeTatuagem = async () => {
                        if (marca.tipo_de_tatuagem_id != null) {
                            const tipo = await requestGet("/tipo-de-tatuagem/" + marca.tipo_de_tatuagem_id, {}, tokenReact);
                            return tipo.data.tipo;
                        }
                        return null;
                    }
                    marca.tipo_de_tatuagem = await pegarTipoDeTatuagem();
                    return marca;
                }));
                const responseTatuagens = await requestGet("/tipo-de-tatuagem", { "limite": 999 }, tokenReact);
                const responseTatuagensData = responseTatuagens.data.resultado;
                if (responseDataMarca.length > 0) {
                    setObjMarca(responseDataMarca);
                }
                else {
                    setObjMarca(null)
                }
                if (responseTatuagensData != null) {
                    setTatuagens(responseTatuagensData)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataMarca();
        setLoading(false);

    }, [modalViewEnable, modalDeleteEnable, modalEditEnable, modalAddMarca]);

    async function deletarMarca(id) {
        await requestDelete("/marca/" + id, {}, tokenReact)
        setModalViewEnable(false)
        setAtualizar(!atualizar)
    }

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
            loading &&
            <Loading />
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
                            <span>Nome:</span>
                            <input className="input" placeholder="Nome" value={nome}
                                onChange={(event) => setNome(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <span>Alcunha:</span>
                            <input className="input" placeholder="Alcunha" value={alcunha}
                                onChange={(event) => setAlcunha(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Genero:</p>
                            <div className="select">
                                <select value={genero}
                                    onChange={(event) => setGenero(event.target.value)}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Data de nascimento:</p>
                            <input className="input" type='date' value={dataDeNascimento}
                                onChange={(event) => setDataDeNascimento(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Nome do pai:</p>
                            <input className="input" placeholder="Nome do pai" value={pai}
                                onChange={(event) => setPai(event.target.value)}></input>
                        </div>


                        <div className='mb-3'>
                            <p>Nome da mãe:</p>
                            <input className="input" placeholder="Nome da mãe" value={mae}
                                onChange={(event) => setMae(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>RG:</p>
                            <input className="input" placeholder="RG" value={rg}
                                onChange={(event) => setRg(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>CPF:</p>
                            <input className="input" placeholder="Cpf" value={cpf}
                                onChange={(event) => setCpf(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Telefone:</p>
                            <input className="input" placeholder="Telefone" value={telefone}
                                onChange={(event) => setTelefone(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <div>
                                <label className='checkbox'>
                                    <input type='checkbox' value={obito}
                                        checked={obito}
                                        onChange={() => setObito(!obito)}></input>
                                    Obito
                                </label>
                            </div>

                            <div>
                                <label className='checkbox'>
                                    <input type="checkbox" value={foragido}
                                        checked={foragido}
                                        onChange={() => setForagido(!foragido)}></input>
                                    Foragido
                                </label>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Naturalidade:</p>
                            <input className="input" placeholder="Naturalidade" value={naturalidade}
                                onChange={(event) => setNaturalidade(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Nacionalidade:</p>
                            <input className="input" placeholder="Nacionalidade" value={nacionalidade}
                                onChange={(event) => setNacionalidade(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Local de trabalho:</p>
                            <input className="input" placeholder="Local de tabalho" value={localDeTrabalho}
                                onChange={(event) => setLocalDeTrabalho(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Profissão:</p>
                            <input className="input" placeholder="Profissao" value={profissao}
                                onChange={(event) => setProfissao(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Grau de Escolaridade:</p>
                            <div className="select">
                                <select value={grauDeEscolaridade}
                                    onChange={(event) => setGrauDeEscolaridade(event.target.value)}>
                                    <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
                                    <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
                                    <option value="Ensino Medio Incompleto">Ensino Médio Incompleto</option>
                                    <option value="Ensino Medio Completo">Ensino Médio Completo</option>
                                    <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                                    <option value="Ensino Superior Completo">Ensino Superior Completo</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>


                        <div className='mb-3'>
                            <p>Altura:</p>
                            <input className="input" placeholder="Altura" value={altura}
                                onChange={(event) => setAltura(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Etnia:</p>
                            <input className="input" placeholder="Etnia" value={etnia}
                                onChange={(event) => setEtnia(event.target.value)}></input>
                        </div>


                        <div className='mb-3'>
                            <p>Porte fisico:</p>
                            <div className="select">
                                <select value={porteFisico}
                                    onChange={(event) => setPorteFisico(event.target.value)}>
                                    <option value="Magro">Magro</option>
                                    <option value="Médio">Médio</option>
                                    <option value="Gordo">Gordo</option>
                                    <option value="Forte">Forte</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Cor dos olhos:</p>
                            <div>
                                <div className="select">
                                    <select value={corDosOlhos}
                                        onChange={(event) => setCorDosOlhos(event.target.value)}>
                                        <option value="Azul">Azul</option>
                                        <option value="Castanho">Castanho claro</option>
                                        <option value="Verde">Verde</option>
                                        <option value="Castanho escuro">Castanho escuro</option>
                                        <option value="Ambar">Ambar</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Cor da pele:</p>
                            <div>
                                <div className="select">
                                    <select value={corDaPele}
                                        onChange={(event) => setCorDaPele(event.target.value)}>
                                        <option value="Amarelo">Amarelo</option>
                                        <option value="Branco">Branco</option>
                                        <option value="Indigena">Indigena</option>
                                        <option value="Preto">Preto</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Cor do cabelo:</p>
                            <div>
                                <div className="select">
                                    <select placeholder="Cor do cabelo" value={corDoCabelo}
                                        onChange={(event) => setCorDoCabelo(event.target.value)}>
                                        <option value="Preto">Preto</option>
                                        <option value="Castanho">Castaho</option>
                                        <option value="Loiro">Loiro</option>
                                        <option value="Ruivo">Ruivo</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Tipo de cabelo:</p>
                            <div>
                                <div className="select">
                                    <select value={tipoDeCabelo}
                                        onChange={(event) => setTipoDeCabelo(event.target.value)}>
                                        <option value="Encaracolado">Encaracolado</option>
                                        <option value="Liso">Liso</option>
                                        <option value="Careca">Careca</option>
                                        <option value="Calvo">Calvo</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <p>Foto de frente:</p>
                            <input type="file" className="input" value={fotoDeFrente}
                                onChange={async (event) => {
                                    setFotoDeFrente(event.target.value)
                                    const imgBase64 = await ImagemEmBase64(event.target.files[0])
                                    setFotoDeFrenteBase64(imgBase64.split(',')[1])
                                }}></input>
                        </div>
                        <div className='mb-3'>
                            <p>Foto de perfil esquerdo:</p>
                            <input type="file" className='input' value={fotoPerfilEsquerdo}
                                onChange={async (event) => {
                                    setFotoPerfilEsquerdo(event.target.value)
                                    const imgBase64 = await ImagemEmBase64(event.target.files[0])
                                    setFotoPerfilEsquerdoBase64(imgBase64.split(',')[1])
                                }}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Foto de perfil direito:</p>
                            <input type="file" className="input" placeholder="Foto de perfil direito" value={fotoPerfilDireito}
                                onChange={async (event) => {
                                    setFotoPerfilDireito(event.target.value)
                                    const imgBase64 = await ImagemEmBase64(event.target.files[0])
                                    setFotoPerfilDireitoBase64(imgBase64.split(',')[1])
                                }}></input>
                        </div>

                        <div className='mb-3'>
                            <p>CEP:</p>
                            <input className="input" placeholder="CEP" value={cep}
                                onChange={(event) => setCep(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Rua:</p>
                            <input className="input" placeholder="Rua" value={rua}
                                onChange={(event) => setRua(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Bairro:</p>
                            <input className="input" placeholder="Bairro" value={bairro}
                                onChange={(event) => setBairro(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Numero:</p>
                            <input className="input" placeholder="Numero" value={numero}
                                onChange={(event) => setNumero(event.target.value)}></input>
                        </div>

                        <div className='mb-3'>
                            <p>Complemento:</p>
                            <input className="input" placeholder="Complemento" value={complemento}
                                onChange={(event) => setComplemento(event.target.value)}></input>
                        </div>
                    </>
                }
                onClickAccept={
                    () => {
                        requestPatch("/criminoso/" + criminosoObj.id,
                            {
                                "nome": nome,
                                "alcunha": alcunha,
                                "genero": genero,
                                "data_de_nascimento": dataDeNascimento,
                                "pai": pai,
                                "mae": mae,
                                "rg": rg,
                                "cpf": cpf,
                                "telefone": telefone,
                                "obito": obito,
                                "foragido": foragido,
                                "naturalidade": naturalidade,
                                "nacionalidade": nacionalidade,
                                "local_de_tabalho": localDeTrabalho,
                                "profissao": profissao,
                                "grau_de_escolaridade": grauDeEscolaridade,
                                "altura": altura,
                                "etnia": etnia,
                                "porte_fisico": porteFisico,
                                "cor_da_pele": corDaPele,
                                "cor_dos_olhos": corDosOlhos,
                                "cor_do_cabelo": corDoCabelo,
                                "tipo_de_cabelo": tipoDeCabelo,
                                "foto_frente": fotoDeFrente == "" ? criminosoObj.foto_frente : fotoDeFrenteBase64,
                                "foto_perfil_esquerdo": fotoPerfilEsquerdo == '' ? criminosoObj.foto_perfil_esquerdo : fotoPerfilEsquerdoBase64,
                                "foto_perfil_direito": fotoPerfilDireito == '' ? criminosoObj.foto_perfil_direito : fotoPerfilDireitoBase64,
                                "cep": cep,
                                "rua": rua,
                                "bairro": bairro,
                                "numero": numero,
                                "complemento": complemento
                            }, {}, tokenReact).then(
                                () => {
                                    setPopupSucesso(true)
                                    setConteudoPopup("Alteração feita com sucesso!")
                                }
                            ).catch(
                                () => {
                                    setPopupErro(true)
                                    setConteudoPopup("erro")
                                }
                            )
                        setModalEditEnable(false)
                        setAtualizar(!atualizar)
                    }
                }
            />
        }
        {
            modalDeleteEnable &&
            <ModalGenerico setModalEnable={setModalDeleteEnable}
                titulo="Deletar"
                conteudo={<p>Você tem certeza que deseja DELETAR esse dado? ({nomeCriminoso})</p>}
                onClickAccept={
                    () => {
                        requestDelete("/criminoso/" + id, {}, tokenReact).then(
                            () => {
                                setModalDeleteEnable(false);
                                setAtualizar(!atualizar);
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
        {
            modalAddMarca &&
            <ModalGenerico setModalEnable={setModalAddMarca}
                titulo="Adicionar marca"
                conteudo={
                    <>
                        <p className='is-size-5 mb-3'>Adicionar marca do criminoso: {criminosoObj.nome}</p>
                        <div className='mb-3'>
                            <label className='checkbox'>
                                <input type='checkbox' value={ehTatuagem}
                                    checked={ehTatuagem}
                                    onChange={() => setEhTatuagem(!ehTatuagem)}></input>
                                É uma tatuagem
                            </label>
                        </div>
                        <div className='mb-3'>
                            <p>Descrição da marca:</p>
                            <input className='input' placeholder='Descricao da marca' value={descricaoTatuagem} onChange={(event) => setDescricaoTatuagem(event.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <p>Parte do corpo:</p>
                            <input className='input' placeholder='Parte do corpo com a marca' type='text' value={parteDoCorpo} onChange={(event) => setParteDoCorpo(event.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <p>Foto da marca:</p>
                            <input type="file" className="input" value={fotoMarca}
                                onChange={async (event) => {
                                    setFotoMarca(event.target.value)
                                    const imgBase64 = await ImagemEmBase64(event.target.files[0])
                                    setFotoMarcaBase64(imgBase64.split(',')[1])
                                }}></input>
                        </div>
                        {
                            ehTatuagem &&
                            <div className='mb-3'>
                                <p>Tipo da tatuagem:</p>
                                <div className="select">
                                    <select value={tipoTatuagemAddMarcaId}
                                        onChange={(event) => setTipoTatuagemAddMarcaId(event.target.value)}>
                                        {tatuagens.map((tatuagem) => {
                                            return <option value={tatuagem.id}>{tatuagem.tipo}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        }
                    </>
                }
                onClickAccept={
                    () => {
                        requestPost("/marca/inserir", {
                            cicatriz_ou_tatuagem: ehTatuagem ? "t" : "c",
                            descricao: descricaoTatuagem,
                            parte_do_corpo: parteDoCorpo,
                            foto: fotoMarcaBase64,
                            tipo_de_tatuagem_id: tipoTatuagemAddMarcaId,
                            criminoso_id: criminosoObj.id
                        }, {}, tokenReact).then(() => {
                            setModalAddMarca(false);
                            setAtualizar(!atualizar);
                            setPopupSucesso(true)
                            setConteudoPopup("Marca adicionada com sucesso!")
                        }).catch(() => {
                            setPopupErro(true)
                            setConteudoPopup("Erro")
                        }
                        )
                    }
                }
            />
        }
        {
            modalViewEnable &&
            <ModalGenerico setModalEnable={setModalViewEnable}
                titulo="Dados do criminoso:"
                conteudo={
                    <ul>
                        <b><span className='is-size-4'>Dados pessoais:</span></b>
                        <li><b>Nome:</b> {criminosoObj.nome}</li>
                        <li><b>Alcunha:</b> {criminosoObj.alcunha}</li>
                        <li><b>Genero:</b> {criminosoObj.genero}</li>
                        <li><b>Data de nascimento:</b> {data.toLocaleDateString("pt-BR")}</li>
                        <li><b>Nome do pai:</b> {criminosoObj.pai}</li>
                        <li><b>Nome da mãe:</b> {criminosoObj.mae}</li>
                        <li><b>RG:</b> {criminosoObj.rg}</li>
                        <li><b>CPF:</b> {criminosoObj.cpf}</li>
                        <li><b>Telefone:</b> {criminosoObj.telefone}</li>
                        <li><b>Obito:</b> {criminosoObj.obito ? "Verdade" : "Falso"}</li>
                        <li><b>Foragido:</b> {criminosoObj.foragido ? "Verdade" : "Falso"}</li>
                        <li><b>Naturalidade:</b> {criminosoObj.naturalidade}</li>
                        <li><b>Nacionalidade:</b> {criminosoObj.nacionalidade}</li>
                        <li><b>Local de trabalho:</b> {criminosoObj.local_de_trabalho}</li>
                        <li><b>Profissao:</b> {criminosoObj.profissao}</li>
                        <li><b>Grau de Escolaridade:</b> {criminosoObj.grau_de_escolaridade}</li>
                        <hr></hr>
                        <b><span className='is-size-4'>Dados fisicos:</span></b>
                        <li><b>Altura:</b> {criminosoObj.altura}</li>
                        <li><b>Etnia:</b> {criminosoObj.etnia}</li>
                        <li><b>Porte Fisico:</b> {criminosoObj.porte_fisico}</li>
                        <li><b>Cor dos Olhos:</b> {criminosoObj.cor_dos_olhos}</li>
                        <li><b>Cor da pele:</b> {criminosoObj.cor_da_pele}</li>
                        <li><b>Cor do cabelo:</b> {criminosoObj.cor_do_cabelo}</li>
                        <li><b>Tipo de cabelo:</b> {criminosoObj.tipo_de_cabelo}</li>
                        <hr></hr>
                        <b><span className='is-size-4'>Fotos:</span></b>
                        <li><b>Foto de frente:</b> <figure className='image  is-128x128'><img src={base64EmImagem(criminosoObj.foto_frente)}></img></figure></li>
                        <li><b>Foto perfil esquerdo:</b> <figure className='image  is-128x128'><img src={base64EmImagem(criminosoObj.foto_perfil_esquerdo)}></img></figure></li>
                        <li><b>Foto perfil direito:</b> <figure className='image  is-128x128'><img src={base64EmImagem(criminosoObj.foto_perfil_direito)}></img></figure></li>
                        <hr></hr>
                        <b><span className='is-size-4'>Endereço:</span></b>
                        <li><b>CEP:</b> {criminosoObj.cep}</li>
                        <li><b>Rua:</b> {criminosoObj.rua}</li>
                        <li><b>Bairro:</b> {criminosoObj.bairro}</li>
                        <li><b>Numero da residencia:</b> {criminosoObj.numero}</li>
                        <li><b>Complemento:</b> {criminosoObj.complemento}</li>
                        {
                            objMarca &&
                            objMarca.map((tatuagem, index) => {
                                return <div className='mb-4'>
                                    <hr></hr>
                                    <b><span className='is-size-4'>{index + 1}º - Marca</span></b>
                                    <li><b>Cicatriz ou tatuagem:</b> {tatuagem.cicatriz_ou_tatuagem == 'c' ? "cicatriz" : "tatuagem"}</li>
                                    <li><b>Tipo da tatuagem: </b> {tatuagem.tipo_de_tatuagem == null ? "Não é uma tatuagem" : tatuagem.tipo_de_tatuagem}</li>
                                    <li><b>Descrição da marca:</b> {tatuagem.descricao}</li>
                                    <li><b>Parte do corpo com a marca:</b> {tatuagem.parte_do_corpo}</li>
                                    <li><b>Foto:</b> <figure className='image  is-128x128'><img src={base64EmImagem(tatuagem.foto)}></img></figure></li>
                                    <button className='button is-danger mt-2' onClick={() => deletarMarca(tatuagem.id)}>Excluir Marca</button>
                                </div>
                            })
                        }
                        <div className='mt-4'>
                            <button className='button is-success' onClick={() => {
                                setModalAddMarca(true)
                                setModalViewEnable(false)
                            }}>Adicionar marca +</button>
                        </div>
                    </ul>
                }
            />
        }

        <div className="card m-2">
            <figure className="card-image" onClick={() => setModalViewEnable(true)}>
                <img src={base64EmImagem(imagem)} />
            </figure>
            <div className="card-content" onClick={() => setModalViewEnable(true)}>
                <p><b>{nomeCriminoso}</b></p>
                <p><i>{data.toLocaleDateString("pt-BR")} - {calcularIdade(ano, mes, dia)}</i></p>
            </div>
            <div className="card-footer is-flex is-justify-content-center">
                <div className='mr-4 mt-4 mb-4'>
                    <ButtonEditar onHandle={() => setModalEditEnable(true)} >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </ButtonEditar>
                </div>
                <div className='mt-4 mb-4'>
                    <ButtonExcluir onHandle={() => setModalDeleteEnable(true)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </ButtonExcluir>
                </div>

            </div>
        </div>
    </>
}


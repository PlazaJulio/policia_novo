import { useState } from "react"

export default function Paginacao({count, limit, alterOffset}){
    const [paginaAtual, setPaginaAtual] = useState(1);
    const quantidadeDePaginasNaTela = Math.ceil(count/limit) > 5? 5 : Math.ceil(count/limit);
    const totalDePaginas = (count / limit) > 1 ? Math.ceil(count/limit) : 1;
    const quantidadeDePaginaAEsquerda = 2;
    const primeiraPagina = (paginaAtual-quantidadeDePaginaAEsquerda) > 1 ? paginaAtual-quantidadeDePaginaAEsquerda : 1;

    function logicaDeAlteracaoDePaginacao(valor){
        if(valor == 1){
            alterOffset(0)
        }else{
            alterOffset(((valor-1)*limit))
        }
        setPaginaAtual(valor)
    }

    function gerarNumeracao(arrayComValoresCorretos){
        return arrayComValoresCorretos.map((valor, index) => {
            if(valor == paginaAtual){
                return <li key={index} className="pagination-link is-current">{valor}</li>
            }
            else if((primeiraPagina+index) <= totalDePaginas){
                return <li key={index} className="pagination-link" onClick={()=>logicaDeAlteracaoDePaginacao(valor)}>{valor}</li>
            }
        })
    }

    function gerarPaginas(){
        const arrayDePaginasInicial = Array(quantidadeDePaginasNaTela).fill(null)
        const arrayComValoresCorretos = arrayDePaginasInicial.map((_, index)=>{
            return index+primeiraPagina
        });
        return gerarNumeracao(arrayComValoresCorretos)
    }

    return <nav className="pagination" role="navigation">
        <ul className="pagination-list is-flex is-justify-content-center">
            {
                gerarPaginas()
            }
        </ul>
    </nav>
}
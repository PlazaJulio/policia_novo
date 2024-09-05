export default function ModalGenerico({ setModalEnable, titulo, conteudo, onClickAccept }) {
  return <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{titulo}</p>
        <button className="delete" onClick={() => setModalEnable(false)} aria-label="close" ></button>
      </header>
      <section className="modal-card-body">
        {conteudo}
      </section>
      <footer className="modal-card-foot">
        {
          onClickAccept &&
          <>
            <button className="button is-success" onClick={onClickAccept}>Aceitar</button>
            <button className="button" onClick={() => setModalEnable(false)}>Cancel</button>
          </>
        }
      </footer>
    </div>
  </div>
}
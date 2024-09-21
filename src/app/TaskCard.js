"use client";

import React, { useState } from 'react';

const TaskCard = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [indiceExcluir, setIndiceExcluir] = useState(null);

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, { nome: novaTarefa, feita: false }]);
      setNovaTarefa('');
      setModalAberto(false);
    }
  };

  const marcarFeita = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].feita = !novasTarefas[index].feita;
    setTarefas(novasTarefas);
  };

  const abrirModalExcluir = (index) => {
    setIndiceExcluir(index);
    setModalExcluirAberto(true);
  };

  const removerTarefa = () => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(indiceExcluir, 1);
    setTarefas(novasTarefas);
    setModalExcluirAberto(false);
    setIndiceExcluir(null);
  };

  const tarefasNaoFeitas = tarefas.filter(tarefa => !tarefa.feita);
  const tarefasFeitas = tarefas.filter(tarefa => tarefa.feita);

  return (
    <div style={estilos.container}>
      <div style={estilos.card}>
        <h2 style={estilos.titulo}>Suas tarefas hoje</h2>

        {tarefasNaoFeitas.map((tarefa, index) => {
          const tarefaOriginalIndex = tarefas.indexOf(tarefa);
          return (
            <div
              key={tarefaOriginalIndex}
              style={estilos.tarefa}
              onClick={() => marcarFeita(tarefaOriginalIndex)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7F9FD")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <input
                type="checkbox"
                checked={tarefa.feita}
                onChange={() => marcarFeita(tarefaOriginalIndex)}
                style={estilos.checkbox}
              />
              <span style={estilos.tarefaNome}>{tarefa.nome}</span>
              <button onClick={(e) => { e.stopPropagation(); abrirModalExcluir(tarefaOriginalIndex); }} style={estilos.lixeira}>
                <img src="/lixeira.png" alt="Deletar tarefa" style={estilos.iconeLixeira} />
              </button>
            </div>
          );
        })}

        {tarefasFeitas.length > 0 && <h3 style={estilos.tituloFinalizadas}>Tarefas finalizadas</h3>}
        {tarefasFeitas.map((tarefa, index) => {
          const tarefaOriginalIndex = tarefas.indexOf(tarefa);
          return (
            <div key={tarefaOriginalIndex} style={estilos.tarefaFeita}>
              <input
                type="checkbox"
                checked={tarefa.feita}
                onChange={() => marcarFeita(tarefaOriginalIndex)}
                style={estilos.checkbox}
              />
              <span style={estilos.tarefaNomeFeito}>{tarefa.nome}</span>
              <button onClick={() => abrirModalExcluir(tarefaOriginalIndex)} style={estilos.lixeira}>
                <img src="/lixeira.png" alt="Deletar tarefa" style={estilos.iconeLixeira} />
              </button>
            </div>
          );
        })}
      </div>

      <button onClick={() => setModalAberto(true)} style={estilos.botaoAdicionar}>
        Adicionar nova tarefa
      </button>

      {modalAberto && (
        <div style={estilos.modal}>
          <div style={estilos.modalConteudo}>
            <h2>Nova Tarefa</h2>
            <h3>Titulo</h3>
            <input
              type="text"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              placeholder="Digite o nome da tarefa"
              style={estilos.input}
            />
            <button onClick={() => setModalAberto(false)} style={estilos.botaoCancelar}>
              Cancelar
            </button>
            <button onClick={adicionarTarefa} style={estilos.botaoAdicionar2}>
              Adicionar
            </button>
          </div>
        </div>
      )}

      {modalExcluirAberto && (
        <div style={estilos.modal}>
          <div style={estilos.modalConteudo}>
            <h1>Deletar tarefa</h1>
            <h3>Tem certeza que deseja excluir esta tarefa?</h3>
            <button onClick={() => setModalExcluirAberto(false)} style={estilos.botaoCancelar}>
              Cancelar
            </button>
            <button onClick={removerTarefa} style={estilos.botaoExcluir}>
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const estilos = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  saudacao: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    border: '1px solid #EAECF0',
    boxShadow: '0,1,2, #101928',
    marginBottom: '20px',
  },
  titulo: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#0000008A',
    fontSize: '16px',
    fontWeight: 700,
  },
  tituloFinalizadas: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#0000008A',
    fontSize: '16px',
    fontWeight: 700,
  },
  tarefa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    border: '1px dotted #ccc',
    padding: '16px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 700,
  },
  tarefaFeita: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px dotted #ccc',
    padding: '16px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 700,
    color: '#0000008A',
  },
  tarefaNome: {
    flex: '1',
    textAlign: 'left',
  },
  tarefaNomeFeito: {
    flex: '1',
    textAlign: 'left',
    textDecoration: 'line-through',
  },
  checkbox: {
    marginRight: '10px',
  },
  lixeira: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  iconeLixeira: {
    width: '24px',
    height: '24px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  botaoAdicionar: {
    padding: '20px 175px',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #0796D3, #53C0F0)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  botaoAdicionar2: {
    padding: '15px 50px',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #0796D3, #53C0F0)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft: '10px',
    transition: 'background 0.3s ease',
    fontSize: '16px',
  },
  botaoCancelar: {
    padding: '15px 50px',
    borderRadius: '8px',
    backgroundColor: '#E7EEFB',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft: '10px',
    fontSize: '16px',
    color: '#000',
  },
  botaoExcluir: {
    padding: '15px 50px',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #D30707, #F05353)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    transition: 'background 0.3s ease',
    marginLeft: '16px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalConteudo: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'left',
    Weight: "500",
    marginBottom: '200px',
    color: '#0000008A',
    fontSize: '16px',
    fontWeight: 800,
  },
};

export default TaskCard;
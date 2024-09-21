"use client";

import React, { useState, useEffect } from 'react';

const formatarData = () => {
  const dataAtual = new Date();
  const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoes);

  dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  return dataFormatada;
};

const Header = () => {
  const [nome, setNome] = useState('');
  const [inputNome, setInputNome] = useState('');
  const [modalAberto, setModalAberto] = useState(true);


  const handleMudarNome = () => {
    if (inputNome.trim() !== '') {
      setNome(inputNome);
      setInputNome('');
      setModalAberto(false);
    }
  };


  useEffect(() => {
    setModalAberto(true);
  }, []);

  return (
    <header style={estilos.header}>
      <div style={estilos.logo}>
        <img src="../focalpoint.png" alt="Logo" style={estilos.img} />
      </div>

      <div style={estilos.mensagem}>
        <h2>Bem vindo de volta, {nome || "Usuário"}</h2>
      </div>

      <div style={estilos.data}>
        <p>{formatarData()}</p>
      </div>

      {modalAberto && (
        <div style={estilos.modal}>
          <div style={estilos.modalConteudo}>
            <h2>Digite seu nome</h2>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={inputNome}
              onChange={(e) => setInputNome(e.target.value)}
              style={estilos.input}
            />
            <button onClick={handleMudarNome} style={estilos.botao}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const estilos = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 56px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    display: 'flex',
    width: '150px',
    height: '36px',
    alignItems: 'center',
    flex: '1',
  },
  img: {
    width: '150px',
    marginRight: '10px',
  },
  nomeApp: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  mensagem: {
    flex: '2',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '24px'
  },
  data: {
    flex: '1',
    textAlign: 'right',
    fontWeight: '700',
    fontSize: '16px',
    color: '#0000008A',
  },
  input: {
    padding: '5px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  botao: {
    padding: '5px 10px',
    backgroundColor: '#0796D3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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
    padding: '40px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
};

export default Header;
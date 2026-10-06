import { mockUsuarios } from '../dadosMockados/servicos.js';

let usuarioAtual = null;

export function entrar(email, senha) {
  const usuario = mockUsuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    usuarioAtual = usuario;
    return { sucesso: true, usuario };
  }
  return { sucesso: false, mensagem: 'Credenciais inválidas.' };
}

export function sair() {
  usuarioAtual = null;
}

export function getUsuarioAtual() {
  return usuarioAtual;
}
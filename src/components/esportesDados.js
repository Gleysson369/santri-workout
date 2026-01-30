export const LISTA_ESPORTES = [
  { nome: "Basquete", tipo: "pontos" },
  { nome: "Beach Tennis", tipo: "pontos" },
  { nome: "Boxe", tipo: "pontos" },
  { nome: "Caminhada", tipo: "distancia" },
  { nome: "Ciclismo", tipo: "distancia" },
  { nome: "Corrida", tipo: "distancia" },
  { nome: "Futebol", tipo: "pontos" },
  { nome: "Futebol Americano", tipo: "pontos" },
  { nome: "Handebol", tipo: "pontos" },
  { nome: "Jiu-Jitsu", tipo: "pontos" },
  { nome: "Judô", tipo: "pontos" },
  { nome: "Luta", tipo: "pontos" },
  { nome: "Natação", tipo: "distancia" },
  { nome: "Tênis", tipo: "pontos" },
  { nome: "Tênis de Mesa", tipo: "pontos" },
  { nome: "Vôlei", tipo: "pontos" },
  { nome: "Vôlei de Praia", tipo: "pontos" }
].sort((a, b) => a.nome.localeCompare(b.nome));
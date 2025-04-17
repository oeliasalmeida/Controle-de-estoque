
import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from './taste.png';

export default function EstoquePainel() {
  const [produtos, setProdutos] = useState([
    { nome: "Detergente liquido neutro 5L", marca: "D'Visão", qtd: 22, minimo: 10 },
    { nome: "Sabonete líquido antisséptico triclosan 0,3% 5L", marca: "Premisse", qtd: 20, minimo: 10 },
    { nome: "Álcool líquido 70 etílico hidratado 5L", marca: "Clarity", qtd: 20, minimo: 10 },
    { nome: "Pulverizador plástico transparente com válvula 500ML", marca: "Nobre", qtd: 50, minimo: 10 },
    { nome: "Pano descartável multiuso azul 28CMx240M", marca: "Vabene", qtd: 39, minimo: 10 },
    { nome: "Esponja dupla face esfrebom", marca: "Bettanin", qtd: 28, minimo: 10 },
    { nome: "Esponja dupla face azul antiaderente (3un)", marca: "Scotch Brite", qtd: 4, minimo: 10 },
    { nome: "Papel higiênico rolão folha simples 100% celulose (8 rolos)", marca: "Eco Prime", qtd: 400, minimo: 10 },
    { nome: "Papel toalha branco soft 700 folhas", marca: "SD", qtd: 500, minimo: 10 },
    { nome: "Sabonete líquido perolado dowex 5L", marca: "Girassol", qtd: 5, minimo: 10 },
    { nome: "Saco plástico lixo transparente 300L reforçado (100un)", marca: "SMR", qtd: 47, minimo: 10 },
    { nome: "Saco plástico lixo transparente 240L reforçado (100un)", marca: "SMR", qtd: 20, minimo: 10 },
    { nome: "Saco plástico lixo transparente 100L S6 (100un)", marca: "SMR", qtd: 10, minimo: 10 },
    { nome: "Saco plástico lixo transparente 60L (100un)", marca: "SMR", qtd: 30, minimo: 10 },
    { nome: "Pano de chão combat branco 40x60CM", marca: "Souza", qtd: 50, minimo: 10 },
    { nome: "Suporte para papel interfolhado 2/3 dobras", marca: "Nobre", qtd: 12, minimo: 10 },
    { nome: "Bobina picotada transparente 30x40CM", marca: "Rollbag", qtd: 4, minimo: 10 },
    { nome: "Luva multiuso limpeza amarela - Tam. P", marca: "Nobre", qtd: 2, minimo: 10 },
    { nome: "Luva multiuso limpeza amarela - Tam. M", marca: "Nobre", qtd: 4, minimo: 10 },
    { nome: "Luva multiuso limpeza amarela - Tam. G", marca: "Nobre", qtd: 4, minimo: 10 },
    { nome: "Água sanitária 5L", marca: "Girassol", qtd: 5, minimo: 10 },
    { nome: "Desinfetante lavanda 5L", marca: "Girassol", qtd: 5, minimo: 10 },
    { nome: "Papel toalha 700 folhas 100% celulose", marca: "Panda Paper", qtd: 40, minimo: 10 },
    { nome: "Esponja de aço com 8UN", marca: "Assolan", qtd: 20, minimo: 10 },
    { nome: "Tela para mictório cereja roxo", marca: "Premisse", qtd: 50, minimo: 10 }
  ]);
  
  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(produtos.map(p => ({
      Produto: p.nome,
      Marca: p.marca,
      Quantidade: p.qtd,
      Minimo: p.minimo
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Estoque");
    XLSX.writeFile(wb, "estoque_limpeza_taste2025.xlsx");
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Estoque Limpeza - Taste 2025", 14, 16);
    const tableData = produtos.map(p => [p.nome, p.marca, p.qtd, p.minimo]);
    doc.autoTable({
      head: [["Produto", "Marca", "Quantidade", "Mínimo"]],
      body: tableData,
      startY: 22
    });
    doc.save("estoque_limpeza_taste2025.pdf");
  };

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [log, setLog] = useState([]);
  const [novo, setNovo] = useState({ nome: "", marca: "", qtd: 0, minimo: 5 });

  const movimentar = (tipo) => {
    if (!produtoSelecionado) return;
    const atualizados = produtos.map(p => {
      if (p.nome === produtoSelecionado.nome) {
        const novaQtd = tipo === "entrada" ? p.qtd + 1 : Math.max(0, p.qtd - 1);
        return { ...p, qtd: novaQtd };
      }
      return p;
    });
    setProdutos(atualizados);
    setLog([{ produto: produtoSelecionado.nome, tipo, data: new Date().toLocaleString() }, ...log]);
  };

  const adicionarProduto = () => {
    if (novo.nome && novo.marca) {
      setProdutos([...produtos, { ...novo, qtd: parseInt(novo.qtd), minimo: parseInt(novo.minimo) }]);
      setNovo({ nome: "", marca: "", qtd: 0, minimo: 5 });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6 gap-4">
        <img src={logo} alt="Logo Taste" className="h-12" />
        <h1 className="text-3xl font-bold">Estoque Limpeza - Taste 2025</h1>
      </div>

      
      <div className="flex gap-4 mb-4">
        <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded">Exportar Excel</button>
        <button onClick={exportarPDF} className="bg-indigo-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>
<div className="mb-6">
        <label className="block font-semibold mb-1">Selecionar Produto:</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setProdutoSelecionado(produtos.find(p => p.nome === e.target.value))
          }
        >
          <option value="">-- Escolha um produto --</option>
          {produtos.map((p, i) => (
            <option key={i} value={p.nome}>{p.nome}</option>
          ))}
        </select>
      </div>

      {produtoSelecionado && (
        <div className="bg-white border p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Informações do Produto</h2>
          <p><strong>Nome:</strong> {produtoSelecionado.nome}</p>
          <p><strong>Marca:</strong> {produtoSelecionado.marca}</p>
          <p><strong>Quantidade:</strong> {produtoSelecionado.qtd}</p>
          <div className="mt-2">
            <button onClick={() => movimentar('entrada')} className="px-3 py-1 mr-2 bg-green-500 text-white rounded">+ Entrada</button>
            <button onClick={() => movimentar('saida')} className="px-3 py-1 bg-red-500 text-white rounded">– Saída</button>
          </div>
        </div>
      )}

      <table className="w-full border mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Marca</th>
            <th className="p-2 border text-center">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i} className={p.qtd <= p.minimo ? (p.qtd <= 5 ? 'bg-red-200' : 'bg-yellow-100') : ''}>
              <td className="p-2 border">{p.nome}</td>
              <td className="p-2 border">{p.marca}</td>
              <td className="p-2 border text-center">{p.qtd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white p-4 mb-6 border rounded shadow">
        <h2 className="text-lg font-bold mb-3">Cadastrar Novo Produto</h2>
        <input className="border p-2 mr-2 mb-2 rounded" placeholder="Nome" value={novo.nome} onChange={e => setNovo({ ...novo, nome: e.target.value })} />
        <input className="border p-2 mr-2 mb-2 rounded" placeholder="Marca" value={novo.marca} onChange={e => setNovo({ ...novo, marca: e.target.value })} />
        <input type="number" className="border p-2 mr-2 mb-2 rounded" placeholder="Qtd" value={novo.qtd} onChange={e => setNovo({ ...novo, qtd: e.target.value })} />
        <input type="number" className="border p-2 mr-2 mb-2 rounded" placeholder="Mínimo" value={novo.minimo} onChange={e => setNovo({ ...novo, minimo: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={adicionarProduto}>Adicionar</button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Histórico de Movimentações</h2>
        <ul className="list-disc pl-5 space-y-1">
          {log.map((item, i) => (
            <li key={i}>{item.data} - {item.tipo.toUpperCase()} - {item.produto}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

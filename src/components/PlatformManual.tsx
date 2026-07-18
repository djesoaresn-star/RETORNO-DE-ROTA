import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Shield, 
  Truck, 
  Settings, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Sparkles,
  BarChart3,
  Receipt,
  ClipboardCheck,
  TrendingUp,
  Clock,
  ThumbsUp,
  AlertCircle,
  Eye,
  Printer
} from 'lucide-react';

export default function PlatformManual() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'seg' | 'fluxo' | 'desc' | 'prod' | 'blitz' | 'unified'>('all');

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '', 'width=950,height=950');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Manual de Diretrizes - Retorno de Rota Pau Brasil</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');
              body { 
                font-family: 'Inter', sans-serif; 
                color: #0f172a; 
                padding: 40px; 
                line-height: 1.6; 
                background: #ffffff;
                font-size: 11px;
              }
              .header-logo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                border-bottom: 3px solid #0f35a9;
                padding-bottom: 15px;
              }
              .logo-title {
                font-size: 26px;
                font-weight: 900;
                color: #0f35a9;
                letter-spacing: -0.03em;
                margin: 0;
                line-height: 1;
              }
              .logo-subtitle {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #475569;
                font-weight: 700;
                margin-top: 4px;
              }
              .logo-tag {
                color: #f59e0b;
                font-weight: 900;
              }
              .doc-code {
                font-family: 'JetBrains Mono', monospace;
                font-size: 10px;
                color: #64748b;
                text-align: right;
                font-weight: bold;
              }
              h1 { 
                color: #0f35a9; 
                font-size: 18px; 
                font-weight: 800;
                margin-top: 10px; 
                margin-bottom: 20px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: -0.01em;
              }
              h2 { 
                color: #0f35a9; 
                font-size: 12px; 
                font-weight: 800;
                margin-top: 25px; 
                margin-bottom: 10px;
                border-bottom: 2px solid #0f35a9; 
                padding-bottom: 4px; 
                text-transform: uppercase;
                letter-spacing: 0.03em;
              }
              h3 { 
                color: #1e293b; 
                font-size: 11px; 
                font-weight: 700;
                margin-top: 12px; 
                margin-bottom: 5px;
                text-transform: uppercase;
              }
              p { 
                font-size: 11px; 
                color: #334155;
                margin: 6px 0; 
                text-align: justify;
              }
              ul, ol { 
                font-size: 11px; 
                color: #334155;
                padding-left: 20px; 
                margin-top: 5px;
                margin-bottom: 10px;
              }
              li { 
                margin: 4px 0; 
              }
              .meta-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                background: #f8fafc;
                border: 1px solid #cbd5e1;
              }
              .meta-table td {
                padding: 8px;
                border: 1px solid #cbd5e1;
                font-size: 11px;
              }
              .meta-label {
                font-weight: 700;
                color: #475569;
                width: 25%;
                background: #f1f5f9;
              }
              .meta-val {
                color: #0f172a;
                font-weight: 600;
              }
              
              /* RACI Table Styling */
              .raci-table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                font-size: 9px;
              }
              .raci-table th, .raci-table td {
                border: 1px solid #cbd5e1;
                padding: 6px;
                text-align: center;
              }
              .raci-table th {
                background: #0f35a9;
                color: #ffffff;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 9px;
              }
              .raci-table td.activity {
                text-align: left;
                font-weight: bold;
                color: #1e293b;
                width: 40%;
              }
              .raci-badge {
                display: inline-block;
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 9px;
              }
              .raci-r { background: #fee2e2; color: #991b1b; }
              .raci-a { background: #fef3c7; color: #92400e; }
              .raci-c { background: #e0f2fe; color: #075985; }
              .raci-i { background: #dcfce7; color: #166534; }
              
              /* Index Box */
              .index-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px;
                margin: 15px 0;
              }
              .index-title {
                font-weight: 850;
                color: #0f35a9;
                text-transform: uppercase;
                margin-bottom: 6px;
                font-size: 10px;
                letter-spacing: 0.05em;
              }
              .index-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4px;
              }
              .index-item {
                font-weight: 600;
                color: #334155;
                font-size: 10px;
              }
              .index-item span {
                color: #0f35a9;
                font-weight: 800;
                margin-right: 5px;
              }

              /* EPI Grid Styling exactly like user's image layout */
              .epi-container {
                border: 2px solid #000000;
                margin: 15px 0;
                overflow: hidden;
                border-radius: 4px;
              }
              .epi-title-bar {
                background: #000000;
                color: #ffffff;
                text-align: center;
                font-weight: 800;
                font-size: 12px;
                padding: 6px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
              }
              .epi-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                background: #ffffff;
              }
              .epi-card {
                border-right: 1px solid #000000;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 120px;
                background: #ffffff;
              }
              .epi-card:last-child {
                border-right: none;
              }
              .epi-img-placeholder {
                padding: 10px 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 70px;
                background: #fafafa;
                border-bottom: 2px solid #000000;
              }
              .epi-icon-draw {
                font-size: 24px;
                font-weight: bold;
                color: #1e3a8a;
              }
              .epi-label {
                background: #ffffff;
                color: #000000;
                font-weight: 800;
                font-size: 8px;
                padding: 4px 2px;
                text-transform: uppercase;
                line-height: 1.2;
                border-top: 1px solid #000000;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 30px;
              }

              /* Flowchart PDF Styling (Visual nodes in grid) */
              .pdf-flowchart-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 15px 0;
              }
              .pdf-flow-box {
                background: #f59e0b;
                border: 1.5px solid #d97706;
                color: #000000;
                border-radius: 8px;
                padding: 8px;
                font-size: 9px;
                text-align: center;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .pdf-flow-box-title {
                font-weight: 900;
                text-transform: uppercase;
                border-bottom: 1px solid rgba(0,0,0,0.15);
                padding-bottom: 3px;
                margin-bottom: 4px;
                font-size: 9px;
                letter-spacing: 0.02em;
              }
              .pdf-flow-box-desc {
                font-size: 8px;
                line-height: 1.2;
                font-weight: 500;
              }
              .pdf-flow-ellipse {
                background: #f59e0b;
                border: 2px solid #d97706;
                color: #000000;
                border-radius: 9999px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                text-transform: uppercase;
                font-size: 10px;
                height: 40px;
                margin: auto;
                width: 100%;
              }

              /* Platform Interface Mockups (Gestão de Vales e Produtividade) */
              .mockup-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin: 15px 0;
              }
              .mockup-card {
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                background: #ffffff;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
              }
              .mockup-header {
                background: #0f35a9;
                color: #ffffff;
                padding: 6px 10px;
                font-weight: bold;
                font-size: 9px;
                text-transform: uppercase;
                display: flex;
                justify-content: space-between;
              }
              .mockup-body {
                padding: 10px;
                font-size: 9px;
                background: #f8fafc;
              }
              .mockup-row {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
                border-bottom: 1px dashed #e2e8f0;
              }
              .mockup-row:last-child {
                border-bottom: none;
              }
              .mockup-val {
                font-weight: bold;
                color: #0f172a;
              }
              
              .rule-box {
                background: #fffbeb;
                border-left: 4px solid #f59e0b;
                padding: 10px 14px;
                margin: 12px 0;
                border-radius: 0 6px 6px 0;
              }
              .rule-box-title {
                font-weight: 700;
                font-size: 10px;
                color: #78350f;
                margin-bottom: 2px;
              }
              .footer { 
                margin-top: 35px; 
                text-align: center; 
                font-size: 8px; 
                color: #64748b; 
                border-top: 1px solid #e2e8f0; 
                padding-top: 12px; 
              }
              .page-break {
                page-break-before: always;
              }
            </style>
          </head>
          <body>
            <div class="header-logo">
              <div>
                <div class="logo-title">PAU BRASIL</div>
                <div class="logo-subtitle">distribuidora <span class="logo-tag">ambev</span></div>
              </div>
              <div class="doc-code">
                CÓD: POP-LOG-004-AMB<br/>
                REV: 03 (JULHO/2026)<br/>
                ÁREA: RETORNO DE ROTA & CONTROLE
              </div>
            </div>
            
            <h1>PADRÃO DE OPERAÇÃO DE RETORNO DE ROTA & CONCILIAÇÃO FISCAL</h1>
            
            <table class="meta-table">
              <tr>
                <td class="meta-label">Elaborador do Padrão</td>
                <td class="meta-val">Djeanderson Soares — Coordenador de Armazém</td>
                <td class="meta-label">Data de Elaboração</td>
                <td class="meta-val">18/07/2026</td>
              </tr>
              <tr>
                <td class="meta-label">Aprovador do Padrão</td>
                <td class="meta-val">Marcos Guilherme — GOD (Gerente de Operações)</td>
                <td class="meta-label">Status do Documento</td>
                <td class="meta-val" style="color: #10b981;">✓ Aprovado, Vigente e Auditado (DPO)</td>
              </tr>
             <div class="index-box">
              <div class="index-title">ÍNDICE DE DIRETRIZES</div>
              <ul class="index-list">
                <li class="index-item"><span>1.</span> OBJETIVO</li>
                <li class="index-item"><span>2.</span> CAMPO DE APLICAÇÃO</li>
                <li class="index-item"><span>3.</span> SEGURANÇA (EPI OBRIGATÓRIO)</li>
                <li class="index-item"><span>4.</span> FLUXO DE DESCARREGAMENTO</li>
                <li class="index-item"><span>4.1</span> MATRIZ DE RESPONSABILIDADE (RACI DE PÁTIO)</li>
                <li class="index-item"><span>4.2</span> CONFERÊNCIA PRÉ-SAÍDA (PREVENÇÃO DE FALTAS)</li>
                <li class="index-item"><span>4.3</span> MONITORAMENTO EM ROTA (RECOLHA, COMODATO, ETA, PERNOITE)</li>
                <li class="index-item"><span>5.</span> DESCRIÇÃO DO FLUXO OPERACIONAL</li>
                <li class="index-item"><span>5.1</span> CONCILIAÇÃO FISCAL CRÍTICA (SISTEMA PROMAX)</li>
                <li class="index-item"><span>5.2</span> GESTÃO DE PRODUTIVIDADE, SLAS E EFICIÊNCIA</li>
                <li class="index-item"><span>6.</span> BLITZ DE REFUGO (CIRCULAR E SORTEADA)</li>
                <li class="index-item"><span>7.</span> ELABORADORES & APROVADORES DA OPERAÇÃO</li>
              </ul>
            </div>
            
            <h2>1. OBJETIVO</h2>
            <p>O objetivo deste padrão, é definir normas e procedimentos para o processo de gestão no processo de utilização da área de contingência. Garantindo sempre a segurança, alta produtividade com acompanhamento de KPIs, e um plano estruturado para alto volume de devolução e retorno de rotas.</p>
            
            <h2>2. CAMPO DE APLICAÇÃO</h2>
            <p>Este padrão aplica-se integralmente à área do armazém da Revenda Pau Brasil matriz e filial.</p>

            <h2>3. SEGURANÇA</h2>
            <p>Todos os procedimentos previstos neste documento devem ser respaldados pelos requisitos do Pilar Segurança do DPO. Deve-se garantir a utilização dos EPIs mínimos obrigatórios, conforme figura abaixo, exceto o capacete que deverá ser de acordo com a avaliação de risco da unidade.</p>
            
            <div class="epi-container">
              <div class="epi-title-bar">EPI - EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL OBRIGATÓRIO</div>
              <div class="epi-grid">
                <div class="epi-card">
                  <div class="epi-img-placeholder"><span class="epi-icon-draw">🥾</span></div>
                  <div class="epi-label">BORA ANTI PERFURANTE</div>
                </div>
                <div class="epi-card">
                  <div class="epi-img-placeholder"><span class="epi-icon-draw">🥽</span></div>
                  <div class="epi-label">ÓCULOS CONTRA IMPACTOS</div>
                </div>
                <div class="epi-card">
                  <div class="epi-img-placeholder"><span class="epi-icon-draw">🪖</span></div>
                  <div class="epi-label">CAPACETE</div>
                </div>
                <div class="epi-card">
                  <div class="epi-img-placeholder"><span class="epi-icon-draw">🧤</span></div>
                  <div class="epi-label">LUVA PROTEÇÃO A OBJETOS CORTANTES</div>
                </div>
                <div class="epi-card">
                  <div class="epi-img-placeholder"><span class="epi-icon-draw">🦺</span></div>
                  <div class="epi-label">UNIFORME/COLETE REFLETIVO</div>
                </div>
              </div>
            </div>

            <div class="page-break"></div>

            <h2>4. FLUXO DE DESCARREGAMENTO</h2>
            <p>Sequenciamento lógico de atividades do processo de retorno de rota, da entrada física do veículo à sua liberação:</p>
            
            <div class="pdf-flowchart-grid">
              <div class="pdf-flow-ellipse" style="grid-column: span 1;">Início</div>
              <div class="pdf-flow-box" style="grid-column: span 1;">
                <div class="pdf-flow-box-title">GUARITA</div>
                <div class="pdf-flow-box-desc">Dá entrada no carro e informa se há devolução</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 1;">
                <div class="pdf-flow-box-title">CONFERENTE</div>
                <div class="pdf-flow-box-desc">Confere o retorno de rota e a devolução</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 1;">
                <div class="pdf-flow-box-title">MOTORISTA</div>
                <div class="pdf-flow-box-desc">Garante a prestação física e fiscal do veículo</div>
              </div>
              
              <div class="pdf-flow-box" style="grid-column: span 1; grid-row: 2;">
                <div class="pdf-flow-box-title">OPERADOR</div>
                <div class="pdf-flow-box-desc">Inicia o descarregamento e a organização no armazém</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 1; grid-row: 2;">
                <div class="pdf-flow-box-title">OPERADOR</div>
                <div class="pdf-flow-box-desc">Abre as baias e verifica a integridade dos vasilhames</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 2; grid-row: 2;">
                <div class="pdf-flow-box-title">OPERADOR (MANOBRA)</div>
                <div class="pdf-flow-box-desc">Manobra o carro após prestação de contas até a Red Zone</div>
              </div>

              <div class="pdf-flow-box" style="grid-column: span 1; grid-row: 3;">
                <div class="pdf-flow-box-title">OPERADOR</div>
                <div class="pdf-flow-box-desc">Verifica com o ajudante os carros sorteados de Blitz</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 1; grid-row: 3;">
                <div class="pdf-flow-box-title">OPERADOR</div>
                <div class="pdf-flow-box-desc">Coloca os palets dos sorteados na área de Refugo</div>
              </div>
              <div class="pdf-flow-box" style="grid-column: span 1; grid-row: 3;">
                <div class="pdf-flow-box-title">OPERADOR (DEV)</div>
                <div class="pdf-flow-box-desc">Nos carros com devolução, descarrega até a área de segregação</div>
              </div>
              <div class="pdf-flow-ellipse" style="grid-column: span 1; grid-row: 3;">Fim</div>
            </div>

            <h2>4.1 MATRIZ DE RESPONSABILIDADE (RACI)</h2>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 12px; font-size: 9.5px; text-align: justify; color: #334155; line-height: 1.4;">
              <strong>O que é a Matriz RACI?</strong> A Matriz RACI é uma ferramenta internacional de governança que mapeia e atribui as responsabilidades operacionais sobre cada atividade de um fluxo. Ela impede duplicidade de trabalho ou falta de responsabilidade (lacunas). O acrônimo define as seguintes funções:
              <br/>• <strong>[R] Responsible (Responsável):</strong> O executor direto da tarefa ("quem faz").
              <br/>• <strong>[A] Accountable (Aprovador):</strong> O proprietário final do resultado, com poder de aprovação ou veto ("quem manda/decide").
              <br/>• <strong>[C] Consulted (Consultado):</strong> Especialistas ou profissionais que dão conselho e suporte técnico antes da execução.
              <br/>• <strong>[I] Informed (Informado):</strong> Indivíduos ou setores comunicados da conclusão do processo, sem ação direta.
            </div>

            <table class="raci-table">
              <thead>
                <tr>
                  <th style="text-align: left;">Atividade / Processo</th>
                  <th>Motorista</th>
                  <th>Conferente</th>
                  <th>Aux. Fiscal</th>
                  <th>Operador</th>
                  <th>Marcos G. (GOD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="activity">Conferência Prévia de Carga (Saída)</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td><span class="raci-badge raci-c">C</span></td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Entrada na Guarita & Informação de DEV</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Conferência Física do Retorno (Cega)</td>
                  <td><span class="raci-badge raci-c">C</span></td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td><span class="raci-badge raci-a">A</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Prestação de Contas Física & Fiscal</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td><span class="raci-badge raci-c">C</span></td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Manobra do Veículo para Red Zone</td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td>-</td>
                  <td>-</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Abertura de Baias & Verificação de Carga</td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td>-</td>
                  <td>-</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td class="activity">Descarregamento do Veículo</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td><span class="raci-badge raci-a">A</span></td>
                </tr>
                <tr>
                  <td class="activity">Seleção & Separação de Pallets p/ Blitz</td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td><span class="raci-badge raci-c">C</span></td>
                  <td>-</td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td><span class="raci-badge raci-a">A</span></td>
                </tr>
                <tr>
                  <td class="activity">Lançamento de Saldo Fiscal (Promax 05.01)</td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td><span class="raci-badge raci-i">I</span></td>
                  <td><span class="raci-badge raci-r">R</span></td>
                  <td>-</td>
                  <td><span class="raci-badge raci-a">A</span></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 8px; font-style: italic; color: #475569; margin-top: -5px;">
              * Legenda: [R] Responsável • [A] Aprovador/Autoridade • [C] Consultado • [I] Informado.
            </p>

            <div class="page-break"></div>

            <h2>4.2 CONFERÊNCIA OBRIGATÓRIA DA CARGA (PREVENÇÃO DE FALTAS)</h2>
            <div class="rule-box" style="margin-bottom: 20px;">
              <div class="rule-box-title">🛑 DIRETRIZ CRÍTICA DE EXPEDIÇÃO & ROTA (RESPONSABILIDADE DO MOTORISTA)</div>
              <p style="margin: 4px 0; color: #78350f; font-weight: bold; font-size: 10px;">
                É de total e exclusiva responsabilidade do MOTORISTA conferir 100% da carga, ativos e vasilhames fisicamente antes de assinar a liberação e sair do pátio da revenda Pau Brasil.
              </p>
              <p style="margin: 4px 0; color: #78350f; font-size: 9.5px; text-align: justify; line-height: 1.4;">
                Essa verificação rigorosa de saída visa evitar possíveis problemas de falta de produtos ou divergências físicas na entrega ao cliente final. Qualquer divergência identificada após a saída do veículo será imputada integralmente ao motorista responsável pela rota através da emissão de Vales Físicos/Eletrônicos correspondentes.
              </p>
            </div>

            <h2>4.3 MONITORAMENTO EM ROTA & ATUALIZAÇÕES DA PLATAFORMA</h2>
            <p style="text-align: justify; line-height: 1.4; margin-bottom: 12px;">
              O sistema de monitoramento de rotas comunica-se continuamente com a plataforma da Pau Brasil para prever movimentações e organizar a estrutura física do pátio com antecedência:
            </p>
            <ul style="padding-left: 15px; margin-top: 5px; margin-bottom: 15px; line-height: 1.5;">
              <li style="margin-bottom: 8px;">
                <strong>Movimentações de Rota (Recolhas e Comodatos):</strong> Quando ocorrem recolhas de ativos vazios em clientes ou entregas/devoluções de comodato de equipamentos/choppeiras, essas ações são informadas no aplicativo de entregas. O monitoramento atualiza a plataforma instantaneamente com as quantidades previstas, agilizando o encaminhamento do veículo para descarregar na Red Zone ou descarte de refugo.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Previsão de Chegada (ETA):</strong> A plataforma gerencial calcula de forma inteligente a previsão de chegada (ETA) dos veículos em trânsito com base na evolução das entregas e no tráfego das vias. Com o ETA atualizado no monitor, o Coordenador de Armazém otimiza a escala de trabalho dos conferentes para mitigar filas e agilizar as descargas.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Veículos Programados para Pernoite:</strong> Veículos cuja jornada do motorista exceda o limite ou que operem em rotas extremamente distantes e não retornem para descarregar no turno fiscal regular são sinalizados como "Pernoite". O sistema congela seu status, planejando sua recepção prioritária na abertura do turno da manhã subsequente, liberando capacidade de pátio na noite corrente.
              </li>
            </ul>

            <h2>5. DESCRIÇÃO DO FLUXO OPERACIONAL</h2>
            <p>O carro dá entrada na guarita, onde é verificado se tem devolução e o responsável no local informa. Na entrada do carro no pátio, o conferente faz a conferencia do retorno de rota, e valida a devolução e carga. Logo após o fechamento do carro e a prestação física, o operador manobra o carro para descarregamento na Red Zone. O operador verifica a organização do armazém e espaço para dá entrada na carreta ou carro e solicita motorista a colocar no local de descarregamento. Logo após, abre as baias do carro e verifica a carga e os vasilhames, para analisar se esta organizado e com fitilho, no caso de vasilhames de 600. O operador abre as baias e inicia o descarregamento, sempre avaliando o pallet antes de iniciar a manobra, e caso tenha algum palet com irregularidade o operador tem autonomia para separar esse pallet para blitz, para que seja verificado possíveis garrafas refugadas.</p>
            
            <h3>5.1 Conciliação Fiscal Crítica (Sistema Promax 05.01)</h3>
            <p>O processo de conciliação fiscal exige rigor absoluto para evitar distorções no estoque e faturamento. <strong>A Auxiliar de Armazém abre o sistema Promax na rotina 05.01 - Retorno de Rota / Reconciliação Fiscal</strong>. 
            <strong>A rotina no Promax utilizada para verificar o que se pede no fiscal (itens solicitados/faturados da carga) é a 03.03.02</strong>.
            Nesta rotina, ela vai informar todos os itens que estão no saldo fiscal, inserindo-os individualmente de forma manual. 
            <strong>Por padrão rígido de auditoria, todos os campos fiscais iniciam com quantidade ZERADA (0)</strong>. Isso obriga o preenchimento manual de cada linha com base física em documentos válidos de faturamento, prevenindo o hábito nocivo de autorização automática e assegurando 100% de precisão antes de rodar o comando de verificação da conciliação.</p>

            <div class="page-break"></div>

            <h3>5.2 Gestão de Produtividade, SLAs e Eficiência</h3>
            <p>A gestão de retorno de rota da Pau Brasil baseia-se em quatro pilares de indicadores gerenciais coletados em tempo real no painel gerencial:</p>
            <ul style="padding-left: 15px; margin-top: 5px; margin-bottom: 15px;">
              <li><strong>Tempo Médio por Conferente (SLA de Descarga):</strong> O tempo padrão para descarregar e conferir um veículo é estabelecido em **menos de 30 minutos**. O painel de produtividade calcula a média móvel por conferente para corrigir gargalos operacionais e dimensionar a equipe de pátio nos picos de retorno.</li>
              <li><strong>Índice de Acerto / Acurácia de Contagem (Cega vs Promax):</strong> A meta mínima estabelecida pelo pilar DPO é de **99.2% de acurácia** de contagem física inicial na primeira passada. Desvios sistemáticos acionam reciclagem de treinamento de pátio.</li>
              <li><strong>Gargalos de Tempo de Espera (Lead Time de Pátio):</strong> Monitoramento do tempo total desde a guarita até a saída fiscal para evitar a insatisfação dos motoristas e garantir a vazão rápida da frota.</li>
            </ul>

            <div class="mockup-container">
              <div class="mockup-card">
                <div class="mockup-header">
                  <span>Gestão de Vales e Descontos</span>
                  <span>INTEGRADO</span>
                </div>
                <div class="mockup-body">
                  <div class="mockup-row"><span>Vale ID:</span> <span class="mockup-val">#VAL-2026-8942</span></div>
                  <div class="mockup-row"><span>Motorista:</span> <span class="mockup-val">Carlos Augusto Silva</span></div>
                  <div class="mockup-row"><span>Falta Acusada:</span> <span class="mockup-val">12 un - Ambev 600ml Glass</span></div>
                  <div class="mockup-row"><span>Ação Gerada:</span> <span class="mockup-val">Termo Assinado Eletronicamente</span></div>
                </div>
              </div>
              <div class="mockup-card">
                <div class="mockup-header" style="background: #10b981;">
                  <span>Painel de Produtividade Gerencial</span>
                  <span>META DPO</span>
                </div>
                <div class="mockup-body">
                  <div class="mockup-row"><span>Tempo Médio Descarga:</span> <span class="mockup-val" style="color: #10b981;">24 min (Meta &lt; 30)</span></div>
                  <div class="mockup-row"><span>Acurácia de Contagem:</span> <span class="mockup-val" style="color: #10b981;">99.4% (Meta &gt; 99.2)</span></div>
                  <div class="mockup-row"><span>Mapas Atendidos Hoje:</span> <span class="mockup-val">14 mapas</span></div>
                  <div class="mockup-row"><span>Eficiência Global:</span> <span class="mockup-val">97.8% (Excelente)</span></div>
                </div>
              </div>
            </div>

            <h2>6. BLITZ DE REFUGO (CIRCULAR E SORTEADA)</h2>
            <p>Para garantir a qualidade dos ativos de giro e evitar vasilhames trincados ou contaminados no estoque de comercialização, o sistema seleciona automaticamente <strong>2 veículos por dia</strong> para a Blitz de Refugo. 
            Esta rotina é **circular**, o que significa que o sistema garante que todos os motoristas e placas passem pela auditoria antes de reiniciar o ciclo de sorteio. 
            O veículo em Blitz deve ter 100% das caixas e engradados rebatidos fisicamente pelo conferente, registrando fotos das não-conformidades encontradas diretamente na plataforma.</p>
            
            <h2>7. ELABORADORES & APROVADORES DA OPERAÇÃO</h2>
            <p style="margin-bottom: 4px;"><strong>Djeanderson Soares</strong> — Coordenador de Armazém da Revenda Pau Brasil (Elaborador do Processo).</p>
            <p style="margin-top: 4px;"><strong>Marcos Guilherme</strong> — GOD - Gerente de Operações de Distribuição (Autoridade de Homologação).</p>
            
            <div class="footer">
              PAU BRASIL DISTRIBUIDORA AMBEV • Padrão de Operação Logística Reverso (SOP)<br/>
              Documento controlado por sistema integrado • Proibida reprodução não autorizada • DPO Ambev
            </div>
            
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="bg-slate-900 border-t border-slate-800 text-white" id="platform_manual_container">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Accordion Toggle Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button
            id="btn_toggle_manual"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2.5 text-sm font-bold text-slate-200 hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            <BookOpen className="h-5 w-5 text-amber-500" />
            <div className="text-left">
              <span className="block text-sm sm:text-base font-extrabold tracking-tight">Manual de Diretrizes & Padrões de Operação (POP)</span>
              <span className="text-[10px] text-slate-400 font-normal font-mono block">Elaborado: Djeanderson S. • Aprovado: Marcos G. (GOD) • DPO Ambev</span>
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
          </button>

          <button
            id="btn_export_manual_pdf"
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-5 rounded-xl shadow-md transition-all text-xs cursor-pointer w-full md:w-auto justify-center"
          >
            <Download className="h-4 w-4" />
            <span>Exportar Manual de Operações (PDF)</span>
          </button>
        </div>

        {isOpen && (
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-300 space-y-6 animate-fade-in" id="manual_details">
            
            {/* Index Quick Links Navigation */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80" id="manual_index_nav">
              <span className="text-xxs font-extrabold text-amber-500 uppercase tracking-widest block mb-2.5">
                ÍNDICE DE DIRETRIZES E PROCEDIMENTOS
              </span>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveTab('all')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  Ver Manual Completo
                </button>
                <button 
                  onClick={() => setActiveTab('seg')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'seg' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  3. Segurança
                </button>
                <button 
                  onClick={() => setActiveTab('fluxo')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'fluxo' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  4. Fluxograma
                </button>
                <button 
                  onClick={() => setActiveTab('desc')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'desc' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  5. Descrição / Promax
                </button>
                <button 
                  onClick={() => setActiveTab('prod')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'prod' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  5.3 Produtividade & KPIs
                </button>
                <button 
                  onClick={() => setActiveTab('blitz')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${activeTab === 'blitz' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  6. Blitz de Refugo
                </button>
                <button 
                  onClick={() => setActiveTab('unified')} 
                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer flex items-center space-x-1 ${activeTab === 'unified' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  <Eye className="h-3 w-3 shrink-0" />
                  <span>Visualizar Padrão Oficial (SOP)</span>
                </button>
              </div>
            </div>

            {/* Document Header Metadata Approvals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">1.7 Elaborador Técnico</span>
                  <span className="text-xs font-black text-white">Djeanderson Soares</span>
                  <span className="text-[10px] text-slate-400 block font-mono">Coordenador de Armazém • Revenda Pau Brasil</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">1.8 Autoridade Aprovadora</span>
                  <span className="text-xs font-black text-white">Marcos Guilherme</span>
                  <span className="text-[10px] text-slate-400 block font-mono">GOD (Gerente de Operações de Distribuição)</span>
                </div>
              </div>
            </div>

            {/* Render Sections based on active index tab */}
            {(activeTab === 'all' || activeTab === 'seg') && (
              <div className="space-y-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-800/40" id="manual_section_1_2_3">
                
                {/* 1. OBJETIVO */}
                <div className="space-y-1.5">
                  <span className="text-xxs font-black text-amber-500 uppercase tracking-widest block font-mono">1. OBJETIVO</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    O objetivo deste padrão, é definir normas e procedimentos para o processo de gestão no processo de utilização da área de contingência. Garantindo sempre a segurança, alta produtividade com acompanhamento de KPIs, e um plano estruturado para alto volume de devolução e retorno de rotas.
                  </p>
                </div>

                {/* 2. CAMPO DE APLICAÇÃO */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/50">
                  <span className="text-xxs font-black text-amber-500 uppercase tracking-widest block font-mono">2. CAMPO DE APLICAÇÃO</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Este padrão aplica-se integralmente à área do armazém da Revenda Pau Brasil matriz e filial.
                  </p>
                </div>

                {/* 3. SEGURANÇA */}
                <div className="space-y-3 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <span className="text-xxs font-black text-emerald-500 uppercase tracking-widest block font-mono">3. SEGURANÇA</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Todos os procedimentos previstos neste documento devem ser respaldados pelos requisitos do Pilar Segurança do DPO. Deve-se garantir a utilização dos EPIs mínimos obrigatórios, conforme figura abaixo, exceto o capacete que deverá ser de acordo com a avaliação de risco da unidade.
                  </p>

                  {/* VISUAL EPI MATRIX - MATCHES THE UPLOADED FIGURE DESIGN */}
                  <div className="border border-slate-750 rounded-xl overflow-hidden shadow-md bg-slate-950" id="epi_visual_table">
                    <div className="bg-slate-800 text-slate-100 py-2.5 px-4 text-center font-extrabold uppercase tracking-widest text-[10px] border-b border-slate-700 flex items-center justify-center space-x-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>EPI - EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-slate-800 bg-slate-900">
                      
                      {/* BOOT */}
                      <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                        <div className="h-12 w-12 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-xl shadow-2xs">
                          🥾
                        </div>
                        <span className="text-[10px] font-black text-slate-200 tracking-tight leading-tight uppercase">Bora Anti Perfurante</span>
                      </div>

                      {/* GOGGLES */}
                      <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                        <div className="h-12 w-12 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-xl shadow-2xs">
                          🥽
                        </div>
                        <span className="text-[10px] font-black text-slate-200 tracking-tight leading-tight uppercase">Óculos Contra Impactos</span>
                      </div>

                      {/* HELMET */}
                      <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                        <div className="h-12 w-12 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-xl shadow-2xs">
                          🪖
                        </div>
                        <span className="text-[10px] font-black text-slate-200 tracking-tight leading-tight uppercase">Capacete</span>
                      </div>

                      {/* GLOVES */}
                      <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                        <div className="h-12 w-12 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-xl shadow-2xs">
                          🧤
                        </div>
                        <span className="text-[10px] font-black text-slate-200 tracking-tight leading-tight uppercase">Luva Proteção Objetos Cortantes</span>
                      </div>

                      {/* VEST */}
                      <div className="p-4 flex flex-col justify-between items-center text-center space-y-2">
                        <div className="h-12 w-12 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center text-xl shadow-2xs">
                          🦺
                        </div>
                        <span className="text-[10px] font-black text-slate-200 tracking-tight leading-tight uppercase">Uniforme/Colete Refletivo</span>
                      </div>

                    </div>
                  </div>
                  
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'fluxo') && (
              <div className="space-y-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-800/40 font-sans" id="manual_section_4_raci">
                
                {/* 4. FLUXO DE DESCARREGAMENTO */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-amber-500" />
                    <span className="text-xxs font-black text-amber-500 uppercase tracking-widest block font-mono">4. FLUXO DE DESCARREGAMENTO</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Fluxograma original reproduzindo exatamente as diretrizes de movimentação, da chegada à guarita até a segregação final no pátio:
                  </p>

                  {/* VISUAL FLOWCHART GRAPHIC EXACTLY AS THE IMAGE */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6" id="visual_orange_flow_map">
                    
                    {/* ROW 1: INÍCIO -> GUARITA -> CONFERENTE -> MOTORISTA */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      
                      {/* INÍCIO */}
                      <div className="bg-amber-500 text-slate-950 border border-amber-600 font-extrabold text-xs px-4 py-3 rounded-full text-center shadow-md uppercase tracking-wider flex items-center justify-center h-14 md:h-16">
                        Início
                      </div>

                      {/* Arrow md:visible */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-amber-500 animate-pulse" />
                      </div>

                      {/* GUARITA */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px]">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">GUARITA</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Dá entrada no carro e informa se há devolução
                        </span>
                      </div>

                      {/* Arrow md:visible */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* CONFERENTE */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px]">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">CONFERENTE</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Confere o retorno de rota e a devolução
                        </span>
                      </div>

                      {/* Arrow md:visible */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* MOTORISTA */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px]">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">MOTORISTA</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Garante a prestação física e fiscal do veiculo
                        </span>
                      </div>

                    </div>

                    {/* INTER-ROW ARROW: MOTORISTA -> OPERADOR MANOBRA (DOWN) */}
                    <div className="flex justify-end pr-8 md:pr-16">
                      <ArrowDown className="h-8 w-8 text-amber-500" />
                    </div>

                    {/* ROW 2: OPERADOR (MANOBRA) -> OPERADOR (ABRE BAIAS) -> OPERADOR (INICIA DESCARGA) -> OPERADOR (BLITZ) */}
                    {/* Flows leftwards in the image! */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      
                      {/* OPERADOR (BLITZ) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px] order-4 md:order-1">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Verifica com o ajudante de refugo carros sorteados para Blitz
                        </span>
                      </div>

                      {/* Arrow md:visible (pointing leftwards!) */}
                      <div className="hidden md:flex items-center justify-center order-3 md:order-2">
                        <ArrowLeft className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* OPERADOR (INICIA DESCARGA) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px] order-3">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Inicia o descarregamento do carro e organização dos vasilhames no armazém
                        </span>
                      </div>

                      {/* Arrow md:visible (pointing leftwards!) */}
                      <div className="hidden md:flex items-center justify-center order-2 md:order-4">
                        <ArrowLeft className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* OPERADOR (ABRE BAIAS) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px] order-2 md:order-5">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Abre as baias do carro e verifica a integridade dos vasilhames
                        </span>
                      </div>

                      {/* Arrow md:visible (pointing leftwards!) */}
                      <div className="hidden md:flex items-center justify-center order-1 md:order-6">
                        <ArrowLeft className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* OPERADOR (MANOBRA) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px] order-1 md:order-7">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Manobra o carro após prestação de contas ate a Red Zone
                        </span>
                      </div>

                    </div>

                    {/* INTER-ROW ARROW: OPERADOR (BLITZ) -> OPERADOR (COLOCA PALETS) (DOWN) */}
                    <div className="flex justify-start pl-8 md:pl-16">
                      <ArrowDown className="h-8 w-8 text-amber-500" />
                    </div>

                    {/* ROW 3: OPERADOR (COLOCA PALETS) -> OPERADOR (CARROS COM DEV) -> FIM */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      
                      {/* OPERADOR (COLOCA PALETS) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px]">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Coloca os palets dos carros sorteados na área de Refugo
                        </span>
                      </div>

                      {/* Arrow md:visible */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* OPERADOR (CARROS COM DEV) */}
                      <div className="bg-amber-500 text-slate-950 border-2 border-amber-600 rounded-xl p-3 shadow-md flex flex-col justify-center min-h-[75px] md:min-h-[85px] md:col-span-1">
                        <span className="text-[10px] font-black text-center border-b border-amber-700/30 pb-1 uppercase block">OPERADOR</span>
                        <span className="text-[10px] font-medium text-center leading-snug mt-1.5 block">
                          Nos carros que tem devolução, o operador descarrega a devolução até local da segregação de devolução
                        </span>
                      </div>

                      {/* Arrow md:visible */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-amber-500" />
                      </div>

                      {/* FIM */}
                      <div className="bg-amber-500 text-slate-950 border border-amber-600 font-extrabold text-xs px-4 py-3 rounded-full text-center shadow-md uppercase tracking-wider flex items-center justify-center h-14 md:h-16">
                        Fim
                      </div>

                    </div>

                  </div>
                </div>

                {/* RACI Matrix */}
                <div className="space-y-4 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-200 uppercase text-[10px]">
                    <Users className="h-4 w-4 text-amber-500" />
                    <span>Matriz de Responsabilidade Integrada (RACI)</span>
                  </div>
                  
                  {/* RACI EXPLANATORY BOX */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-[11px] leading-relaxed text-slate-300">
                    <span className="font-bold text-amber-500 block text-xs">O que é a Matriz RACI?</span>
                    <p>
                      A Matriz RACI é uma ferramenta de governança operacional utilizada internacionalmente para mapear de forma cristalina as responsabilidades sobre cada atividade de um processo, eliminando lacunas ou sobreposições. O acrônimo define:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 font-sans">
                      <li className="bg-slate-950 p-2 rounded border border-slate-800/50">
                        <strong className="text-red-400 font-mono">[R] Responsible (Responsável):</strong> Executor direto da atividade física ou administrativa ("quem faz").
                      </li>
                      <li className="bg-slate-950 p-2 rounded border border-slate-800/50">
                        <strong className="text-amber-400 font-mono">[A] Accountable (Aprovador):</strong> O responsável final pela aprovação e qualidade da entrega ("quem manda/decide").
                      </li>
                      <li className="bg-slate-950 p-2 rounded border border-slate-800/50">
                        <strong className="text-sky-400 font-mono">[C] Consulted (Consultado):</strong> Profissionais que dão suporte técnico ou de processos ("quem ajuda").
                      </li>
                      <li className="bg-slate-950 p-2 rounded border border-slate-800/50">
                        <strong className="text-emerald-400 font-mono">[I] Informed (Informado):</strong> Setor ou cargo comunicado sobre o andamento e conclusão do processo.
                      </li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                          <th className="p-2.5">Atividade</th>
                          <th className="p-2.5 text-center">Motorista</th>
                          <th className="p-2.5 text-center">Conferente</th>
                          <th className="p-2.5 text-center">Aux. Fiscal</th>
                          <th className="p-2.5 text-center">Operador</th>
                          <th className="p-2.5 text-center">Marcos G. (GOD)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Conferência Prévia de Carga (Saída)</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-sky-900/40 text-sky-300 rounded font-bold text-[9px]">C</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Entrada na Guarita & Informação de DEV</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Conferência Física do Retorno (Cega)</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-sky-900/40 text-sky-300 rounded font-bold text-[9px]">C</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded font-bold text-[9px]">A</span></td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Prestação de Contas Física & Fiscal</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-sky-900/40 text-sky-300 rounded font-bold text-[9px]">C</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Manobra do Veículo para Red Zone</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Abertura de Baias & Verificação de Carga</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Descarregamento do Veículo</td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded font-bold text-[9px]">A</span></td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Seleção & Separação de Pallets p/ Blitz</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-sky-900/40 text-sky-300 rounded font-bold text-[9px]">C</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded font-bold text-[9px]">A</span></td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold text-slate-300">Lançamento de Saldo Fiscal (Promax 05.01)</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-emerald-900/40 text-emerald-300 rounded font-bold text-[9px]">I</span></td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-red-900/40 text-red-300 rounded font-bold text-[9px]">R</span></td>
                          <td className="p-2.5 text-center">-</td>
                          <td className="p-2.5 text-center"><span className="px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded font-bold text-[9px]">A</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 text-[9px] text-slate-400 font-mono italic">
                    <span>Legenda: [R] Responsável, [A] Aprovador Principal, [C] Consultado, [I] Informado</span>
                    <span className="text-amber-400 font-bold">✓ Alinhado com Pilar de Gestão Logística DPO</span>
                  </div>

                  {/* Highlight callout for driver's load check */}
                  <div className="bg-amber-950/30 border-l-4 border-amber-500 p-3.5 rounded-r-xl mt-3 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-400 uppercase text-[10px]">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span>Diretriz Crítica: Responsabilidade do Motorista</span>
                    </div>
                    <p className="text-slate-300 text-[10.5px] leading-relaxed">
                      É dever de extrema importância e <strong className="text-amber-300">responsabilidade obrigatória do motorista conferir 100% da carga antes de sair da revenda</strong>. 
                      Isso garante a conformidade física de todos os itens e vasilhames expedidos, evitando problemas subsequentes ou falta de produtos na rota. Qualquer divergência reportada pós-saída sem conferência registrada será de responsabilidade total do motorista.
                    </p>
                  </div>

                  {/* Section 4.3 Route Monitoring Callout */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mt-3 space-y-2.5">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-200 uppercase text-[10px]">
                      <Clock className="h-4 w-4 text-emerald-400" />
                      <span>4.3 Monitoramento em Rota & Atualizações da Plataforma</span>
                    </div>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed">
                      O sistema de rastreamento de rotas comunica-se continuamente com a plataforma da Pau Brasil para registrar previsões de movimentações e adiantar a organização do pátio:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1.5">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9.5px] font-black text-amber-400 block uppercase mb-1">Recolha & Comodatos</span>
                        <span className="text-[10px] text-slate-300 block leading-snug">
                          Movimentações em rota, como recolha de vasilhames vazios ou entregas de comodatos, são reportadas instantaneamente e atualizam a plataforma com as quantidades previstas de entrada.
                        </span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9.5px] font-black text-amber-400 block uppercase mb-1">Previsão de Chegada (ETA)</span>
                        <span className="text-[10px] text-slate-300 block leading-snug">
                          A plataforma calcula continuamente a previsão de chegada (ETA) dos veículos baseada nas entregas restantes e trânsito local, permitindo o dimensionamento exato da equipe de conferentes.
                        </span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9.5px] font-black text-amber-400 block uppercase mb-1">Pernoites Programados</span>
                        <span className="text-[10px] text-slate-300 block leading-snug">
                          Veículos distantes ou operando fora do horário fiscal regular de descarga são sinalizados como "Pernoite", congelando seu status para recepção prioritária na manhã subsequente.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {(activeTab === 'all' || activeTab === 'desc') && (
              <div className="space-y-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-800/40" id="manual_section_5_desc">
                
                {/* 5. DESCRIÇÃO DO FLUXO */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <ClipboardCheck className="h-4 w-4 text-sky-400" />
                    <span className="text-xxs font-black text-sky-400 uppercase tracking-widest block font-mono">5. DESCRIÇÃO DO FLUXO</span>
                  </div>

                  {/* USER TEXT INTEGRATION FOR FLOW DESCRIPTION */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider block font-mono">Diretriz de Pátio & Movimentação Física</span>
                    <p className="text-slate-200 text-[11px] leading-relaxed text-justify">
                      O carro dá entrada na guarita, onde é verificado se tem devolução e o responsável no local informa. Na entrada do carro no pátio, o conferente faz a conferencia do retorno de rota, e valida a devolução e carga. Logo após o fechamento do carro e a prestação física, o operador manobra o carro para descarregamento na Red Zone. O operador verifica a organização do armazém e espaço para dá entrada na carreta ou carro e solicita motorista a colocar no local de descarregamento. Logo após, abre as baias do carro e verifica a carga e os vasilhames, para analisar se esta organizado e com fitilho, no caso de vasilhames de 600. O operador abre as baias e inicia o descarregamento, sempre avaliando o pallet antes de iniciar a manobra, e caso tenha algum palet com irregularidade o operador tem autonomia para separar esse pallet para blitz, para que seja verificado possíveis garrafas refugadas.
                    </p>
                  </div>

                  {/* PROMAX ROUTINE HIGHLIGHT */}
                  <div className="bg-[#0f35a9]/10 p-4 rounded-xl border border-[#0f35a9]/30 space-y-2">
                    <div className="flex items-center space-x-2 text-white font-extrabold text-[11px] uppercase tracking-wider">
                      <Settings className="h-4 w-4 text-[#4f77ff]" />
                      <span>5.1 Rotina de Fechamento de Saldo Fiscal (SISTEMA PROMAX)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Para realizar o encerramento diário das contas de rota, a **Auxiliar de Armazém/Logística** deve abrir obrigatoriamente o **Sistema Promax**, acessando a rotina **05.01 - Retorno de Rota / Reconciliação Fiscal**. 
                      **Para verificar o que se pede no fiscal (itens solicitados/faturados da carga), a rotina de consulta utilizada no Promax é a 03.03.02**.
                      Neste painel, ela vai informar todos os itens que estão no saldo fiscal, inserindo e verificando a conciliação individual de forma totalmente manual. 
                      <span className="text-amber-400 font-bold block mt-1">
                        ⚠️ PADRÃO DE AUDITORIA: Por padrão rígido, todos os campos fiscais iniciam com quantidade ZERADA (0). Isso obriga o preenchimento manual de cada linha com base física em documentos válidos de faturamento, prevenindo o hábito nocivo de autorização automática e assegurando 100% de acurácia.
                      </span>
                    </p>
                  </div>

                  {/* GESTÃO DE VALES HIGHLIGHT */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-slate-200 font-extrabold text-[11px] uppercase tracking-wider">
                      <Receipt className="h-4 w-4 text-amber-500" />
                      <span>5.2 Gestão de Vales Eletrônicos (Tratamento de Desvios)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Se após a contagem física (cega) de pátio e lançamento fiscal no Promax persistir alguma **Falta**, a auxiliar fiscal recusa o mapa e solicita uma **Reconferência**. 
                      O conferente deve tirar uma **foto de comprovação** da carroceria vazia/limpa. 
                      Persistindo a falta física frente ao fiscal do Promax, é emitido um **Vale Eletrônico**. O motorista efetua a assinatura digital na plataforma, legitimando o débito financeiro a ser enviado para o desconto em folha no final do ciclo de fechamento.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'prod') && (
              <div className="space-y-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-800/40 font-sans" id="manual_section_productivity">
                
                {/* 5.3 GESTÃO DE PRODUTIVIDADE & KPIS */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-emerald-500" />
                    <span className="text-xxs font-black text-emerald-500 uppercase tracking-widest block font-mono">5.3 DIRETRIZ DE GESTÃO DE PRODUTIVIDADE E KPIS</span>
                  </div>
                  
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A operação de logística reversa da Revenda Pau Brasil monitora sistematicamente indicadores de desempenho individuais e consolidados para garantir o cumprimento das metas do DPO (Distribution Process Optimization):
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="kpi_details_manual">
                    
                    {/* TEMPO MEDIO */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase text-[10px] font-mono">
                        <Clock className="h-3.5 w-3.5" />
                        <span>TEMPO MÉDIO POR CONFERENTE</span>
                      </div>
                      <p className="text-slate-300 text-[10px]">
                        Definido em **SLA máximo de 30 minutos por caminhão** (guarita à liberação fiscal). O painel gerencial consolida o tempo médio real por conferente para avaliação semanal de eficiência individual e detecção de gargalos de pátio.
                      </p>
                    </div>

                    {/* INDICE DE ACERTO */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase text-[10px] font-mono">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>ÍNDICE DE ACERTO / ACURÁCIA</span>
                      </div>
                      <p className="text-slate-300 text-[10px]">
                        Mede o percentual de acerto entre a contagem cega de pátio e a conciliação fiscal no Promax. A **meta oficial é de 99.2% de acurácia**. Índices abaixo da meta indicam necessidade de reciclagem de equipe de pátio.
                      </p>
                    </div>

                    {/* LEAD TIME TOTAL */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold uppercase text-[10px] font-mono">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>OUTROS INDICADORES (KPI)</span>
                      </div>
                      <p className="text-slate-300 text-[10px]">
                        Inclui a taxa de reincidência de vales emitidos, tempo de digitação no Promax, tempo de manobra e segregação das devoluções no armazém por operador.
                      </p>
                    </div>

                  </div>

                  {/* VISUAL PREVIEW OF INTEGRATED DASHBOARD */}
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                    <span className="text-[10px] font-extrabold text-slate-300 uppercase block font-mono">Acompanhamento no Painel Gerencial Integrado</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-center">
                        <span className="text-[8px] text-slate-400 block uppercase font-mono">Tempo Unloading</span>
                        <span className="text-sm font-black text-emerald-400 block mt-0.5">24 min</span>
                        <span className="text-[7px] text-slate-500 font-mono">Meta DPO: &lt; 30m</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-center">
                        <span className="text-[8px] text-slate-400 block uppercase font-mono">Acurácia Contagem</span>
                        <span className="text-sm font-black text-emerald-400 block mt-0.5">99.4%</span>
                        <span className="text-[7px] text-slate-500 font-mono">Meta DPO: &gt; 99.2%</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-center">
                        <span className="text-[8px] text-slate-400 block uppercase font-mono">Mapas Fechados</span>
                        <span className="text-sm font-black text-white block mt-0.5">14 / 18</span>
                        <span className="text-[7px] text-slate-500 font-mono">Andamento: 4</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-center">
                        <span className="text-[8px] text-slate-400 block uppercase font-mono">Aderência DPO</span>
                        <span className="text-sm font-black text-white block mt-0.5">98.1%</span>
                        <span className="text-[7px] text-emerald-400 font-mono">✓ Excelente</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'blitz') && (
              <div className="space-y-4 bg-slate-950/20 p-5 rounded-2xl border border-slate-800/40" id="manual_section_6_7_8">
                
                {/* 6. BLITZ DE REFUGO */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-xxs font-black text-red-500 uppercase tracking-widest block font-mono">6. BLITZ DE REFUGO (CIRCULAR)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A **Blitz de Refugo** é uma rotina preventiva diária e obrigatória. Na importação de novos mapas, o sistema sorteia automaticamente **2 veículos por dia**. 
                    Este sorteio é **circular**, o que impede repetições de placas antes que toda a frota passe pela auditoria pelo menos uma vez. 
                    Ao iniciar a contagem de um caminhão em Blitz, o conferente deve rebater 100% das caixas e garrafas para identificar produtos trincados, avarias de giro ou sujeira interna, anexando obrigatoriamente as fotos de refugo no painel de controle.
                  </p>
                </div>

                {/* 7. ELABORADORES & 8. APROVADORES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                  <div className="space-y-1">
                    <span className="text-xxs font-black text-slate-400 uppercase tracking-widest block font-mono">7. ELABORADORES</span>
                    <span className="text-xs font-bold text-white block">Djeanderson Soares</span>
                    <span className="text-[10px] text-slate-400 block">Coordenador de Armazém • Revenda Pau Brasil</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xxs font-black text-slate-400 uppercase tracking-widest block font-mono">8. APROVADORES</span>
                    <span className="text-xs font-bold text-white block">Marcos Guilherme</span>
                    <span className="text-[10px] text-slate-400 block">GOD (Gerente de Operações de Distribuição)</span>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'unified' && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6" id="unified_sop_viewer">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xxs font-black text-emerald-400 uppercase tracking-widest font-mono">MODO DE VISUALIZAÇÃO REALISTA</span>
                    <h3 className="text-sm font-black text-white">Visualização de Padrão DPO (Papel Timbrado)</h3>
                  </div>
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-1.5 px-3.5 rounded-lg text-xxs transition-all cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Imprimir ou Exportar POP</span>
                  </button>
                </div>

                {/* Simulated Paper Sheets */}
                <div className="bg-white text-slate-950 p-8 sm:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto font-sans leading-relaxed text-[11px] space-y-10" id="paper_document_mockup">
                  
                  {/* DOCUMENT PAGE 1 */}
                  <div className="space-y-6">
                    {/* Header Table */}
                    <table className="w-full border-collapse border border-slate-300 text-left text-[9.5px]">
                      <tr>
                        <td className="border border-slate-300 p-3 font-bold text-slate-900 bg-slate-50 uppercase text-center w-1/3">
                          PAU BRASIL
                        </td>
                        <td className="border border-slate-300 p-3 font-extrabold text-[12px] text-center w-1/3 text-slate-950 leading-tight">
                          PADRÃO DE OPERAÇÃO DE RETORNO DE ROTA & CONCILIAÇÃO FISCAL (DPO)
                        </td>
                        <td className="border border-slate-300 p-3 text-slate-700 w-1/3">
                          <strong>CÓD:</strong> POP-LOG-004-AMB<br/>
                          <strong>REV:</strong> 03 (JULHO/2026)<br/>
                          <strong>ÁREA:</strong> LOGÍSTICA REVERSA
                        </td>
                      </tr>
                    </table>

                    {/* Metadata Table */}
                    <table className="w-full border-collapse border border-slate-300 text-[9.5px]">
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-2.5"><strong>Elaborador:</strong> Djeanderson Soares (Coord. Armazém)</td>
                        <td className="border border-slate-300 p-2.5"><strong>Data:</strong> 18/07/2026</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-2.5"><strong>Aprovador:</strong> Marcos Guilherme (GOD)</td>
                        <td className="border border-slate-300 p-2.5"><strong>Status:</strong> ✓ Aprovado e Vigente</td>
                      </tr>
                    </table>

                    {/* Index Box */}
                    <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50 space-y-2">
                      <span className="font-extrabold text-[10px] text-slate-900 uppercase block tracking-wider">ÍNDICE DE DIRETRIZES</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-700">
                        <li><strong>1.</strong> Objetivo</li>
                        <li><strong>4.2</strong> Conferência Pré-Saída</li>
                        <li><strong>2.</strong> Campo de Aplicação</li>
                        <li><strong>4.3</strong> Monitoramento em Rota</li>
                        <li><strong>3.</strong> Segurança (EPIs)</li>
                        <li><strong>5.</strong> Descrição do Fluxo Operacional</li>
                        <li><strong>4.</strong> Fluxo de Descarregamento</li>
                        <li><strong>5.1</strong> Conciliação Fiscal (Promax)</li>
                        <li><strong>4.1</strong> Matriz de Responsabilidade (RACI)</li>
                        <li><strong>6.</strong> Blitz de Refugo (Circular)</li>
                      </ul>
                    </div>

                    {/* 1. OBJETIVO */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">1. OBJETIVO</h4>
                      <p className="text-slate-700 text-justify">
                        O objetivo deste padrão, é definir normas e procedimentos para o processo de gestão no processo de utilização da área de contingência. Garantindo sempre a segurança, alta produtividade com acompanhamento de KPIs, e um plano estruturado para alto volume de devolução e retorno de rotas.
                      </p>
                    </div>

                    {/* 2. CAMPO DE APLICAÇÃO */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">2. CAMPO DE APLICAÇÃO</h4>
                      <p className="text-slate-700 text-justify">
                        Este padrão aplica-se integralmente à área do armazém da Revenda Pau Brasil matriz e filial.
                      </p>
                    </div>

                    {/* 3. SEGURANÇA */}
                    <div className="space-y-2.5">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">3. SEGURANÇA (EPI OBRIGATÓRIO)</h4>
                      <p className="text-slate-700 text-justify">
                        Todos os procedimentos previstos neste documento devem ser respaldados pelos requisitos do Pilar Segurança do DPO. Deve-se garantir a utilização dos EPIs mínimos obrigatórios: bota anti perfurante, óculos contra impactos, capacete, luvas de proteção a objetos cortantes, uniforme/colete refletivo de alta visibilidade.
                      </p>
                    </div>
                  </div>

                  {/* Page Indicator / Break */}
                  <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3 text-[9px] text-slate-400 font-mono">
                    <span>PAU BRASIL • POP-LOG-004-AMB • REV 03</span>
                    <span className="font-bold">Página 1 de 4</span>
                  </div>

                  {/* DOCUMENT PAGE 2 */}
                  <div className="space-y-6 pt-6">
                    {/* 4. FLUXO DE DESCARREGAMENTO */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">4. FLUXO DE DESCARREGAMENTO (LOGÍSTICA REVERSA)</h4>
                      <p className="text-slate-700 text-justify">
                        Sequenciamento lógico de atividades operacionais, desde o check-in na guarita do distribuidor até a conferência física e destinação dos ativos:
                      </p>
                      
                      {/* Flow List */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 gap-2">
                        <div className="flex items-start space-x-2 text-[10px] text-slate-800">
                          <span className="bg-amber-100 text-amber-800 font-extrabold font-mono text-center shrink-0 h-4.5 w-4.5 rounded-full text-[9px]">1</span>
                          <span><strong>Guarita:</strong> Veículo dá entrada e informa presença de devolução de produtos e ativos.</span>
                        </div>
                        <div className="flex items-start space-x-2 text-[10px] text-slate-800">
                          <span className="bg-amber-100 text-amber-800 font-extrabold font-mono text-center shrink-0 h-4.5 w-4.5 rounded-full text-[9px]">2</span>
                          <span><strong>Conferente (Cega):</strong> O conferente faz a contagem física cega de todos os ativos retornados da rota.</span>
                        </div>
                        <div className="flex items-start space-x-2 text-[10px] text-slate-800">
                          <span className="bg-amber-100 text-amber-800 font-extrabold font-mono text-center shrink-0 h-4.5 w-4.5 rounded-full text-[9px]">3</span>
                          <span><strong>Operador (Descarga):</strong> Manobra do veículo até a Red Zone para descarregamento rápido e triagem das caixas.</span>
                        </div>
                      </div>
                    </div>

                    {/* 4.1 MATRIZ RACI */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">4.1 MATRIZ DE RESPONSABILIDADE (RACI DE PÁTIO)</h4>
                      
                      {/* RACI explanatory Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 text-[10px]">
                        <strong>Significado da Matriz RACI:</strong> Governança que mapeia os envolvidos. 
                        <strong> [R] Responsável:</strong> Executor direto da atividade ("quem faz"). 
                        <strong> [A] Aprovador:</strong> Autoridade final que responde pelo resultado ("quem manda"). 
                        <strong> [C] Consultado:</strong> Fornece conselhos e suporte ("quem ajuda"). 
                        <strong> [I] Informado:</strong> Recebe a notificação de encerramento.
                      </div>

                      <table className="w-full text-left border-collapse border border-slate-300 text-[9px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 uppercase">
                            <th className="p-2 border border-slate-300">Atividade</th>
                            <th className="p-2 text-center border border-slate-300">Motorista</th>
                            <th className="p-2 text-center border border-slate-300">Conferente</th>
                            <th className="p-2 text-center border border-slate-300">Aux. Fiscal</th>
                            <th className="p-2 text-center border border-slate-300">Operador</th>
                            <th className="p-2 text-center border border-slate-300">GOD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                          <tr>
                            <td className="p-2 font-bold border border-slate-300">Conferência Prévia de Carga (Saída)</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-red-600 bg-red-50/50">R</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-sky-600 bg-sky-50/50">C</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-emerald-600 bg-emerald-50/50">I</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-bold border border-slate-300">Conferência Física do Retorno (Cega)</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-sky-600 bg-sky-50/50">C</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-red-600 bg-red-50/50">R</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-emerald-600 bg-emerald-50/50">I</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-amber-600 bg-amber-50/50">A</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-bold border border-slate-300">Descarregamento do Veículo</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                            <td className="p-2 text-center border border-slate-300">-</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-red-600 bg-red-50/50">R</td>
                            <td className="p-2 text-center border border-slate-300 font-bold text-amber-600 bg-amber-50/50">A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Page Indicator / Break */}
                  <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3 text-[9px] text-slate-400 font-mono">
                    <span>PAU BRASIL • POP-LOG-004-AMB • REV 03</span>
                    <span className="font-bold">Página 2 of 4</span>
                  </div>

                  {/* DOCUMENT PAGE 3 */}
                  <div className="space-y-6 pt-6">
                    {/* 4.2 CONFERENCIA MOTORISTA */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">4.2 CONFERÊNCIA OBRIGATÓRIA DA CARGA (PREVENÇÃO DE FALTAS)</h4>
                      <p className="text-slate-700 text-justify bg-amber-50 border border-amber-200 p-3 rounded-lg font-medium">
                        <strong>DIRETRIZ CRÍTICA:</strong> É de total e exclusiva responsabilidade do MOTORISTA conferir 100% da carga, ativos e vasilhames fisicamente antes de assinar a liberação e sair do pátio do distribuidor. Qualquer divergência de falta identificada após a saída do caminhão será imputada integralmente ao motorista através da geração de vales.
                      </p>
                    </div>

                    {/* 4.3 MONITORAMENTO EM ROTA */}
                    <div className="space-y-2.5">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">4.3 MONITORAMENTO EM ROTA & ATUALIZAÇÕES DA PLATAFORMA</h4>
                      <p className="text-slate-700 text-justify">
                        O monitoramento de rotas comunica-se em tempo real com a coordenação de logística para garantir a acurácia dos inventários e planejar o recebimento:
                      </p>
                      <ul className="list-disc pl-5 text-slate-700 space-y-1 text-[10px]">
                        <li><strong>Movimentações em Rota (Recolha & Comodatos):</strong> Registro imediato de ativos extras ou choppeiras de comodato recolhidas no comércio, integrando a carga ao balanço de retorno.</li>
                        <li><strong>Previsão de Chegada (ETA):</strong> Cálculo contínuo baseado nas rotas em trânsito para alocação adequada da capacidade de pátio e escala de pessoal.</li>
                        <li><strong>Veículos para Pernoite:</strong> Identificação precoce de veículos que excederam a jornada, programando sua recepção prioritária na manhã do dia útil seguinte.</li>
                      </ul>
                    </div>

                    {/* 5. DESCRIÇÃO DO FLUXO OPERACIONAL */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">5. DESCRIÇÃO DO FLUXO OPERACIONAL</h4>
                      <p className="text-slate-700 text-justify">
                        Na chegada à guarita, é verificado se o carro traz devoluções. Após a conferência cega na Red Zone, o operador inicia o descarregamento, rebatendo os pallets. Qualquer pallet irregular ou fora dos padrões é encaminhado imediatamente para a área segregada de Blitz de Refugo para reinspeção.
                      </p>
                    </div>

                    {/* 5.1 CONCILIAÇÃO FISCAL (PROMAX) */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">5.1 CONCILIAÇÃO FISCAL CRÍTICA (SISTEMA PROMAX)</h4>
                      <p className="text-slate-700 text-justify">
                        A Auxiliar de Armazém executa a <strong>rotina 05.01 - Retorno de Rota / Reconciliação Fiscal</strong> no sistema Promax. <strong>A rotina no Promax para verificar o que se pede no fiscal (itens solicitados/faturados da carga) é a 03.03.02</strong>. Ela deve inserir manualmente cada item e saldo físico que retornou. <strong>Todos os campos iniciam ZERADOS (0)</strong>, sendo proibida a digitação automática de saldos sugeridos pelo sistema. A conciliação é homologada eletronicamente.
                      </p>
                    </div>
                  </div>

                  {/* Page Indicator / Break */}
                  <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3 text-[9px] text-slate-400 font-mono">
                    <span>PAU BRASIL • POP-LOG-004-AMB • REV 03</span>
                    <span className="font-bold">Página 3 of 4</span>
                  </div>

                  {/* DOCUMENT PAGE 4 */}
                  <div className="space-y-6 pt-6">
                    {/* 5.2 PRODUTIVIDADE & KPIS */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">5.2 GESTÃO DE PRODUTIVIDADE, SLAS E EFICIÊNCIA</h4>
                      <p className="text-slate-700 text-justify">
                        Baseia-se em indicadores acompanhados em tempo real na plataforma gerencial:
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                          <span className="font-extrabold text-[8.5px] text-slate-800 uppercase block">SLA DE DESCARGA</span>
                          <span className="text-[10px] text-slate-600 block mt-0.5">Tempo máximo de 30 minutos por veículo de rota.</span>
                        </div>
                        <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                          <span className="font-extrabold text-[8.5px] text-slate-800 uppercase block">ACURÁCIA DE CONTAGEM</span>
                          <span className="text-[10px] text-slate-600 block mt-0.5">Meta mínima estabelecida de 99.2% de acerto físico inicial.</span>
                        </div>
                      </div>
                    </div>

                    {/* 6. BLITZ DE REFUGO */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs text-slate-950 uppercase border-b border-slate-200 pb-1 font-mono">6. BLITZ DE REFUGO (CIRCULAR)</h4>
                      <p className="text-slate-700 text-justify font-sans">
                        Sorteio automático de <strong>2 veículos por dia</strong> de forma circular pela plataforma Pau Brasil. Todo engradado e caixa sorteada devem ser retirados para a área de refugo de ativos, de modo a inspecionar sujidade, garrafas trincadas ou ativos avariados fora de giro de estoque comercial.
                      </p>
                    </div>

                    {/* 7. ELABORADORES & APROVADORES */}
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <h4 className="font-extrabold text-[10px] text-slate-950 uppercase font-mono">RESPONSÁVEIS DE HOMOLOGAÇÃO</h4>
                      <div className="grid grid-cols-2 gap-4 text-[9.5px] text-slate-700">
                        <div>
                          <strong>Elaborador Técnico:</strong><br/>
                          Djeanderson Soares<br/>
                          Coordenador de Armazém • Pau Brasil
                        </div>
                        <div>
                          <strong>Autoridade Aprovadora (DPO):</strong><br/>
                          Marcos Guilherme<br/>
                          GOD (Gerente de Operações de Distribuição)
                        </div>
                      </div>
                    </div>

                    {/* Quality badge footer */}
                    <div className="border-t border-slate-300 pt-3 text-center text-[8px] text-slate-400 uppercase tracking-widest font-mono">
                      PAU BRASIL DISTRIBUIDORA AMBEV • DOCUMENTO VIGENTE SOB CONTROLE DPO AMBEV
                    </div>
                  </div>

                  {/* Page Indicator / Break */}
                  <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3 text-[9px] text-slate-400 font-mono">
                    <span>PAU BRASIL • POP-LOG-004-AMB • REV 03</span>
                    <span className="font-bold">Página 4 of 4</span>
                  </div>

                </div>
              </div>
            )}

            {/* Quality Standard badge / Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xxs text-slate-400 font-mono">
              <span>DOCUMENTO DE QUALIDADE CONTROLADO • CÓD: POP-LOG-004-AMB</span>
              <span className="text-emerald-500 font-bold">✓ Homologado Ambev DPO</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

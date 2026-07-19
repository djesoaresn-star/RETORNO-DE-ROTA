import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';
import { AppStore } from '../store';
import { isClientFirebaseActive } from '../clientFirebase';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou o Assistente de Inteligência Artificial da plataforma. Posso tirar qualquer dúvida sobre a operação física de pátio, reconciliação fiscal, monitoramento de viagens ou cadastro de motoristas e veículos. Como posso te ajudar hoje?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true); // Toast indicator for welcome
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickQuestions = [
    "Como iniciar uma conferência?",
    "Como funciona o pernoite?",
    "O que fazer se houver sobras?",
    "Como pedir recontagem fiscal?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', text: textToSend }
    ];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    if (isClientFirebaseActive()) {
      try {
        console.log("[ClientFirebase] Usando Gemini diretamente no cliente para o chat...");
        const apiKey = localStorage.getItem('logiroute_gemini_api_key') ||
                       (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined) ||
                       ((import.meta as any).env?.VITE_GEMINI_API_KEY) ||
                       undefined;

        if (!apiKey) {
          throw new Error("Chave API do Gemini não configurada. Salve sua chave no painel de Configurações (Aba Conexão Firebase) como Gestor para utilizar o Assistente no GitHub Pages.");
        }

        const ai = new GoogleGenAI({ apiKey });

        let activeDatabaseContext = "Nenhum dado ativo no momento.";
        try {
          const routes = AppStore.getImportedRoutes() || [];
          const audits = AppStore.getAudits() || [];
          const vales = AppStore.getVales() || [];
          const drivers = AppStore.getDrivers() || [];

          const openRoutes = routes.filter((r: any) => r.status !== 'fechado');
          const closedRoutes = routes.filter((r: any) => r.status === 'fechado');

          const valesPendentes = vales.filter((v: any) => v.status === 'PENDENTE_ASSINATURA');
          const valesAssinados = vales.filter((v: any) => v.status === 'ASSINADO');
          const valesCompensados = vales.filter((v: any) => v.status === 'COMPENSADO');

          activeDatabaseContext = `
DADOS ATIVOS EM TEMPO REAL DA UNIDADE:
- Rotas Importadas Totais: ${routes.length} (Abertas: ${openRoutes.length}, Fechadas: ${closedRoutes.length})
- Rotas em Aberto no momento: ${openRoutes.map((r: any) => `Mapa ${r.routeMap} (Placa ${r.plate}, Status ${r.status})`).join(', ') || 'Nenhuma'}
- Auditorias com Divergência Registradas: ${audits.filter((a: any) => a.status === 'finalizado_divergente').length}
- Vales de Colaboradores: Total de ${vales.length} vales.
  * Pendentes de assinatura: ${valesPendentes.length} vales (Total R$ ${valesPendentes.reduce((acc: number, curr: any) => acc + (curr.valor || 0), 0).toFixed(2)})
  * Assinados: ${valesAssinados.length} vales (Total R$ ${valesAssinados.reduce((acc: number, curr: any) => acc + (curr.valor || 0), 0).toFixed(2)})
  * Compensados/Descontados: ${valesCompensados.length} vales

Detalhes de Auditorias Ativas com Divergências de Sobras/Faltas de PA (Produto Acabado) e AG (Ativo de Giro):
${audits.map((a: any) => {
  const driverName = drivers.find((d: any) => d.id === a.driverId)?.name || 'Desconhecido';
  const surplusPA = a.items.filter((i: any) => (i.rePhysicalQty ?? i.physicalQty) > (i.fiscalQty ?? 0));
  const deficitPA = a.items.filter((i: any) => (i.rePhysicalQty ?? i.physicalQty) < (i.fiscalQty ?? 0));
  const surplusAG = a.assets.filter((as: any) => (as.rePhysicalQty ?? as.physicalQty) > (as.fiscalQty ?? 0));
  const deficitAG = a.assets.filter((as: any) => (as.rePhysicalQty ?? as.physicalQty) < (as.fiscalQty ?? 0));

  let info = `* Mapa ${a.routeMap} (Placa: ${a.plate}, Motorista: ${driverName}, Status Geral: ${a.status}):\n`;
  if (surplusPA.length > 0) {
    info += `  - Sobras de PA (Produto Acabado): ${surplusPA.map((i: any) => `${i.productDescription} (+${(i.rePhysicalQty ?? i.physicalQty) - (i.fiscalQty ?? 0)} un)`).join(', ')}\n`;
  }
  if (deficitPA.length > 0) {
    info += `  - Faltas de PA (Produto Acabado): ${deficitPA.map((i: any) => `${i.productDescription} (-${(i.fiscalQty ?? 0) - (i.rePhysicalQty ?? i.physicalQty)} un)`).join(', ')}\n`;
  }
  if (surplusAG.length > 0) {
    info += `  - Sobras de AG (Ativo de Giro): ${surplusAG.map((as: any) => `${as.assetName} (+${(as.rePhysicalQty ?? as.physicalQty) - (as.fiscalQty ?? 0)} un)`).join(', ')}\n`;
  }
  if (deficitAG.length > 0) {
    info += `  - Faltas de AG (Ativo de Giro): ${deficitAG.map((as: any) => `${as.assetName} (-${(as.fiscalQty ?? 0) - (as.rePhysicalQty ?? as.physicalQty)} un)`).join(', ')}\n`;
  }
  if (a.correctiveActionNotes) {
    info += `  - Observação/Ação Corretiva: "${a.correctiveActionNotes}"\n`;
  }
  return info;
}).join('\n') || 'Nenhuma auditoria com divergência registrada no momento.'}

Lista de Vales de Faltas Gerados na Unidade por Colaborador:
${vales.map((v: any) => `- Vale ID: ${v.id} | Colaborador: ${v.colaboradorName} (${v.colaboradorRole}) | Valor: R$ ${v.valor.toFixed(2)} | Motivo: ${v.descricao} | Status: ${v.status} | Obs: ${v.observacao || 'Sem observação'}`).join('\n') || 'Nenhum vale gerado.'}
`;
        } catch (dbError) {
          console.error("Erro ao obter dados dinâmicos para chat:", dbError);
        }

        const systemInstruction = `Você é o Assistente Virtual Inteligente da plataforma "Aferição de Retorno de Rota - Pau Brasil Distribuidora Ambev". 
Seu papel é tirar dúvidas dos usuários de forma prestativa, direta, simples e profissional, dando respostas EXTREMAMENTE ASSERTIVAS baseadas nos dados ativos e reais de faturamento e divergências da unidade.

Sobre a plataforma:
- A plataforma gerencia o retorno dos caminhões de rota da Pau Brasil Distribuidora Ambev.
- Existem 4 perfis/funções principais:
  1. Conferente de Pátio: Faz a contagem física (produtos e ativos como paletes/chapas/garrafeiras) dos caminhões que retornam. Pode pausar a conferência com justificativa se necessário.
  2. Auxiliar de Logística (Fiscal): Faz a conciliação/reconciliação fiscal comparando a contagem física do Conferente com o faturamento fiscal. Pode aprovar, aprovar com sobras/faltas ou solicitar recontagem (nova conferência) caso as divergências sejam injustificáveis. Também pode sincronizar planilhas.
  3. Monitoramento: Define previsões de chegada (ETA), tripStatus (se retorna no dia ou pernoita), observações de rota e monitora as viagens em tempo real.
  4. Gestor Master: Tem acesso ao Painel Gerencial (KPIs, tempos médios, produtividade) e Guias de Cadastro (gerenciar Motoristas, Veículos, Produtos e Usuários).

Regras de Negócio Importantes:
- PERNOITE: Quando um caminhão não retorna no mesmo dia e pernoita fora da distribuidora. O monitoramento atualiza isso para sinalizar ao pátio.
- RECONTAL / SOLICITAR RECONTAGEM: Quando o Fiscal identifica que a divergência está fora do aceitável, ele pode recusar e pedir que o Conferente refaça a contagem daquele item ou do mapa inteiro.
- PAUSA DE CONFERÊNCIA: O Conferente pode pausar uma conferência ativa por motivos urgentes (ex: ir ao banheiro, parada técnica, etc.), fornecendo uma observação obrigatória. Esta tela agora está totalmente visível e funcional.
- SOBRAS & FALTAS PA/AG: Divididos de forma organizada em Produtos Acabados (PA) e Ativos de Giro (AG). São as discrepâncias físicas versus fiscais geradas após a contagem.
- CONTROLE DE VALES: Quando ocorrem faltas físicas de mercadoria, pode ser gerado um Vale (desconto/compensação) com histórico de vales gerados para cada colaborador para controle do financeiro/gestão.

Aqui estão os dados operacionais ATIVOS da unidade em tempo real para responder de forma super precisa:
---------------------------
${activeDatabaseContext}
---------------------------
`;

        const contents = [
          ...messages
            .filter(m => m.id !== 'welcome')
            .map(m => ({
              role: m.role,
              parts: [{ text: m.text }]
            })),
          {
            role: 'user',
            parts: [{ text: textToSend }]
          }
        ];

        let response;
        try {
          console.log("Tentando gerar resposta no cliente com gemini-3.5-flash...");
          response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
            }
          });
        } catch (firstError: any) {
          console.warn("Falha no gemini-3.5-flash no cliente, tentando fallback para gemini-3.1-flash-lite...", firstError?.message || firstError);
          try {
            response = await ai.models.generateContent({
              model: "gemini-3.1-flash-lite",
              contents: contents,
              config: {
                systemInstruction: systemInstruction,
              }
            });
          } catch (secondError: any) {
            console.warn("Falha no gemini-3.1-flash-lite no cliente, tentando fallback para gemini-2.5-flash...", secondError?.message || secondError);
            try {
              response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: contents,
                config: {
                  systemInstruction: systemInstruction,
                }
              });
            } catch (thirdError: any) {
              console.warn("Falha no gemini-2.5-flash no cliente, tentando fallback para gemini-1.5-flash...", thirdError?.message || thirdError);
              response = await ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents: contents,
                config: {
                  systemInstruction: systemInstruction,
                }
              });
            }
          }
        }

        if (response && response.text) {
          setMessages(prev => [
            ...prev,
            { id: `ai-${Date.now()}`, role: 'model', text: response.text! }
          ]);
        } else {
          throw new Error("Resposta vazia da inteligência artificial.");
        }

      } catch (err: any) {
        console.error(err);
        setMessages(prev => [
          ...prev,
          { 
            id: `ai-${Date.now()}`, 
            role: 'model', 
            text: `Erro ao conectar com a I.A.: ${err.message || err}. Certifique-se de que a chave GEMINI_API_KEY está configurada no painel Secrets.` 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          // Format history excluding the welcome message
          history: messages
            .filter(m => m.id !== 'welcome')
            .map(m => ({
              role: m.role,
              text: m.text
            }))
        })
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonErr) {
          console.error("Error parsing chat response JSON:", jsonErr);
        }
      } else {
        console.warn("Unexpected chat response content type:", contentType);
      }
      
      if (response.ok && data.text) {
        setMessages(prev => [
          ...prev,
          { id: `ai-${Date.now()}`, role: 'model', text: data.text }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { 
            id: `ai-${Date.now()}`, 
            role: 'model', 
            text: data.error || 'Desculpe, ocorreu uma instabilidade ao conectar com o servidor da I.A. Verifique se o seu GEMINI_API_KEY está configurado corretamente.' 
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { 
          id: `ai-${Date.now()}`, 
          role: 'model', 
          text: 'Não foi possível estabelecer contato com a inteligência artificial. Certifique-se de que o servidor está rodando.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ai_agent_chat_wrapper">
      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          id="ai_chat_fab_button"
          onClick={() => setIsOpen(true)}
          className="relative group bg-[#0f35a9] hover:bg-[#0c2a86] text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer border border-[#0f35a9]/50 hover:scale-105"
          title="Fale com a Inteligência Artificial"
        >
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] font-extrabold text-white items-center justify-center">1</span>
            </span>
          )}
          <Bot className="h-6 w-6 text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            Dúvidas? Fale com a I.A
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          id="ai_chat_window"
          className="bg-white rounded-2xl shadow-3xl border border-slate-200 w-80 sm:w-96 h-[480px] flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-[#0f35a9]/10 rounded-lg border border-[#0f35a9]/30">
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-none flex items-center gap-1">
                  Assistente Pau Brasil
                  <span className="bg-[#0f35a9] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">I.A</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Operações Pau Brasil Ambev</p>
              </div>
            </div>
            <button
              id="ai_chat_close_button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-slate-200 border-slate-300 text-slate-700' 
                    : 'bg-[#0f35a9]/10 border-[#0f35a9]/20 text-[#0f35a9]'
                }`}>
                  {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#0f35a9] text-white rounded-tr-none'
                    : 'bg-white text-slate-700 shadow-3xs border border-slate-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="h-7 w-7 rounded-full bg-[#0f35a9]/10 border-[#0f35a9]/20 text-[#0f35a9] flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex items-center space-x-1.5 shadow-3xs">
                  <span className="w-1.5 h-1.5 bg-[#0f35a9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#0f35a9] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#0f35a9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-slate-100/50 border-t border-slate-100 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-[10px] text-slate-600 hover:text-slate-800 font-medium px-2 py-1 rounded-lg transition text-left shrink-0 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit} 
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida sobre o sistema..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0f35a9] focus:border-[#0f35a9] transition disabled:opacity-60"
            />
            <button
              id="ai_chat_send_button"
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-[#0f35a9] hover:bg-[#0c2a86] text-white p-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              title="Enviar mensagem"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

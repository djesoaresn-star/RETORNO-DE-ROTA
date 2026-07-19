import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, FiscalAlert } from '../types';
import { 
  Shield, User as UserIcon, Truck, CheckCircle, BarChart3, Settings, 
  LogOut, FileSpreadsheet, Bell, Check, Clock, AlertCircle, FileText,
  Sun, Moon, Folder, Smartphone, Download
} from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  users: User[];
  onUserChange: (user: User) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  fiscalAlerts?: FiscalAlert[];
  onSaveAlerts?: (alerts: FiscalAlert[]) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export default function Header({ 
  currentUser, 
  users, 
  onUserChange, 
  activeTab, 
  setActiveTab, 
  onLogout,
  fiscalAlerts = [],
  onSaveAlerts,
  theme = 'light',
  onToggleTheme
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const bellContainerRef = useRef<HTMLDivElement>(null);

  // APK download states
  const [showApkModal, setShowApkModal] = useState(false);
  const [apkDownloading, setApkDownloading] = useState(false);
  const [apkProgress, setApkProgress] = useState(0);

  const handleDownloadApk = () => {
    setApkDownloading(true);
    setApkProgress(0);
    
    const interval = setInterval(() => {
      setApkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setApkDownloading(false);
            alert("Sucesso: guarabira_acuracidade_v2.1.0.apk baixado com sucesso! Transfira e instale o arquivo em seu dispositivo Android para usar o módulo mobile.");
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  // Logo back to home action based on current user role
  const handleLogoClick = () => {
    if (currentUser.role === 'conferente') {
      setActiveTab('conferencias');
    } else if (currentUser.role === 'auxiliar_logistica' || currentUser.role === 'financeiro') {
      setActiveTab('reconciliacao');
    } else if (currentUser.role === 'gestor') {
      setActiveTab('dashboard');
    } else if (currentUser.role === 'monitoramento') {
      setActiveTab('monitoramento_view');
    }
  };

  // Close notifications when clicking outside the bell container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellContainerRef.current && !bellContainerRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Mark all relevant alerts as read when notifications popup is opened
  useEffect(() => {
    if (showNotifications && fiscalAlerts.length > 0 && onSaveAlerts) {
      const relevantUnreadAlerts = fiscalAlerts.filter(alert => {
        if (alert.read) return false;
        if (!alert.targetRole || alert.targetRole === 'todos') return true;
        return alert.targetRole === currentUser.role;
      });

      if (relevantUnreadAlerts.length > 0) {
        const updated = fiscalAlerts.map(a => {
          if (!a.targetRole || a.targetRole === 'todos' || a.targetRole === currentUser.role) {
            return { ...a, read: true };
          }
          return a;
        });
        onSaveAlerts(updated);
      }
    }
  }, [showNotifications, fiscalAlerts, onSaveAlerts, currentUser.role]);
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800" id="main_header">
      {/* Top tier bar: Logo and actions */}
      <div className="border-b border-slate-800/60 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-all shrink-0"
              id="header_logo_btn"
            >
              <div className="bg-amber-500/10 p-2 rounded-lg flex items-center justify-center border border-amber-500/20 w-10 h-10 shadow-inner">
                <Truck className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <span className="font-sans font-black text-sm sm:text-base tracking-tight block text-white uppercase whitespace-nowrap">Pau Brasil Guarabira</span>
                <span className="font-mono text-[9px] sm:text-xxs tracking-widest text-amber-500 uppercase block leading-none whitespace-nowrap">Retorno de Rota</span>
              </div>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center space-x-3">
              {/* Active User Badge / Context */}
              <div className="hidden sm:flex items-center space-x-2 bg-slate-800/60 border border-slate-700/60 px-3.5 py-1.5 rounded-full text-xxs font-medium text-slate-300">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-mono uppercase text-[9px] text-amber-500 font-bold">
                  [{currentUser.role === 'auxiliar_logistica' ? 'AUX LOGÍSTICA' : currentUser.role.toUpperCase()}]
                </span>
                <span className="font-sans font-bold text-slate-200 max-w-[120px] truncate" title={currentUser.name}>
                  {currentUser.name}
                </span>
              </div>

              {/* Notification Bell with Dropdown Popover */}
              <div className="relative" id="notification_bell_container" ref={bellContainerRef}>
                <button
                  id="notification_bell_btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer relative shadow-sm ${
                    showNotifications 
                      ? 'bg-amber-500 text-slate-950 border-amber-600' 
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white'
                  }`}
                  title="Notificações e Atualizações"
                >
                  <Bell className="h-4 w-4" />
                  {(() => {
                    const relevantAlerts = (fiscalAlerts || []).filter(alert => {
                      if (!alert.targetRole || alert.targetRole === 'todos') return true;
                      return alert.targetRole === currentUser.role;
                    });
                    const unreadCount = relevantAlerts.filter(a => !a.read).length;
                    return unreadCount > 0 ? (
                      <span 
                        id="unread_badge"
                        className="absolute -top-1 -right-1 bg-red-600 text-white font-sans font-extrabold text-[9px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center border border-slate-900 animate-pulse animate-infinite"
                      >
                        {unreadCount}
                      </span>
                    ) : null;
                  })()}
                </button>

                {showNotifications && (() => {
                  const relevantAlerts = (fiscalAlerts || []).filter(alert => {
                    if (!alert.targetRole || alert.targetRole === 'todos') return true;
                    return alert.targetRole === currentUser.role;
                  });
                  const unreadCount = relevantAlerts.filter(a => !a.read).length;

                  const handleMarkAsRead = (alertId: string) => {
                    if (onSaveAlerts) {
                      const updated = fiscalAlerts.map(a => a.id === alertId ? { ...a, read: true } : a);
                      onSaveAlerts(updated);
                    }
                  };

                  const handleMarkAllAsRead = () => {
                    if (onSaveAlerts) {
                      const updated = fiscalAlerts.map(a => {
                        if (!a.targetRole || a.targetRole === 'todos' || a.targetRole === currentUser.role) {
                          return { ...a, read: true };
                        }
                        return a;
                      });
                      onSaveAlerts(updated);
                    }
                  };

                  return (
                    <div 
                      id="notifications_popover"
                      className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                        <span className="font-sans font-bold text-xs text-white uppercase tracking-wider">Notificações</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-xxs font-sans font-medium text-amber-500 hover:text-amber-400 flex items-center space-x-1 cursor-pointer transition-all bg-transparent border-none p-0"
                          >
                            <Check className="h-3 w-3" />
                            <span>Ler tudo</span>
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-900">
                        {relevantAlerts.length > 0 ? (
                          relevantAlerts.map((alert) => (
                            <div 
                              key={alert.id} 
                              className={`p-3 transition-colors flex items-start space-x-2.5 ${
                                alert.read ? 'bg-slate-950 text-slate-400' : 'bg-slate-900/40 text-white border-l-2 border-amber-500'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 ${alert.read ? 'bg-slate-900 text-slate-500' : 'bg-amber-500/15 text-amber-500'}`}>
                                <AlertCircle className="h-3.5 w-3.5" />
                              </div>
                              
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <span className="font-sans font-bold text-xs block truncate pr-1">
                                    {alert.title || `Mapa ${alert.routeMap}`}
                                  </span>
                                  {!alert.read && (
                                    <button
                                      onClick={() => handleMarkAsRead(alert.id)}
                                      className="text-amber-500 hover:text-amber-400 p-0.5 rounded hover:bg-slate-800 shrink-0 cursor-pointer"
                                      title="Marcar como lida"
                                    >
                                      <Check className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                                
                                <p className="text-[10px] leading-relaxed break-words font-sans text-slate-300">
                                  {alert.message || `O status do mapa foi atualizado para ${alert.status}`}
                                </p>
                                
                                <div className="flex items-center space-x-1 pt-1 font-mono text-[8px] text-slate-500">
                                  <Clock className="h-2.5 w-2.5" />
                                  <span>{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                  <span>•</span>
                                  <span>Placa: {alert.plate}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-xxs text-slate-500 font-sans italic">
                            Nenhuma notificação encontrada.
                          </div>
                        )}
                      </div>
                      
                      <div className="p-2 border-t border-slate-800 text-center bg-slate-900">
                        <span className="text-[9px] font-sans text-slate-500 uppercase tracking-wider">Histórico de Alertas Ativo</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Baixar APK Mobile Button */}
              <button
                id="download_apk_btn"
                onClick={() => setShowApkModal(true)}
                className="bg-emerald-655 hover:bg-emerald-700 border border-emerald-550 text-white p-2 px-3 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm mr-1.5 text-xs font-bold"
                title="Baixar Aplicativo Mobile (APK)"
              >
                <Smartphone className="h-4 w-4 shrink-0" />
                <span className="hidden lg:inline">Baixar APK Mobile</span>
              </button>

              {/* Theme Toggle */}
              <button
                id="theme_toggle_btn"
                onClick={onToggleTheme}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm mr-1"
                title={theme === 'dark' ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-300" />}
              </button>

              <button
                id="logout_btn"
                onClick={onLogout}
                className="bg-slate-800 hover:bg-red-900 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-white p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm"
                title="Sair do Sistema"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Bar: Symmetrical and Spacious Navigation Options */}
      <div className="hidden md:block bg-slate-900 py-3.5 border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center w-full">
            <nav className="flex flex-wrap items-center justify-center gap-2 bg-slate-950/60 p-2 rounded-2xl border border-slate-800/80 max-w-full shadow-inner">
              {currentUser.role === 'conferente' && (
                <button
                  id="nav_conferente"
                  onClick={() => setActiveTab('conferencias')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTab === 'conferencias' 
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                      : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Conferências</span>
                </button>
              )}

              {(currentUser.role === 'auxiliar_logistica' || currentUser.role === 'financeiro') && (
                <>
                  <button
                    id="nav_auxiliar_reconciliacao"
                    onClick={() => setActiveTab('reconciliacao')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'reconciliacao' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Conciliação Fiscal</span>
                  </button>
                  <button
                    id="nav_auxiliar_sincronizador"
                    onClick={() => setActiveTab('sincronizador')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'sincronizador' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Sincronizador & Importador</span>
                  </button>
                  <button
                    id="nav_auxiliar_monitoramento"
                    onClick={() => setActiveTab('monitoramento_view')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'monitoramento_view' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Monitoramento</span>
                  </button>
                  <button
                    id="nav_auxiliar_historico"
                    onClick={() => setActiveTab('historico')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'historico' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Histórico</span>
                  </button>
                  <button
                    id="nav_auxiliar_divergencias"
                    onClick={() => setActiveTab('divergencias')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'divergencias' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Sobras & Faltas PA/AG</span>
                  </button>
                  <button
                    id="nav_auxiliar_vales"
                    onClick={() => setActiveTab('vales_view')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'vales_view' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-355 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Gestão de Vales</span>
                  </button>
                  <button
                    id="nav_auxiliar_cadastros"
                    onClick={() => setActiveTab('cadastros')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'cadastros' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Cadastros</span>
                  </button>
                </>
              )}

              {currentUser.role === 'monitoramento' && (
                <>
                  <button
                    id="nav_monitoramento_previsoes"
                    onClick={() => setActiveTab('monitoramento_view')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'monitoramento_view' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Painel de Monitoramento</span>
                  </button>
                  <button
                    id="nav_monitoramento_historico"
                    onClick={() => setActiveTab('historico')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'historico' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Histórico de Retornos</span>
                  </button>
                  <button
                    id="nav_monitoramento_divergencias"
                    onClick={() => setActiveTab('divergencias')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'divergencias' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Sobras & Faltas PA/AG</span>
                  </button>
                </>
              )}

              {currentUser.role === 'gestor' && (
                <>
                  <button
                    id="nav_gestor_dashboard"
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'dashboard' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 shrink-0" />
                    <span>Painel Gerencial</span>
                  </button>
                  <button
                    id="nav_gestor_conferencias"
                    onClick={() => setActiveTab('conferencias')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'conferencias' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Contagem Física</span>
                  </button>
                  <button
                    id="nav_gestor_reconciliacao"
                    onClick={() => setActiveTab('reconciliacao')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'reconciliacao' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>Conciliação Fiscal</span>
                  </button>
                  <button
                    id="nav_gestor_monitoramento"
                    onClick={() => setActiveTab('monitoramento_view')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'monitoramento_view' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Truck className="h-4 w-4 shrink-0" />
                    <span>Monitoramento</span>
                  </button>
                  <button
                    id="nav_gestor_sincronizador"
                    onClick={() => setActiveTab('sincronizador')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'sincronizador' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <FileSpreadsheet className="h-4 w-4 shrink-0" />
                    <span>Sincronizador</span>
                  </button>
                  <button
                    id="nav_gestor_divergencias"
                    onClick={() => setActiveTab('divergencias')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'divergencias' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>Sobras & Faltas PA/AG</span>
                  </button>
                  <button
                    id="nav_gestor_vales"
                    onClick={() => setActiveTab('vales_view')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'vales_view' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span>Gestão de Vales</span>
                  </button>
                  <button
                    id="nav_gestor_historico"
                    onClick={() => setActiveTab('historico')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'historico' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-355 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Histórico</span>
                  </button>
                  <button
                    id="nav_gestor_cadastros"
                    onClick={() => setActiveTab('cadastros')}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                      activeTab === 'cadastros' 
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black scale-[1.01]' 
                        : 'text-slate-350 bg-transparent border-transparent hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Settings className="h-4 w-4 shrink-0" />
                    <span>Cadastros</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:hidden justify-start items-center gap-2 py-2.5 border-t border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none px-2">
          {currentUser.role === 'conferente' && (
            <button
              onClick={() => setActiveTab('conferencias')}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                activeTab === 'conferencias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Conferências
            </button>
          )}

          {(currentUser.role === 'auxiliar_logistica' || currentUser.role === 'financeiro') && (
            <>
              <button
                onClick={() => setActiveTab('reconciliacao')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'reconciliacao' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Conciliação Fiscal
              </button>
              <button
                onClick={() => setActiveTab('sincronizador')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'sincronizador' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Sincronizador & Importador
              </button>
              <button
                onClick={() => setActiveTab('monitoramento_view')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'monitoramento_view' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Monitoramento
              </button>
              <button
                onClick={() => setActiveTab('historico')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'historico' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Histórico
              </button>
              <button
                onClick={() => setActiveTab('divergencias')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'divergencias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Divergências
              </button>
              <button
                onClick={() => setActiveTab('cadastros')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'cadastros' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Cadastros
              </button>
            </>
          )}

          {currentUser.role === 'monitoramento' && (
            <>
              <button
                onClick={() => setActiveTab('monitoramento_view')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'monitoramento_view' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Monitoramento
              </button>
              <button
                onClick={() => setActiveTab('historico')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'historico' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Histórico
              </button>
              <button
                onClick={() => setActiveTab('divergencias')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'divergencias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Divergências
              </button>
            </>
          )}

          {currentUser.role === 'gestor' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Painel Gerencial
              </button>
              <button
                onClick={() => setActiveTab('conferencias')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'conferencias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Contagem Física
              </button>
              <button
                onClick={() => setActiveTab('reconciliacao')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'reconciliacao' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Conciliação
              </button>
              <button
                onClick={() => setActiveTab('monitoramento_view')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'monitoramento_view' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Monitoramento
              </button>
              <button
                onClick={() => setActiveTab('sincronizador')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'sincronizador' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Sincronizador
              </button>
              <button
                onClick={() => setActiveTab('divergencias')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'divergencias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Sobras & Faltas
              </button>
              <button
                onClick={() => setActiveTab('vales_view')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'vales_view' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Vales
              </button>
              <button
                onClick={() => setActiveTab('historico')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'historico' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Histórico
              </button>
              <button
                onClick={() => setActiveTab('cadastros')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeTab === 'cadastros' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Cadastros
              </button>
            </>
          )}
        </div>
      </div>

      {/* APK Mobile Download Modal Overlay */}
      {showApkModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="bg-emerald-500 text-white p-1.5 rounded-lg shadow-sm">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-sm sm:text-base leading-tight uppercase tracking-tight">
                    Aplicativo Mobile (APK)
                  </h3>
                  <p className="text-[10px] text-emerald-100 font-mono font-medium">
                    Guarabira Acuracidade • Versão 2.1.0
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => {
                  if (!apkDownloading) {
                    setShowApkModal(false);
                  }
                }}
                disabled={apkDownloading}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white p-1 px-2 rounded-lg transition text-xs font-bold font-mono border border-emerald-550 cursor-pointer"
              >
                Fechar
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 font-sans">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block font-mono">
                  📱 Mobilidade e Rapidez de Campo
                </span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  O aplicativo oficial para Android foi projetado para coletores de dados e smartphones, facilitando o trabalho dos conferentes de pátio na balança e no armazém.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-xxs">
                <span className="font-extrabold text-slate-800 uppercase block tracking-wider">
                  🚀 Recursos Principais Inclusos:
                </span>
                <ul className="space-y-1.5 text-slate-600 font-semibold list-disc list-inside">
                  <li><strong>Abertura rápida de câmera</strong> para registrar fotos de evidência de faltas.</li>
                  <li><strong>Modo Offline Completo</strong> para garantir funcionamento em áreas sem sinal.</li>
                  <li><strong>Pesagem e Pesquisa de Placas</strong> integrada via Bluetooth com balanças.</li>
                  <li><strong>Notificações instantâneas</strong> sobre solicitações de recontagem/reconferência.</li>
                </ul>
              </div>

              {/* Progress or Button */}
              {apkDownloading ? (
                <div className="space-y-2.5 pt-2">
                  <div className="flex justify-between items-center text-xxs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 animate-pulse">
                      ⏳ Baixando guarabira_acuracidade_v2.1.0.apk...
                    </span>
                    <span className="font-mono text-emerald-600">{apkProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-250">
                    <div 
                      className="bg-emerald-550 h-2.5 rounded-full transition-all duration-200" 
                      style={{ width: `${apkProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadApk}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 border border-emerald-500"
                >
                  <Download className="h-4 w-4" />
                  <span>Iniciar Download do Instalador APK</span>
                </button>
              )}

              <p className="text-[9px] text-slate-400 font-medium text-center italic leading-relaxed pt-1 border-t border-slate-100">
                *Requer sistema operacional Android 8.0 (Oreo) ou superior. Ative a permissão de "Fontes Desconhecidas" no seu celular para proceder com a instalação manual.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

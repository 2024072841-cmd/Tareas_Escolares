import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import api from './services/api';

// --- IMPORTA TUS PÁGINAS ---
import TareasPage from './pages/TareasPage';
import MateriasPage from './pages/MateriasPage';
import HorariosPage from './pages/HorariosPage';
import PeriodosPage from './pages/PeriodosPage';

// --- COMPONENTE DE SALUDO DINÁMICO ---
const UserHeader = () => {
  const nombre = localStorage.getItem('user_name') || 'Usuario';
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-[#F2F2F7]">
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight">
          {saludo}, <span className="text-[#5856D6]">{nombre}</span> ✨
        </h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>
      <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-white">
        👤
      </div>
    </header>
  );
};

// --- DISEÑO DE LOGIN iOS ---
const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { correo, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_name', data.nombre || 'Mayra'); // Guardamos el nombre
      window.location.href = '/';
    } catch (error) {
      alert(error.response?.data?.error || 'Error al entrar ❌');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F2F2F7] font-sans">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex h-20 w-20 bg-white rounded-[2rem] shadow-sm items-center justify-center text-3xl mb-4">🍎</div>
          <h1 className="text-4xl font-black text-black tracking-tighter">MyStudy</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Inicia sesión para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-3">
          <input 
            type="email" placeholder="Correo electrónico" required
            value={correo} onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 shadow-sm" 
          />
          <input 
            type="password" placeholder="Contraseña" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700 shadow-sm" 
          />
          <button type="submit" className="w-full bg-[#007AFF] text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] uppercase tracking-widest text-xs pt-5">
            Entrar
          </button>
        </form>
        
        <p className="text-center text-xs font-bold text-gray-400">
          ¿Nuevo aquí? <Link to="/register" className="text-[#007AFF]">Crea una cuenta</Link>
        </p>
      </div>
    </div>
  );
};

// --- DISEÑO DE REGISTRO iOS ---
const RegisterPage = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/registro', formData);
      alert('✨ ¡Cuenta creada!');
      window.location.href = '/login';
    } catch (error) {
      alert(error.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F2F2F7] font-sans">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-black text-black tracking-tighter text-center">Crear Cuenta</h1>
        <form onSubmit={handleRegister} className="space-y-3">
          <input 
            type="text" placeholder="Nombre completo" required
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            className="w-full p-4 bg-white rounded-2xl border-none outline-none shadow-sm font-medium" 
          />
          <input 
            type="email" placeholder="Correo@ejemplo.com" required
            onChange={(e) => setFormData({...formData, correo: e.target.value})}
            className="w-full p-4 bg-white rounded-2xl border-none outline-none shadow-sm font-medium" 
          />
          <input 
            type="password" placeholder="Crea una contraseña" required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-4 bg-white rounded-2xl border-none outline-none shadow-sm font-medium" 
          />
          <button type="submit" className="w-full bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs pt-5">
            Registrarme 🚀
          </button>
        </form>
        <p className="text-center text-xs font-bold text-gray-400">
          ¿Ya tienes cuenta? <Link to="/login" className="text-[#007AFF]">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

// --- COMPONENTE APP PRINCIPAL ---
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="flex min-h-screen bg-[#F2F2F7]">
        
        {/* SIDEBAR iOS (Floating Glass Style) */}
        {token && (
          <aside className={`fixed inset-y-4 left-4 transition-all z-50 ${isOpen ? 'translate-x-0' : '-translate-x-[110%]'} md:translate-x-0`}>
            <div className="bg-white/80 backdrop-blur-xl w-64 h-full rounded-[2.5rem] shadow-2xl flex flex-col border border-white/40">
              <div className="p-8 pb-4 text-2xl font-black text-black tracking-tighter flex items-center gap-2">
                <span className="text-blue-500 text-3xl">●</span> MyStudy
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-1">
                <SidebarLink to="/" icon="📝" label="Tareas" close={() => setIsOpen(false)} />
                <SidebarLink to="/materias" icon="📚" label="Materias" close={() => setIsOpen(false)} />
                <SidebarLink to="/horarios" icon="⏰" label="Horarios" close={() => setIsOpen(false)} />
                <SidebarLink to="/periodos" icon="🗓️" label="Periodos" close={() => setIsOpen(false)} />
              </nav>

              <div className="p-6">
                <button 
                  onClick={() => { localStorage.clear(); window.location.href='/login'; }} 
                  className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className={`flex-1 transition-all ${token ? 'md:ml-72' : ''}`}>
          {token && (
            <div className="md:hidden p-4">
              <button onClick={() => setIsOpen(true)} className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">☰</button>
            </div>
          )}

          {token && <UserHeader />}

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/" element={token ? <TareasPage /> : <Navigate to="/login" />} />
            <Route path="/materias" element={token ? <MateriasPage /> : <Navigate to="/login" />} />
            <Route path="/horarios" element={token ? <HorariosPage /> : <Navigate to="/login" />} />
            <Route path="/periodos" element={token ? <PeriodosPage /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
          </Routes>
        </main>

        {/* Overlay para móvil */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </Router>
  );
}

// Sub-componente para links del sidebar
const SidebarLink = ({ to, icon, label, close }) => (
  <Link 
    to={to} 
    onClick={close}
    className="flex items-center gap-4 p-4 text-gray-500 hover:text-black hover:bg-[#F2F2F7] rounded-[1.5rem] transition-all font-bold text-sm"
  >
    <span className="text-lg">{icon}</span> {label}
  </Link>
);

export default App;
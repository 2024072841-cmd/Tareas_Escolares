import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Petición al backend
      const { data } = await api.post('/auth/login', formData);
      
      // 2. GUARDAR EL TOKEN (Esto quita el error 403)
      localStorage.setItem('token', data.token); 
      
      // 3. MANDAR AL INICIO (Donde están las tareas)
      // Cambiamos '/dashboard' por '/' porque ahí viven tus rutas
      navigate('/'); 
      
      // Opcional: Forzar recarga para que el Sidebar detecte el nuevo token
      window.location.reload();
      
    } catch (error) {
      alert(error.response?.data?.error || 'Credenciales incorrectas ❌');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <form 
        onSubmit={handleSubmit} 
        className="p-10 bg-white rounded-[3.5rem] shadow-2xl w-full max-w-sm border border-purple-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-purple-600 mb-2 italic">Hola ✨</h2>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Inicia Sesión</p>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Tu correo" 
            required
            className="w-full p-5 bg-purple-50 rounded-3xl outline-none focus:ring-2 focus:ring-purple-400 transition-all border-none"
            onChange={(e) => setFormData({...formData, correo: e.target.value})}
          />
          
          <input 
            type="password" 
            placeholder="Tu contraseña" 
            required
            className="w-full p-5 bg-purple-50 rounded-3xl outline-none focus:ring-2 focus:ring-purple-400 transition-all border-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-black text-white p-5 rounded-3xl font-black shadow-lg shadow-purple-200 transition-all transform active:scale-95"
          >
            ENTRAR AHORA 🚀
          </button>
        </div>

        <p className="text-center mt-8 text-xs text-gray-400 font-bold uppercase">
          ¿Olvidaste tu clave? Ni modo.
        </p>
      </form>
    </div>
  );
};

export default Login;
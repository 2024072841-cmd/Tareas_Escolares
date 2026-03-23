import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-bg font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-purple-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-primary">Crea tu cuenta</h1>
          <p className="text-gray-500 mt-2">Únete para organizar tus tareas escolares</p>
        </div>

        <form className="space-y-5">
          <input type="text" placeholder="Nombre completo" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none transition-all" />
          <input type="email" placeholder="correo@ejemplo.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none transition-all" />
          <input type="password" placeholder="Crea una contraseña" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none transition-all" />
          
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl shadow-lg transition-all active:scale-95">
            Registrarse
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary font-medium hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
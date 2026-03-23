import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PeriodosPage = () => {
  const [periodos, setPeriodos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');

  const cargarPeriodos = async () => {
    try {
      const res = await api.get('/periodos');
      setPeriodos(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { cargarPeriodos(); }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await api.post('/periodos', { nombre, fecha_inicio: inicio, fecha_fin: fin });
      setNombre(''); setInicio(''); setFin('');
      cargarPeriodos();
    } catch (error) { console.error(error); }
  };

  return (
    /* Cambiamos max-w-2xl por max-w-[95%] para que ocupe casi toda la pantalla */
    <div className="max-w-[98%] mx-auto p-4 md:p-10 space-y-10 bg-[#F2F2F7] min-h-screen font-sans tracking-tight">
      
      {/* HEADER GIGANTE Y LIMPIO */}
      <header className="px-4 flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black text-black tracking-tighter">Periodos Escolares</h2>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-[0.3em] mt-2">Gestión de Ciclos Académicos</p>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-4xl font-black text-blue-500">{periodos.length}</span>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registrados</p>
        </div>
      </header>

      {/* FORMULARIO EXPANDIDO */}
      <section className="bg-white rounded-[3rem] shadow-sm overflow-hidden">
        <form onSubmit={manejarEnvio} className="p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            
            <div className="space-y-2 lg:col-span-1">
              <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Identificador del Ciclo</label>
              <input 
                type="text"
                placeholder="Ej: Semestre Técnico 2026"
                className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all font-bold text-gray-800 border-none text-lg"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-1">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Fecha Inicio</label>
                <input 
                  type="date"
                  className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] border-none outline-none font-bold text-gray-500"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Fecha Fin</label>
                <input 
                  type="date"
                  className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] border-none outline-none font-bold text-gray-500"
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <button 
                type="submit" 
                className="w-full bg-[#007AFF] text-white font-black py-6 rounded-[2rem] hover:opacity-90 active:scale-[0.97] transition-all shadow-2xl shadow-blue-200 uppercase tracking-widest text-sm"
              >
                Registrar Nuevo Periodo 🗓️
              </button>
            </div>

          </div>
        </form>
      </section>

      {/* LISTADO EN GRID ANCHO */}
      <section className="space-y-6 px-4">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Historial de Ciclos</h3>
        
        {periodos.length === 0 ? (
          <div className="p-20 bg-white/40 rounded-[4rem] text-center text-gray-400 font-bold text-xl italic border-none shadow-inner">
            No se han encontrado registros en la base de datos
          </div>
        ) : (
          /* Grid de 2 columnas para que ocupen más espacio lateral */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {periodos.map(p => (
              <div key={p.id_periodo} className="p-8 bg-white rounded-[2.5rem] flex justify-between items-center shadow-sm transition-all hover:shadow-md active:scale-[0.99] group">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-[#F2F2F7] rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">
                    📂
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-2xl tracking-tighter">{p.nombre}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-widest">Desde {p.fecha_inicio.split('T')[0]}</span>
                      <span className="text-gray-300 text-[10px]">•</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hasta {p.fecha_fin.split('T')[0]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="h-4 w-4 bg-green-400 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.6)] animate-pulse"></div>
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Vigente</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PeriodosPage;
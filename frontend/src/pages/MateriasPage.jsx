import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [profesor, setProfesor] = useState('');
  const [idPeriodo, setIdPeriodo] = useState('');
  const [editando, setEditando] = useState(null);

  // Colores iOS Premium (Sin bordes, solo fondos suaves)
  const colores = [
    'bg-[#E5E7FF] text-[#4338CA]', // Indigo soft
    'bg-[#FFEDFA] text-[#BE185D]', // Pink soft
    'bg-[#E0F2FE] text-[#0369A1]', // Blue soft
    'bg-[#F5F3FF] text-[#6D28D9]', // Violet soft
    'bg-[#ECFDF5] text-[#047857]', // Emerald soft
    'bg-[#FFF7ED] text-[#C2410C]', // Orange soft
  ];

  const cargarDatos = async () => {
    try {
      const [resM, resP] = await Promise.all([api.get('/materias'), api.get('/periodos')]);
      setMaterias(resM.data);
      setPeriodos(resP.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, profesor, id_periodo: parseInt(idPeriodo) };
    try {
      if (editando) {
        await api.put(`/materias/${editando}`, data);
        setEditando(null);
      } else {
        await api.post('/materias', data);
      }
      setNombre(''); setProfesor(''); setIdPeriodo('');
      cargarDatos();
    } catch (err) { alert("Error al guardar"); }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Borrar materia? 🗑️")) {
      try {
        await api.delete(`/materias/${id}`);
        cargarDatos();
      } catch (err) { alert("Tiene tareas asociadas"); }
    }
  };

  return (
    /* Contenedor Ultra-Wide */
    <div className="max-w-[98%] mx-auto p-4 md:p-10 space-y-10 bg-[#F2F2F7] min-h-screen font-sans tracking-tight">
      
      {/* HEADER GIGANTE */}
      <header className="px-4 flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black text-black tracking-tighter">Mis Materias</h2>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-[0.3em] mt-2">Gestión Académica</p>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-4xl font-black text-indigo-500">{materias.length}</span>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Totales</p>
        </div>
      </header>

      {/* FORMULARIO EXPANDIDO (Estilo Ajustes iOS) */}
      <section className="bg-white rounded-[3rem] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Nombre Materia</label>
            <input 
              placeholder="Ej: Física Cuántica" 
              className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] border-none outline-none font-bold text-gray-800 focus:ring-4 focus:ring-indigo-50 transition-all"
              value={nombre} onChange={e => setNombre(e.target.value)} required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Profesor / Mentor</label>
            <input 
              placeholder="Nombre del docente" 
              className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] border-none outline-none font-bold text-gray-800 focus:ring-4 focus:ring-indigo-50 transition-all"
              value={profesor} onChange={e => setProfesor(e.target.value)} required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-300 ml-6 uppercase tracking-widest">Periodo Escolar</label>
            <select 
              className="w-full p-5 bg-[#F9F9FB] rounded-[2rem] border-none outline-none font-bold text-gray-500 appearance-none focus:ring-4 focus:ring-indigo-50 transition-all"
              value={idPeriodo} onChange={e => setIdPeriodo(e.target.value)} required
            >
              <option value="">Seleccionar ciclo...</option>
              {periodos.map(p => <option key={p.id_periodo} value={p.id_periodo}>{p.nombre}</option>)}
            </select>
          </div>

          <button className={`py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-[0.97] shadow-xl ${editando ? 'bg-black text-white' : 'bg-[#5856D6] text-white shadow-indigo-100'}`}>
            {editando ? 'Actualizar' : 'Añadir Materia +'}
          </button>
        </form>
      </section>

      {/* GRID DE MATERIAS (Widgets Wide) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-2">
        {materias.map((m, index) => (
          <div 
            key={m.id_materia} 
            className={`${colores[index % colores.length]} p-8 rounded-[3rem] shadow-sm flex flex-col justify-between transition-all hover:shadow-md active:scale-[0.99] min-h-[220px] relative overflow-hidden group`}
          >
            {/* Círculo decorativo estilo cristal de fondo */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                   {periodos.find(p => p.id_periodo === m.id_periodo)?.nombre || 'Ciclo'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditando(m.id_materia); setNombre(m.nombre); setProfesor(m.profesor); setIdPeriodo(m.id_periodo); }} className="p-2.5 bg-white/30 hover:bg-white rounded-full transition-all">✏️</button>
                  <button onClick={() => eliminar(m.id_materia)} className="p-2.5 bg-white/30 hover:bg-white rounded-full transition-all">🗑️</button>
                </div>
              </div>
              
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">{m.nombre}</h3>
              <p className="text-sm font-bold opacity-70 tracking-tight italic">Docente: {m.profesor}</p>
            </div>
            
            <div className="mt-8 flex justify-between items-center relative z-10">
                <div className="bg-white/40 backdrop-blur-md px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest">Académico</div>
                <div className="h-2 w-2 bg-current rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {materias.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[4rem] shadow-inner">
          <p className="text-gray-300 text-xl font-black italic tracking-widest uppercase">No hay materias registradas</p>
        </div>
      )}
    </div>
  );
};

export default MateriasPage;
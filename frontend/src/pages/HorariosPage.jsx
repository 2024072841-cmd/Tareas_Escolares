import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HorariosPage = () => {
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [diaSemana, setDiaSemana] = useState(''); // Cambiado para coincidir con dia_semana
  const [horaIn, setHoraIn] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [idMateria, setIdMateria] = useState('');

  const cargar = async () => {
    try {
      const [resH, resM] = await Promise.all([api.get('/horarios'), api.get('/materias')]);
      setHorarios(resH.data);
      setMaterias(resM.data);
    } catch (err) { console.error("Error al cargar", err); }
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    
    // IMPORTANTE: Estos nombres deben ser EXACTOS a lo que tu API espera
    const datos = { 
      dia_semana: diaSemana, // Antes era 'dia', ahora coincide con tu BD
      hora_inicio: horaIn, 
      hora_fin: horaFin, 
      id_materia: parseInt(idMateria) 
    };

    try {
      await api.post('/horarios', datos);
      setDiaSemana(''); setHoraIn(''); setHoraFin(''); setIdMateria('');
      cargar();
      alert("✅ Horario guardado correctamente");
    } catch (err) { 
      console.error("Error 400 detalle:", err.response?.data);
      alert("Error: " + (err.response?.data?.error || "Verifica los campos"));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-black text-indigo-600">Mis Horarios ⏰</h2>
      
      {/* Formulario Estilo Morado */}
      <form onSubmit={guardar} className="bg-white p-6 rounded-[2rem] shadow-xl border border-indigo-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[120px]">
          <label className="text-[10px] font-bold text-indigo-400 ml-2 uppercase">Día</label>
          <select 
            className="w-full p-3 bg-indigo-50 rounded-xl border-none font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500" 
            value={diaSemana} 
            onChange={e => setDiaSemana(e.target.value)} 
            required
          >
            <option value="">Día...</option>
            {/* Usamos las abreviaciones que ya tienes en tu base de datos */}
            <option value="Lun">Lunes</option>
            <option value="Mar">Martes</option>
            <option value="Mie">Miércoles</option>
            <option value="Jue">Jueves</option>
            <option value="Vie">Viernes</option>
            <option value="Sab">Sábado</option>
          </select>
        </div>

        <div className="w-32">
          <label className="text-[10px] font-bold text-indigo-400 ml-2 uppercase">Inicio</label>
          <input type="time" className="w-full p-3 bg-indigo-50 rounded-xl border-none font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500" value={horaIn} onChange={e => setHoraIn(e.target.value)} required />
        </div>

        <div className="w-32">
          <label className="text-[10px] font-bold text-indigo-400 ml-2 uppercase">Fin</label>
          <input type="time" className="w-full p-3 bg-indigo-50 rounded-xl border-none font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500" value={horaFin} onChange={e => setHoraFin(e.target.value)} required />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] font-bold text-indigo-400 ml-2 uppercase">Materia</label>
          <select className="w-full p-3 bg-indigo-50 rounded-xl border-none font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500" value={idMateria} onChange={e => setIdMateria(e.target.value)} required>
            <option value="">Materia...</option>
            {materias.map(m => <option key={m.id_materia} value={m.id_materia}>{m.nombre}</option>)}
          </select>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-black shadow-lg transition-all active:scale-95">
          Añadir
        </button>
      </form>

      {/* Grid de Horarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {horarios.map(h => (
          <div key={h.id_horario} className="bg-white p-5 rounded-2xl border-l-8 border-indigo-500 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase">{h.dia_semana}</p>
              <h3 className="text-lg font-bold text-gray-800">{h.materia || 'Cargando...'}</h3>
              <p className="text-sm text-gray-500 font-medium">{h.hora_inicio} - {h.hora_fin}</p>
            </div>
            <div className="text-2xl opacity-20">💜</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorariosPage;
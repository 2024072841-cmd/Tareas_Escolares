import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; 

const TareasPage = () => {
  const [tareas, setTareas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ titulo: '', id_materia: '', fecha_entrega: '', hora_entrega: '23:59' });
  const [tareasSeleccionadas, setTareasSeleccionadas] = useState(null);
  const [filtroDetalle, setFiltroDetalle] = useState(null); 

  const cargar = async () => {
    try {
      const [resT, resM] = await Promise.all([api.get('/tareas'), api.get('/materias')]);
      setTareas(resT.data);
      setMaterias(resM.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { cargar(); }, []);

  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

  const getStatus = (t) => {
    const hoy = new Date().setHours(0,0,0,0);
    const entrega = new Date(t.fecha_entrega).setHours(0,0,0,0);
    if (t.completada) return { label: 'Finalizada', color: '#34C759', key: 'completadas' };
    if (entrega < hoy) return { label: 'Sin Entregar', color: '#FF3B30', key: 'vencidas' };
    return { label: 'Asignada', color: '#007AFF', key: 'pendientes' };
  };

  const stats = {
    asignadas: total,
    pendientes: tareas.filter(t => getStatus(t).key === 'pendientes').length,
    completadas: completadas,
    vencidas: tareas.filter(t => getStatus(t).key === 'vencidas').length
  };

  const abrirDetalle = (tipo) => {
    let filtradas = [];
    if (tipo === 'Asig.') filtradas = tareas;
    else if (tipo === 'Pend.') filtradas = tareas.filter(t => getStatus(t).key === 'pendientes');
    else if (tipo === 'Comp.') filtradas = tareas.filter(t => t.completada);
    else if (tipo === 'Venc.') filtradas = tareas.filter(t => getStatus(t).key === 'vencidas');
    setFiltroDetalle({ titulo: tipo, items: filtradas });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4 bg-[#F2F2F7] min-h-screen pb-10 font-sans tracking-tight relative">
      
      {/* 1. CREAR TAREA */}
      <section className="bg-white rounded-[1.8rem] p-5 shadow-sm border border-gray-100">
        <form onSubmit={async (e)=>{
          e.preventDefault();
          await api.post('/tareas', {...form, id_materia: parseInt(form.id_materia)});
          setForm({titulo:'', id_materia:'', fecha_entrega:'', hora_entrega: '23:59'});
          cargar();
        }} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Título</label>
            <input placeholder="Nueva tarea..." className="w-full p-2.5 bg-gray-50 rounded-xl border-none font-medium text-gray-700" value={form.titulo} onChange={e=>setForm({...form, titulo: e.target.value})} required/>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Materia</label>
            <select className="w-full p-2.5 bg-gray-50 rounded-xl border-none font-medium text-gray-500" value={form.id_materia} onChange={e=>setForm({...form, id_materia: e.target.value})} required>
              <option value="">Elegir...</option>
              {materias.map(m => <option key={m.id_materia} value={m.id_materia}>{m.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase">Fecha y Hora</label>
            <div className="flex gap-1">
                <input type="date" className="w-full p-2.5 bg-gray-50 rounded-xl border-none text-[10px] font-bold uppercase" value={form.fecha_entrega} onChange={e=>setForm({...form, fecha_entrega: e.target.value})} required/>
                <input type="time" className="p-2.5 bg-gray-50 rounded-xl border-none text-[10px] font-bold" value={form.hora_entrega} onChange={e=>setForm({...form, hora_entrega: e.target.value})} required/>
            </div>
          </div>
          <button className="bg-[#007AFF] text-white p-3 rounded-xl font-bold active:scale-95 shadow-sm text-sm">Guardar</button>
        </form>
      </section>

      {/* 2. LÍNEA DE ESTATUS Y PROGRESO */}
      <section className="flex flex-col lg:flex-row gap-3 items-center">
        <div className="grid grid-cols-4 gap-2 w-full lg:w-auto">
          <StatWidgetMini label="Asig." value={stats.asignadas} color="text-blue-500" bg="bg-blue-50" onClick={() => abrirDetalle('Asig.')} />
          <StatWidgetMini label="Pend." value={stats.pendientes} color="text-orange-500" bg="bg-orange-50" onClick={() => abrirDetalle('Pend.')} />
          <StatWidgetMini label="Comp." value={stats.completadas} color="text-green-500" bg="bg-green-50" onClick={() => abrirDetalle('Comp.')} />
          <StatWidgetMini label="Venc." value={stats.vencidas} color="text-red-500" bg="bg-red-50" onClick={() => abrirDetalle('Venc.')} />
        </div>

        <div className="bg-white flex-1 p-3 px-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 w-full">
          <span className="text-[9px] font-black text-gray-400 uppercase whitespace-nowrap">Progreso Diario</span>
          <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${progreso}%` }}></div>
          </div>
          <span className="text-xs font-black text-blue-600">{progreso}%</span>
        </div>
      </section>

      {/* 3. CALENDARIO */}
      <section className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col items-center relative min-h-[450px]">
        <Calendar 
          className="ios-calendar-full"
          onClickDay={(val) => {
            const filtradas = tareas.filter(t => new Date(t.fecha_entrega).toDateString() === val.toDateString());
            if (filtradas.length > 0) setTareasSeleccionadas({ fecha: val.toLocaleDateString(), items: filtradas });
            else setTareasSeleccionadas(null);
          }}
          tileContent={({ date }) => {
            const t = tareas.find(t => new Date(t.fecha_entrega).toDateString() === date.toDateString());
            if (t) return <div className="dot-status" style={{ backgroundColor: getStatus(t).color }}></div>;
            return null;
          }}
        />

        {/* DETALLE CALENDARIO (SLIDE UP) */}
        {tareasSeleccionadas && (
          <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-[2rem] p-5 shadow-2xl z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-black text-gray-800 text-[10px] uppercase tracking-widest">Agenda: {tareasSeleccionadas.fecha}</h4>
              <button onClick={()=>setTareasSeleccionadas(null)} className="h-6 w-6 bg-gray-100 rounded-full text-[10px] font-bold">✕</button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {tareasSeleccionadas.items.map(t => (
                <TareaItem key={t.id_tarea} t={t} status={getStatus(t)} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. MODAL DE CATEGORÍAS (AJUSTADO PARA NO SALIRSE) */}
      {filtroDetalle && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-6 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
                
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900">Tareas {filtroDetalle.titulo}</h3>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{filtroDetalle.items.length} tareas encontradas</p>
                    </div>
                    <button onClick={()=>setFiltroDetalle(null)} className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition-colors">✕</button>
                </div>

                <div className="space-y-3 overflow-y-auto pr-2 pb-2 custom-scrollbar">
                    {filtroDetalle.items.length > 0 ? (
                        filtroDetalle.items.map(t => (
                            <TareaItem key={t.id_tarea} t={t} status={getStatus(t)} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <span className="text-4xl mb-2">📄</span>
                            <p className="font-medium italic text-sm">No hay tareas en esta categoría</p>
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={()=>setFiltroDetalle(null)}
                    className="mt-4 w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform"
                >
                    Cerrar
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

const TareaItem = ({ t, status }) => (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
        <div className="flex flex-col">
            <span className="font-black text-gray-800 text-sm">{t.titulo}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">🕒 {t.fecha_entrega} • {t.hora_entrega || '23:59'}</span>
        </div>
        <span className="text-[9px] font-black px-3 py-1.5 rounded-full text-white shadow-sm" style={{backgroundColor: status.color}}>
            {status.label}
        </span>
    </div>
);

const StatWidgetMini = ({ label, value, color, bg, onClick }) => (
  <button 
    onClick={onClick}
    className={`${bg} p-2 px-4 rounded-xl flex flex-col items-center justify-center min-w-[70px] active:scale-95 transition-transform cursor-pointer border-none outline-none shadow-sm`}
  >
    <span className={`text-sm font-black ${color}`}>{value}</span>
    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{label}</span>
  </button>
);

export default TareasPage;
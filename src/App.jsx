import { useEffect, useState } from 'react';
import { initials } from './data';
import Sidebar from './components/Sidebar';
import DetailModal from './components/DetailModal';
import Opportunities from './pages/Opportunities';
import Students from './pages/Students';
import Matches from './pages/Matches';

const pageNames = { opportunities: 'Oportunidades', students: 'Estudiantes', matches: 'Matching', saved: 'Guardados' };

export default function App() {
  const [page, setPage] = useState('opportunities');
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/state')
      .then(response => {
        if (!response.ok) throw new Error('state');
        return response.json();
      })
      .then(data => {
        if (!active) return;
        setStudents(data.students);
        setJobs(data.jobs);
        setSavedIds(data.savedIds);
        setStudentId(current => current || data.students[0]?.id || '');
      })
      .catch(() => {
        if (active) setError('No se pudo abrir sqlite.db. Arranca la app con npm run dev.');
      });
    return () => { active = false; };
  }, []);

  const student = students.find(item => item.id === studentId) || students[0];
  const toggleSave = async id => {
    const previous = savedIds;
    setSavedIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
    try {
      const response = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id }),
      });
      if (!response.ok) throw new Error('saved');
      const data = await response.json();
      setSavedIds(data.savedIds);
    } catch {
      setSavedIds(previous);
      setError('No se pudo guardar en sqlite.db.');
    }
  };
  const openJob = job => setDetail({ type: 'job', item: job });
  const selectStudent = id => { setStudentId(id); setPage('matches'); };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Ir al contenido</a>
      <Sidebar page={page} onNavigate={setPage} savedCount={savedIds.length} />
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">Explorar <span>/</span> <strong>{pageNames[page]}</strong></div>
          <div className="profile-switch">
            <span>Explorando como</span>
            <select aria-label="Seleccionar perfil de estudiante" value={studentId} onChange={event => setStudentId(event.target.value)} disabled={!students.length}>
              {students.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
            </select>
            {student && <button className="profile-trigger" aria-label={`Ver perfil de ${student.nombre}`} onClick={() => setDetail({ type: 'student', item: student })}>{initials(student.nombre)}</button>}
          </div>
        </header>
        <main id="main-content">
          {error && <div className="empty-state"><h2>Sin conexión con la base</h2><p>{error}</p></div>}
          {!error && !student && <div className="empty-state"><h2>Abriendo sqlite.db</h2><p>Cargando estudiantes y oportunidades.</p></div>}
          {student && (page === 'opportunities' || page === 'saved') && <Opportunities key={page} student={student} jobs={jobs} savedIds={savedIds} onSave={toggleSave} onOpen={openJob} savedOnly={page === 'saved'} />}
          {student && page === 'students' && <Students students={students} onOpen={item => setDetail({ type: 'student', item })} selectedId={studentId} onSelect={selectStudent} />}
          {student && page === 'matches' && <Matches student={student} jobs={jobs} onOpen={openJob} onProfile={() => setDetail({ type: 'student', item: student })} />}
          <footer className="page-footer"><span>MatchJob <span className="muted">Conectamos talento con posibilidades.</span></span><span>sqlite.db</span></footer>
        </main>
      </div>
      {detail && student && <DetailModal key={`${detail.type}-${detail.item.id}`} detail={detail} student={student} saved={savedIds.includes(detail.item.id)} onSave={toggleSave} onClose={() => setDetail(null)} onSelectStudent={selectStudent} />}
    </div>
  );
}

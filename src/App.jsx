import { useState } from 'react';
import { students, initials } from './data';
import Sidebar from './components/Sidebar';
import DetailModal from './components/DetailModal';
import Opportunities from './pages/Opportunities';
import Students from './pages/Students';
import Matches from './pages/Matches';
const pageNames = { opportunities: 'Oportunidades', students: 'Estudiantes', matches: 'Matching', saved: 'Guardados' };
export default function App() {
  const [page, setPage] = useState('opportunities');
  const [studentId, setStudentId] = useState(students[0].id);
  const [savedIds, setSavedIds] = useState([]);
  const [detail, setDetail] = useState(null);
  const student = students.find(item => item.id === studentId) || students[0];
  const toggleSave = id => setSavedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  const openJob = job => setDetail({ type: 'job', item: job });
  const selectStudent = id => { setStudentId(id); setPage('matches'); };
  return <div className="app-shell"><a className="skip-link" href="#main-content">Ir al contenido</a><Sidebar page={page} onNavigate={setPage} savedCount={savedIds.length}/><div className="main-shell"><header className="topbar"><div className="breadcrumb">Explorar <span>/</span> <strong>{pageNames[page]}</strong></div><div className="profile-switch"><span>Explorando como</span><select aria-label="Seleccionar perfil de estudiante" value={studentId} onChange={event => setStudentId(event.target.value)}>{students.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select><button className="profile-trigger" aria-label={`Ver perfil de ${student.nombre}`} onClick={() => setDetail({ type: 'student', item: student })}>{initials(student.nombre)}</button></div></header><main id="main-content">{(page === 'opportunities' || page === 'saved') && <Opportunities key={page} student={student} savedIds={savedIds} onSave={toggleSave} onOpen={openJob} savedOnly={page === 'saved'}/ >}{page === 'students' && <Students onOpen={item => setDetail({ type: 'student', item })} selectedId={studentId} onSelect={selectStudent}/ >}{page === 'matches' && <Matches student={student} onOpen={openJob} onProfile={() => setDetail({ type: 'student', item: student })}/ >}<footer className="page-footer"><span>jev. <span className="muted">Conectamos talento con posibilidades.</span></span><span>Datos de ejemplo · Sesión temporal</span></footer></main></div>{detail && <DetailModal key={`${detail.type}-${detail.item.id}`} detail={detail} student={student} saved={savedIds.includes(detail.item.id)} onSave={toggleSave} onClose={() => setDetail(null)} onSelectStudent={selectStudent}/>}</div>;
}

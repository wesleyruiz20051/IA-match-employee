import { useState } from 'react';
import { jobs, areaLabels, modalityLabels, getMatch } from '../data';
import JobCard from '../components/JobCard';
import OpportunityHero from '../components/OpportunityHero';
import Icon from '../components/Icon';
import { PageHeading, Search, EmptyState } from '../components/UI';

export default function Opportunities({ student, savedIds, onSave, onOpen, savedOnly = false }) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const [modality, setModality] = useState('');
  const [sort, setSort] = useState('match');
  const filtered = jobs.filter(job =>
    (!savedOnly || savedIds.includes(job.id)) && (!area || job.area === area) &&
    (!modality || job.modalidad === modality) &&
    `${job.titulo} ${job.empresa} ${job.ciudad} ${job.skills_requeridos.join(' ')}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ).sort((a, b) => sort === 'salary' ? b.salario_mensual_usd - a.salario_mensual_usd : sort === 'name' ? a.titulo.localeCompare(b.titulo) : getMatch(student, b).score - getMatch(student, a).score);
  const reset = () => { setQuery(''); setArea(''); setModality(''); };
  const hasFilters = Boolean(query || area || modality);

  return (
    <>
      <PageHeading eyebrow={savedOnly ? 'TU SELECCIÓN' : 'DESCUBRE LO QUE SIGUE'} title={savedOnly ? 'Tus oportunidades guardadas' : `Tu próximo paso, ${student.nombre.split(' ')[0]}.`} description={savedOnly ? 'Un espacio para las oportunidades que no quieres perder de vista.' : 'El mejor lugar para empezar es con lo que ya sabes hacer.'}>
        <span className="page-badge"><span className="status-dot" />{savedOnly ? `${savedIds.length} guardadas` : `${jobs.length} oportunidades`}</span>
      </PageHeading>
      {!savedOnly && <OpportunityHero student={student} jobs={jobs} onOpen={onOpen} />}
      <section className="opportunity-section" aria-labelledby="opportunity-results">
        <div className="discovery-heading"><div><h2 id="opportunity-results" tabIndex={-1}>{savedOnly ? 'Tu selección' : 'Encuentra tu próxima oportunidad'}</h2><p>Explora por tus habilidades, intereses y disponibilidad.</p></div><span className="section-icon" aria-hidden="true"><Icon name={savedOnly ? 'bookmark' : 'briefcase'} /></span></div>
        <div className="filter-bar">
          <Search value={query} onChange={setQuery} placeholder="Buscar puesto, empresa o habilidad" />
          <select aria-label="Filtrar por área" value={area} onChange={event => setArea(event.target.value)}><option value="">Todas las áreas</option>{Object.entries(areaLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select>
          <select aria-label="Filtrar por modalidad" value={modality} onChange={event => setModality(event.target.value)}><option value="">Toda modalidad</option>{Object.entries(modalityLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select>
        </div>
        <div className="category-list" aria-label="Explorar áreas">
          {[['', 'Todas'], ['frontend', 'Frontend'], ['backend', 'Backend'], ['datos', 'Datos'], ['ux', 'Diseño UX'], ['marketing', 'Marketing'], ['ml', 'Inteligencia artificial']].map(([id, label]) => <button key={id} className={`category-chip ${area === id ? 'selected' : ''}`} aria-pressed={area === id} onClick={() => setArea(id)}>{label}</button>)}
        </div>
        <div className="results-heading"><p aria-live="polite"><strong>{filtered.length} oportunidades</strong><span className="muted"> para explorar{hasFilters && ' con estos filtros'}</span></p><div className="result-actions">{hasFilters && <button className="text-button clear-filters" onClick={reset}>Limpiar filtros <Icon name="close" size={13} /></button>}<select aria-label="Ordenar oportunidades" value={sort} onChange={event => setSort(event.target.value)}><option value="match">Mayor afinidad</option><option value="salary">Mayor remuneración</option><option value="name">Nombre del puesto</option></select></div></div>
        {filtered.length ? <div className="job-grid">{filtered.map(job => <JobCard key={job.id} job={job} student={student} saved={savedIds.includes(job.id)} onSave={onSave} onOpen={onOpen} />)}</div> : <EmptyState title={savedOnly && !savedIds.length ? 'Un lugar para tus próximos pasos' : 'No encontramos oportunidades'} text={savedOnly && !savedIds.length ? 'Toca el marcador de una oportunidad para tenerla siempre a mano durante esta sesión.' : 'Prueba otra búsqueda o cambia los filtros.'} action={hasFilters && <button className="button secondary" onClick={reset}>Limpiar filtros</button>} />}
      </section>
    </>
  );
}

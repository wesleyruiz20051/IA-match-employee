import Icon from './Icon';
import { Avatar, Score, Tags } from './UI';
import { areaLabels, modalityLabels, getMatch } from '../data';

export default function JobCard({ job, student, saved, onSave, onOpen }) {
  const match = getMatch(student, job);

  return (
    <article className="job-card">
      <div className="card-top">
        <div className="company-identity"><Avatar name={job.empresa} area={job.area} /><div><span className="company-name">{job.empresa}</span><span className="company-caption">Prácticas y primeros empleos</span></div></div>
        <button className={`icon-button save-button ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Quitar de' : 'Añadir a'} guardados: ${job.titulo}`} aria-pressed={saved} onClick={() => onSave(job.id)}><Icon name="bookmark" size={19} /></button>
      </div>
      <h3><button className="title-button" onClick={() => onOpen(job)}>{job.titulo}</button></h3>
      <div className="job-meta"><span><Icon name="pin" size={14} />{job.ciudad}</span><span><Icon name="clock" size={14} />{job.horas_semana} h/semana</span></div>
      <div className="job-type"><span>{areaLabels[job.area]}</span><span className="modality-tag">{modalityLabels[job.modalidad]}</span></div>
      <p className="job-description">{job.descripcion}</p>
      <Tags items={job.skills_requeridos} matched={match.common} />
      <div className="card-match"><div><span>Conexión con tu perfil</span><Score value={match.score} /></div><div className="affinity-track" aria-hidden="true"><span style={{ width: `${match.score}%` }} /></div></div>
      <div className="job-card-footer"><div className="salary"><strong>${job.salario_mensual_usd}</strong><span> USD / mes</span></div><button className="card-link" onClick={() => onOpen(job)}>Ver oportunidad <Icon name="arrow" size={16} /></button></div>
    </article>
  );
}

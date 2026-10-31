import Icon from './Icon';
import { Tags } from './UI';
import { getMatch, modalityLabels } from '../data';

export default function OpportunityHero({ student, jobs, onOpen }) {
  const recommended = [...jobs].sort((a, b) => getMatch(student, b).score - getMatch(student, a).score)[0];
  if (!recommended) return null;
  const match = getMatch(student, recommended);
  const firstName = student.nombre.split(' ')[0];

  return (
    <section className="welcome-banner" aria-label="Tu próxima oportunidad">
      <div className="hero-copy">
        <span className="banner-kicker"><Icon name="spark" size={15} /> Mejor conexión</span>
        <h2>{recommended.titulo}</h2>
        <p>{recommended.empresa} · {recommended.ciudad} · {modalityLabels[recommended.modalidad]} · ${recommended.salario_mensual_usd} USD/mes</p>
        <button className="hero-link" onClick={() => onOpen(recommended)}>Ver esta oportunidad <Icon name="arrow" size={17} /></button>
      </div>
      <div className="hero-panel">
        <div className="hero-score-block">
          <strong>{match.score}%</strong>
          <span>afinidad con {firstName}</span>
        </div>
        <Tags items={recommended.skills_requeridos.slice(0, 4)} matched={match.common} />
        <p className="hero-note">{match.common.length ? `${match.common.length} habilidades en común` : 'Sin habilidades requeridas en común'} · {recommended.horas_semana} h/semana</p>
      </div>
    </section>
  );
}

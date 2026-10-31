import Icon from './Icon';
import { Avatar, Score, Tags } from './UI';
import { getMatch } from '../data';

export default function OpportunityHero({ student, jobs, onOpen }) {
  const recommended = [...jobs].sort((a, b) => getMatch(student, b).score - getMatch(student, a).score)[0];
  const match = recommended && getMatch(student, recommended);

  return (
    <section className="welcome-banner" aria-label="Tu próxima oportunidad">
      <div className="hero-copy">
        <span className="banner-kicker"><Icon name="spark" size={14} /> TU TALENTO ES EL PUNTO DE PARTIDA</span>
        <h2>Tu experiencia.<br /><span>Un mundo de posibilidades.</span></h2>
        <p>Encuentra prácticas y primeros empleos que conectan con lo que sabes y lo que quieres aprender.</p>
        <a className="hero-link" href="#opportunity-results">Explorar oportunidades <Icon name="arrow" size={17} /></a>
      </div>
      {recommended && (
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true" />
          <span className="floating-symbol" aria-hidden="true"><Icon name="spark" size={26} /></span>
          <div className="hero-opportunity">
            <div className="hero-preview-label"><span className="status-dot" /> UNA CONEXIÓN PARA EXPLORAR</div>
            <div className="hero-job-heading">
              <Avatar name={recommended.empresa} area={recommended.area} />
              <div><p>{recommended.empresa}</p><h3>{recommended.titulo}</h3></div>
            </div>
            <Tags items={recommended.skills_requeridos.slice(0, 3)} matched={match.common} />
            <div className="hero-preview-footer">
              <Score value={match.score} />
              <button className="text-button" onClick={() => onOpen(recommended)}>Ver detalle <Icon name="arrow" size={15} /></button>
            </div>
          </div>
          <div className="hero-profile"><span className="hero-profile-check"><Icon name="check" size={15} /></span><span>Conecta con tu perfil<strong>{student.nombre}</strong></span></div>
        </div>
      )}
    </section>
  );
}

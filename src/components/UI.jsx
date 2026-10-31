import Icon from './Icon';
import { initials } from '../data';
export function Avatar({ name, area, large = false }) { return <span className={`avatar area-${area} ${large ? 'large' : ''}`}>{initials(name)}</span>; }
export function Tags({ items, matched = [] }) { return <div className="tags">{items.map(item => <span key={item} className={`tag ${matched.includes(item) ? 'matched' : ''}`}>{matched.includes(item) && <Icon name="check" size={12}/>} {item}</span>)}</div>; }
export function Score({ value }) { const tone = value >= 70 ? 'high' : value < 45 ? 'low' : 'mid'; return <span className={`score ${tone}`}><Icon name="spark" size={14}/>{value}% afinidad</span>; }
export function EmptyState({ title, text, action }) { return <div className="empty-state"><span className="empty-icon"><Icon name="search" size={28}/></span><h2>{title}</h2><p>{text}</p>{action}</div>; }
export function PageHeading({ eyebrow, title, description, children }) { return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div>{children}</div>; }
export function Search({ value, onChange, placeholder }) { return <div className="search-field"><Icon name="search"/><input aria-label={placeholder} placeholder={placeholder} value={value} onChange={event => onChange(event.target.value)}/>{value && <button className="icon-button" aria-label="Borrar búsqueda" onClick={() => onChange('')}><Icon name="close" size={16}/></button>}</div>; }

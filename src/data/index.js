import students from './applicants.json';
import jobs from './jobs.json';
export { students, jobs };
export const areaLabels = { frontend: 'Frontend', backend: 'Backend', datos: 'Datos', ml: 'Inteligencia artificial', devops: 'DevOps', ux: 'Diseño UX', marketing: 'Marketing', industrial: 'Industrial', qa: 'Calidad', soporte: 'Soporte' };
export const modalityLabels = { remoto: 'Remoto', hibrido: 'Híbrido', presencial: 'Presencial' };
export const initials = (name) => name.split(' ').slice(0, 2).map(word => word[0]).join('');
// Únicamente una simulación visual basada en campos del archivo, no una decisión de contratación.
// La experiencia se muestra como evidencia textual; no se analiza con IA ni se envía a servicios.
export function getMatch(student, job) {
  const common = job.skills_requeridos.filter(skill => student.skills.includes(skill));
  const missing = job.skills_requeridos.filter(skill => !student.skills.includes(skill));
  const dimensions = [
    { label: 'Habilidades requeridas', value: job.skills_requeridos.length ? common.length / job.skills_requeridos.length : 1, weight: 55 },
    { label: 'Área de experiencia', value: student.area === job.area ? 1 : 0, weight: 25 },
    { label: 'Modalidad', value: student.modalidad_preferida.includes(job.modalidad) ? 1 : 0, weight: 10 },
    { label: 'Disponibilidad', value: Math.min(1, student.disponibilidad_horas / job.horas_semana), weight: 10 },
  ];
  const notices = [];
  if (student.anio < job.anio_minimo) notices.push(`Requiere ${job.anio_minimo}º año; estudiante en ${student.anio}º.`);
  if (!job.carreras.includes(student.carrera)) notices.push('La carrera no figura entre las solicitadas.');
  if (student.disponibilidad_horas < job.horas_semana) notices.push('La jornada supera la disponibilidad del estudiante.');
  if (job.modalidad !== 'remoto' && student.ciudad !== job.ciudad) notices.push(`Revisar traslado de ${student.ciudad} a ${job.ciudad}.`);
  notices.push(`Verificar idiomas solicitados: ${job.idiomas.join(', ')}.`);
  return { score: Math.round(dimensions.reduce((sum, d) => sum + d.value * d.weight, 0)), common, missing, dimensions, notices };
}

import { contact } from '../data'

export default function MissionFile() {
  return (
    <div className="fixed top-4 right-4 z-40">
      <a
        href={contact.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mission-chip"
        aria-label="Open Mission File — Meghaa's resume"
      >
        <span aria-hidden="true" className="text-[var(--gold)]">▣</span>
        mission file
      </a>
    </div>
  )
}
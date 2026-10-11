import Link from 'next/link'

export function SectionPage({ eyebrow, title, description, label = 'এই বিভাগটি ধাপে ধাপে প্রস্তুত হচ্ছে।' }: { eyebrow: string; title: string; description: string; label?: string }) {
  return <main className="simple-page container"><Link className="back-link" href="/">← AGRIVA হোম</Link><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="simple-lede">{description}</p><div className="simple-status"><span className="status-dot"/><div><strong>{label}</strong><p>যাচাইকৃত তথ্য ও প্রয়োজনীয় সেবা প্রস্তুত হলে এই অংশটি চালু হবে। এখনো কোনো live data বা পরামর্শ এখানে দেখানো হচ্ছে না।</p></div></div></main>
}

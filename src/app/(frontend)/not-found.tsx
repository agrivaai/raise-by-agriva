import Link from 'next/link'

export default function NotFound() {
  return <main className="simple-page container"><p className="eyebrow">পৃষ্ঠা পাওয়া যায়নি</p><h1>এই ঠিকানায় কোনো পৃষ্ঠা নেই</h1><p className="simple-lede">লিংকটি বদলে যেতে পারে। AGRIVA-র হোম পেজ থেকে প্রয়োজনীয় বিষয় খুঁজে দেখুন।</p><Link className="button" href="/">হোমে ফিরুন</Link></main>
}

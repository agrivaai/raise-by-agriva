import Link from 'next/link'
import { getRecentArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

const quickLinks = [
  { icon: 'ফ', title: 'ফসলের গাইড', desc: 'ফসলভিত্তিক জ্ঞান ও পরিচর্যার নির্দেশিকা', href: '/crops/' },
  { icon: 'শি', title: 'কৃষি কুইজ', desc: 'শেখার জন্য উৎস-সহ ছোট কুইজ', href: '/quiz/' },
  { icon: 'টিপ', title: 'আজকের কৃষি টিপস', desc: 'উৎস ও সম্পাদকীয় যাচাইসহ টিপস', href: '/tips/' },
  { icon: 'ট', title: 'কৃষি টুলস', desc: 'পরিকল্পনা ও হিসাবের ব্যবহারিক সহায়তা', href: '/tools/' },
]

export default async function HomePage() {
  const articles = await getRecentArticles()
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="AGRIVA হোম"><span className="brand-mark">A</span><span>AGRIVA<small>Growing Life. Shaping The Future.</small></span></Link>
          <nav className="desktop-nav" aria-label="প্রধান নেভিগেশন">
            <Link href="/krishi-poramorsho/">কৃষি-পরামর্শ</Link><Link href="/blog/">ব্লগ</Link><Link href="/tips/">টিপস</Link><Link href="/quiz/">কুইজ</Link><Link href="/community/">কমিউনিটি</Link>
          </nav>
          <Link className="button button-small" href="/admin/">কনটেন্ট টিম লগইন</Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />বাংলাদেশের কৃষির জ্ঞান ও ব্যবসার প্ল্যাটফর্ম</p>
              <h1>কৃষির প্রতিটি সিদ্ধান্তে<br /><em>আরও জ্ঞান, আরও ভরসা।</em></h1>
              <p className="hero-text">ফসলের গাইড, কৃষিবিদের যাচাইকৃত জ্ঞান, শেখার উপকরণ ও কৃষি-ব্যবসার সহায়তা—এক জায়গায়, সহজ বাংলায়।</p>
              <form className="search-form" action="/search/" role="search">
                <label className="sr-only" htmlFor="site-search">কৃষি বিষয় খুঁজুন</label>
                <span aria-hidden="true" className="search-icon">⌕</span>
                <input id="site-search" name="q" placeholder="ফসল, রোগ-পোকা বা কৃষি গাইড খুঁজুন" />
                <button className="button" type="submit">খুঁজুন</button>
              </form>
              <div className="hero-links"><span>জনপ্রিয়:</span><Link href="/crops/">ফসলের গাইড</Link><Link href="/crop-problems/">রোগ-পোকা</Link><Link href="/tools/">কৃষি টুলস</Link></div>
            </div>
            <div className="hero-art" aria-label="কৃষি ও সবুজ মাঠের অলংকারমূলক চিত্র" role="img">
              <div className="sun" /><div className="field field-back" /><div className="field field-mid" /><div className="field field-front" />
              <div className="art-note"><span className="note-icon">✳</span><span><strong>জ্ঞান থেকে পরিকল্পনা</strong><small>কৃষকের পাশে, প্রতিটি মৌসুমে</small></span></div>
              <div className="plant plant-one"><i /><i /><i /><b /></div><div className="plant plant-two"><i /><i /><i /><b /></div>
            </div>
          </div>
        </section>

        <section className="quick-section container" aria-labelledby="quick-title">
          <div className="section-heading"><div><p className="eyebrow">AGRIVA-তে শুরু করুন</p><h2 id="quick-title">আপনার দরকারি কৃষি সহায়তা</h2></div><Link className="text-link" href="/tools/">সব সুবিধা দেখুন <span>↗</span></Link></div>
          <div className="quick-grid">{quickLinks.map((item) => <Link className="quick-card" href={item.href} key={item.title}><span className="quick-icon">{item.icon}</span><span className="quick-card-text"><strong>{item.title}</strong><small>{item.desc}</small></span><span className="arrow">↗</span></Link>)}</div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">জ্ঞানভিত্তিক কৃষি</p><h2>বিশ্বাসযোগ্য তথ্য, কাজে লাগার মতো করে</h2></div><Link className="text-link" href="/blog/">সব লেখা <span>↗</span></Link></div>
            {articles.length ? <div className="article-grid">{articles.map((article) => <Link className="article-card" href={`/blog/${article.slug}/`} key={article.id}><span className="article-kicker">AGRIVA গাইড</span><h3>{article.title}</h3><p>{article.summary}</p><span className="article-more">পড়ুন <span>→</span></span></Link>)}</div> : <div className="empty-note"><span className="empty-icon">✳</span><div><strong>কৃষি জ্ঞানের ভাণ্ডার তৈরি হচ্ছে</strong><p>যাচাইকৃত উৎস ও বিশেষজ্ঞ পর্যালোচনা সম্পন্ন হলে গাইডগুলো এখানে প্রকাশিত হবে।</p></div></div>}
          </div>
        </section>

        <section className="trust-section container">
          <div className="trust-copy"><p className="eyebrow">জ্ঞান, যাচাই, আস্থা</p><h2>কৃষি-পরামর্শে উৎস ও যাচাই দেখুন</h2><p>AGRIVA-তে প্রকাশিত কৃষি-তথ্যের সঙ্গে থাকবে লেখক, পর্যালোচক এবং তথ্যসূত্রের পরিচয়—যাতে সিদ্ধান্ত নেওয়ার আগে তথ্য যাচাই করা সহজ হয়।</p><Link className="button" href="/editorial-policy/">আমাদের সম্পাদকীয় নীতি</Link></div>
          <div className="trust-list"><div><span>01</span><p><strong>উৎসসহ তথ্য</strong><small>প্রাসঙ্গিক গবেষণা ও নির্ভরযোগ্য নির্দেশনার সূত্র</small></p></div><div><span>02</span><p><strong>মানবীয় পর্যালোচনা</strong><small>ঝুঁকিপূর্ণ পরামর্শে কৃষিবিদের যাচাই</small></p></div><div><span>03</span><p><strong>স্বচ্ছ আপডেট</strong><small>প্রকাশ ও সর্বশেষ হালনাগাদের তারিখ</small></p></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="brand footer-brand"><span className="brand-mark">A</span><span>AGRIVA<small>Growing Life. Shaping The Future.</small></span></div><p>বাংলাদেশের কৃষির জ্ঞান, শেখা ও সম্ভাবনাকে একসঙ্গে এগিয়ে নেওয়ার উদ্যোগ।</p><div className="footer-links"><Link href="/about/">আমাদের সম্পর্কে</Link><Link href="/editorial-policy/">সম্পাদকীয় নীতি</Link><Link href="/privacy/">গোপনীয়তা</Link><Link href="/contact/">যোগাযোগ</Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AGRIVA</span><span>তথ্য প্রকাশের আগে যাচাই করুন; জরুরি বিষয়ে স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ নিন।</span></div></footer>
    </>
  )
}

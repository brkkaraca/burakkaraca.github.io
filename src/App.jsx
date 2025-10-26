import React from 'react'
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom'

const POSTS = [
  { id:'biyometrik-onay-yonetimi', title:'Biyometrik Onay Süreçlerinde Merkezî Yönetim', excerpt:'Kullanıcı onaylarının sürdürülebilir yönetimi ve deneyim sadeleştirmesi.', date:'2025-02-01', content:'Bu yazıda biyometrik onay akışlarının merkezî yönetimi, mevzuat uyumu ve deneyim etkisini ele alıyorum. Modüler onay servisleri, audit izleri ve uçtan uca ölçümleme ile sürdürülebilirlik sağlanabilir.' },
  { id:'mikro-etkiler-buyuk-sonuclar', title:'Mobil Bankacılıkta Mikro Etkiler, Büyük Sonuçlar', excerpt:'Küçük optimizasyonların kullanıcı davranışına etkisini inceliyoruz.', date:'2025-01-20', content:'Mikro metrikler: TAP, TTI, boşta kalma süreleri ve hata oranları. Küçük iyileştirmelerin dönüşüm ve memnuniyete etkisine örnek vaka çalışmaları paylaşıyorum.' },
  { id:'veri-odakli-analist', title:'Veri Odaklı Karar Alma ve Analist Rolü', excerpt:'Hızlı kararlar için doğru veri mimarisinin önemi.', date:'2024-12-30', content:'Ürün kararlarında deney tasarımı, event şeması ve observability. Analistin köprü rolü ve veri okuryazarlığı kültürü üzerine pratik öneriler.' },
  ...Array.from({length:6}).map((_,i)=>({ id:`ornek-yazi-${i+1}`, title:`Örnek Yazı ${i+1}`, excerpt:'Kısa açıklama metni — yakında içerik eklenecek.', date:'2024-12-01', content:'Yer tutucu içerik.' })),
]

function Header(){
  const loc = useLocation()
  const is = (p)=> loc.pathname === p
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b" style={{borderColor:'var(--border)'}}>
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Burak Karaca logo" className="h-10 w-10 object-contain rounded-md imgborder" />
        <h1 className="text-lg font-semibold">Burak Karaca</h1>
      </div>
      <nav className="flex gap-6 text-sm">
        <Link className={`link ${is('/')?'text-[#2C5F6C]':''}`} to="/">Anasayfa</Link>
        <Link className={`link ${is('/hakkimda')?'text-[#2C5F6C]':''}`} to="/hakkimda">Hakkımda</Link>
        <Link className={`link ${is('/yazilar')||loc.pathname.startsWith('/yazilar/')?'text-[#2C5F6C]':''}`} to="/yazilar">Yazılar</Link>
      </nav>
    </header>
  )
}

const Title = ({children}) => <h3 className="text-2xl font-semibold mb-6 underline-title">{children}</h3>

function Home(){
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Analiz ve Mobil Deneyim Üzerine Yazıyorum.</h2>
        <p className="max-w-3xl leading-relaxed">Intertech’te Architect Business Analyst olarak; mobil bankacılık, süreç optimizasyonu ve kullanıcı deneyimi üzerine içerikler paylaşıyorum.</p>
        <div className="flex gap-4 mt-8">
          <a className="p-2 inline-flex items-center justify-center link" href="https://x.com/brkkaraca" target="_blank" rel="noopener noreferrer" title="X">
            <span aria-hidden>✕</span>
          </a>
          <a className="p-2 inline-flex items-center justify-center link" href="https://linkedin.com/in/burakkaraca" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <span aria-hidden>in</span>
          </a>
          <a className="p-2 inline-flex items-center justify-center link" href="https://github.com/brkkaraca" target="_blank" rel="noopener noreferrer" title="GitHub">
            <span aria-hidden>GH</span>
          </a>
          <a className="p-2 inline-flex items-center justify-center link" href="https://instagram.com/brkkaraca" target="_blank" rel="noopener noreferrer" title="Instagram">
            <span aria-hidden>IG</span>
          </a>
          <a className="p-2 inline-flex items-center justify-center link" href="mailto:burak@burakkaraca.com.tr" title="E-posta">
            <span aria-hidden>@</span>
          </a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10 w-full">
        <Title>Son Yazılar</Title>
        <div className="space-y-6">
          {POSTS.slice(0,3).map(p => (
            <Link key={p.id} to={`/yazilar/${p.id}`} className="block card link">
              <h4 className="font-semibold text-lg">{p.title}</h4>
              <p className="text-sm mt-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function Posts(){
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 w-full">
      <Title>Yazılar</Title>
      <div className="space-y-6">
        {POSTS.map(p => (
          <Link key={p.id} to={`/yazilar/${p.id}`} className="block card link">
            <div className="text-xs opacity-70 mb-1">{p.date}</div>
            <div className="font-semibold text-lg">{p.title}</div>
            <div className="text-sm mt-2">{p.excerpt}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function PostDetail(){
  const { id } = useParams()
  const post = POSTS.find(p=>p.id===id)
  if(!post) return <section className="max-w-3xl mx-auto px-6 py-12">Yazı bulunamadı.</section>
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 w-full">
      <Link to="/yazilar" className="mb-6 inline-block text-sm underline link">← Tüm yazılar</Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-xs opacity-70 mb-6">{post.date}</div>
      <div className="max-w-none"><p>{post.content}</p></div>
    </article>
  )
}

function About(){
  return (
    <section className="max-w-3xl mx-auto px-6 py-12 w-full">
      <Title>Hakkımda</Title>
      <div className="flex gap-6 items-start card">
        <img src="/profile.jpg" alt="Burak Karaca" className="h-28 w-28 md:h-32 md:w-32 object-cover imgborder" />
        <div className="space-y-4 text-sm leading-relaxed">
          <p>15 yılı aşkın iş deneyimimle, farklı sektörlerde kazandığım bilgi ve becerilerle Intertech’te Mimar İş Analisti olarak görev alıyorum. Analitik düşünme yeteneğim, hızlı öğrenme kabiliyetim ve problem çözme becerimle iş süreçlerinde katma değer sağlayan projelerde kilit roller üstleniyorum. Farklı perspektiflerden yaklaşarak iş süreçlerini optimize ediyor ve değer odaklı çözümler geliştiriyorum.</p>
          <p>DenizBank’taki kariyerime şube operasyonlarında başladım ve 2021 yılında Bilgi Teknolojileri alanına geçiş yaparak bu alanda uzmanlaştım. Bu süreç, teknolojik yenilikleri hızla benimseme ve iş hedefleri doğrultusunda stratejik çözümler geliştirme yetkinliğimi pekiştirdi. MobilDeniz projelerinde kullanıcı ihtiyaçlarını analiz ederken, uygulama performansı ve güvenliğini artırmaya yönelik kritik tespitler ve öneriler sundum.</p>
          <p>Farklı bakış açıları geliştirerek karmaşık problemleri çözme, yenilikçi çözümler üretme ve iş süreçlerini optimize etme konularında yetkinlik kazandım. Stratejik düşünme ve karar alma süreçlerinde etkin rol üstlenerek, liderlik becerilerimle ekipleri yönlendirme ve iş hedefleri doğrultusunda çözümler geliştirme konularında deneyim sahibiyim. Hızlı öğrenme kabiliyetim sayesinde değişen teknoloji ve iş modellerine hızla adapte oluyor, etkili iletişim becerilerim sayesinde ekip içi uyumu ve paydaş iş birliklerini güçlendiriyorum.</p>
          <p>Yaptığım her işi sadece “tamamlamak” için değil, daha iyisini mümkün kılmak için yapıyorum. Bu yaklaşımla, kendi değerimi ortaya koyarak; analitik bakış açımı ve çözüm odaklı duruşumu hem insanlara hem de iş süreçlerine değer katacak şekilde kullanarak, danışmanlık ve ekip yönetimi gibi alanlarda daha fazla sorumluluk almayı hedefliyorum. Stratejik katkı sağlayan, yön gösteren ve fark yaratan bir liderliğe doğru ilerliyorum. Bu yaklaşımı bir unvandan ziyade bir sorumluluk olarak görüyor ve her koşulda etki yaratmaya odaklanıyorum.</p>
        </div>
      </div>
    </section>
  )
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yazilar" element={<Posts />} />
        <Route path="/yazilar/:id" element={<PostDetail />} />
        <Route path="/hakkimda" element={<About />} />
      </Routes>
      <footer className="mt-auto border-t px-6 py-6 text-sm" style={{borderColor:'var(--border)'}}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center w-full">
          <p>© 2025 Burak Karaca</p>
          <a href="mailto:burak@burakkaraca.com.tr" className="link mt-2 md:mt-0">burak@burakkaraca.com.tr</a>
        </div>
      </footer>
    </div>
  )
}

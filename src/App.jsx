
import React, { useEffect, useMemo, useState } from "react";
import { Linkedin, Twitter, Github, Mail, Instagram, Share2, ChevronRight, Sparkles, Files, UserRound } from "lucide-react";

const POSTS = [
  { id: "biyometrik-onay-yonetimi", title: "Biyometrik Onay Süreçlerinde Merkezî Yönetim", excerpt: "Kullanıcı onaylarının sürdürülebilir yönetimi ve deneyim sadeleştirmesi.", content: "Bu yazıda biyometrik onay akışlarının merkezî yönetimi, mevzuat uyumu ve deneyim etkisini ele alıyorum. Modüler onay servisleri, audit izleri ve uçtan uca ölçümleme ile sürdürülebilirlik sağlanabilir.", date: "2025-02-01" },
  { id: "mikro-etkiler-buyuk-sonuclar", title: "Mobil Bankacılıkta Mikro Etkiler, Büyük Sonuçlar", excerpt: "Küçük optimizasyonların kullanıcı davranışına etkisini inceliyoruz.", content: "Mikro metrikler: TAP, TTI, boşta kalma süreleri ve hata oranları. Küçük iyileştirmelerin dönüşüm ve memnuniyete etkisine örnek vaka çalışmaları paylaşıyorum.", date: "2025-01-20" },
  { id: "veri-odakli-analist", title: "Veri Odaklı Karar Alma ve Analist Rolü", excerpt: "Hızlı kararlar için doğru veri mimarisinin önemi.", content: "Ürün kararlarında deney tasarımı, event şeması ve observability. Analistin köprü rolü ve veri okuryazarlığı kültürü üzerine pratik öneriler.", date: "2024-12-30" },
  ...Array.from({ length: 6 }).map((_, i) => ({ id: "ornek-yazi-"+(i+1), title: "Örnek Yazı "+(i+1), excerpt: "Kısa açıklama metni — yakında içerik eklenecek.", content: "Yer tutucu içerik.", date: "2024-12-01" })),
];

const fmt = (d) => (d ? new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(d)) : "");
const parseHash = () => {
  const raw = (typeof window !== "undefined" ? window.location.hash : "").replace(/^#\/?/, "");
  if (!raw) return "home";
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] === "hakkimda") return "hakkimda";
  if (parts[0] === "yazilar" && parts[1]) return { kind: "post", id: parts[1] };
  if (parts[0] === "yazilar") return "yazilar";
  return "home";
};

const Title = ({ children, icon: Icon }) => (
  <h3 className="flex items-center gap-2 text-2xl font-semibold mb-6 border-b border-[#D6E2E8] pb-2">
    {Icon ? <Icon className="w-5 h-5" /> : null}
    <span>{children}</span>
  </h3>
);

export default function App() {
  const [route, setRoute] = useState(typeof window === "undefined" ? "home" : parseHash());
  const activePost = useMemo(
    () => (typeof route === "object" && route.kind === "post" ? POSTS.find((p) => p.id === route.id) || null : null),
    [route]
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    setRoute(parseHash());
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [route]);

  const go = (r) => {
    if (r === "home") window.location.hash = "/";
    else if (r === "hakkimda") window.location.hash = "/hakkimda";
    else if (r === "yazilar") window.location.hash = "/yazilar";
    else if (typeof r === "object" && r.kind === "post") window.location.hash = "/yazilar/"+r.id;
    setRoute(r);
  };

  const shareCurrent = async (title) => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: title || document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Bağlantı panoya kopyalandı.");
      }
    } catch (_) {
      try { await navigator.clipboard.writeText(url); alert("Bağlantı panoya kopyalandı."); } catch {}
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)", color: "#1A2C3A" }}>
      <header className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 border-b border-[#D6E2E8] bg-transparent backdrop-blur backdrop-saturate-150">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Burak Karaca logo" className="h-10 w-10 rounded-md object-cover bg-white/70 border border-[#D6E2E8]" />
          <h1 className="text-lg font-semibold hidden sm:block">Burak Karaca</h1>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#/" onClick={(e)=>{e.preventDefault(); go("home");}} className={(route==="home"?"font-semibold ":"")+"hover:text-[#2C5F6C] transition-colors"}>Anasayfa</a>
          <a href="#/hakkimda" onClick={(e)=>{e.preventDefault(); go("hakkimda");}} className={(route==="hakkimda"?"font-semibold ":"")+"hover:text-[#2C5F6C] transition-colors"}>Hakkımda</a>
          <a href="#/yazilar" onClick={(e)=>{e.preventDefault(); go("yazilar");}} className={((route==="yazilar"|| (typeof route==="object"&&route.kind==="post"))?"font-semibold ":"")+"hover:text-[#2C5F6C] transition-colors"}>Yazılarım</a>
        </nav>
      </header>

      {route === "home" && (
        <>
          <section className="flex flex-col items-center justify-center text-center py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dijital Dönüşümün Merkezinde</h2>
            <p className="max-w-2xl leading-relaxed">Bir analist için en değerli beceri, detaylarda kaybolmadan bütünü görebilmektir. Ekiplerin doğru kararlara ulaşmasını sağlayan en önemli şeyin, analizin ötesinde vizyonel bir bakış olduğuna inanırım. Mobil deneyim, teknoloji ve iş analizi kesişiminde; gözlemlerimi, fikirlerimi ve deneyimlerimi paylaşıyorum.</p>
            <div className="flex gap-4 mt-8">
              <a href="https://linkedin.com/in/burakkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open("https://linkedin.com/in/burakkaraca","_blank","noopener");}} className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80" title="LinkedIn" style={{ color: '#0A66C2' }}><Linkedin /></a>
              <a href="https://github.com/brkkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open("https://github.com/brkkaraca","_blank","noopener");}} className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80" title="GitHub" style={{ color: '#171515' }}><Github /></a>
              <a href="https://x.com/brkkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open("https://x.com/brkkaraca","_blank","noopener");}} className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80" title="Twitter / X" style={{ color: '#1DA1F2' }}><Twitter /></a>
              <a href="https://instagram.com/brkkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open("https://instagram.com/burkkaraca","_blank","noopener");}} className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80" title="Instagram" style={{ color: '#C13584' }}><Instagram /></a>
              <a href="mailto:iletisim@burakkaraca.com.tr" className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80" title="E-posta" style={{ color: '#EA4335' }}><Mail /></a>
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-6 py-10 w-full">
            <Title icon={Sparkles}>Son Yazılarım</Title>
            <div className="space-y-6">
              {POSTS.slice(0,3).map((p) => (
                <a key={p.id} href={"#/yazilar/"+p.id} onClick={(e)=>{e.preventDefault(); go({ kind: "post", id: p.id });}} className="block border border-[#D6E2E8] rounded-2xl p-5 transition-colors hover:text-[#2C5F6C] cursor-pointer bg-transparent backdrop-blur shadow-[0_4px_14px_rgba(26,44,58,0.06)]">
                  <div className="text-xs opacity-70 mb-2 block md:hidden">{fmt(p.date)}</div>
                  <div className="flex items-start gap-3">
                    <h4 className="font-semibold text-lg flex-1">{p.title}</h4>
                    <div className="text-xs opacity-70 hidden md:block ml-4 mt-1">{fmt(p.date)}</div>
                  </div>
                  <p className="text-sm mt-2 flex items-end justify-between">
                    <span>{p.excerpt}</span>
                    <span className="inline-flex items-center gap-1 text-sm opacity-80"><ChevronRight className="w-4 h-4" /></span>
                  </p>
                </a>
              ))}
            </div>
          </section>
        </>
      )}

      {route === "yazilar" && (
        <section className="max-w-3xl mx-auto px-6 py-12 w-full">
          <Title icon={Files}>Tüm Yazılarım</Title>
          <div className="space-y-6">
            {POSTS.map((p) => (
              <a key={p.id} href={"#/yazilar/"+p.id} onClick={(e)=>{e.preventDefault(); go({ kind: "post", id: p.id });}} className="block border border-[#D6E2E8] rounded-2xl p-5 transition-colors hover:text-[#2C5F6C] cursor-pointer bg-transparent backdrop-blur shadow-[0_4px_14px_rgba(26,44,58,0.06)]">
                <div className="text-xs opacity-70 mb-2 block md:hidden">{fmt(p.date)}</div>
                <div className="flex items-start gap-3">
                  <div className="font-semibold text-lg flex-1">{p.title}</div>
                  <div className="text-xs opacity-70 hidden md:block ml-4 mt-1">{fmt(p.date)}</div>
                </div>
                <p className="text-sm mt-2 flex items-end justify-between">
                  <span>{p.excerpt}</span>
                  <span className="inline-flex items-center gap-1 text-sm opacity-80"><ChevronRight className="w-4 h-4" /></span>
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {typeof route === "object" && route.kind === "post" && activePost && (
        <article className="max-w-3xl mx-auto px-6 py-12 w-full">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold mb-2">{activePost.title}</h1>
            <button onClick={()=>shareCurrent(activePost.title)} className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D6E2E8] hover:text-[#2C5F6C] transition-colors" title="Paylaş">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Paylaş</span>
            </button>
          </div>
          <div className="text-xs opacity-70 mb-6">{fmt(activePost.date)}</div>
          <div className="max-w-none"><p>{activePost.content}</p></div>
        </article>
      )}

      {route === "hakkimda" && (
        <section className="max-w-3xl mx-auto px-6 py-12 w-full">
          <Title icon={UserRound}>Hakkımda</Title>
          <div className="relative after:content-[''] after:block after:clear-both">
            <img src="/profile.jpg" alt="Burak Karaca" className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border border-[#D6E2E8] mb-2 mr-4 md:mb-2 md:mr-6 float-left" />
            <div className="space-y-4 text-sm leading-relaxed">
              <p>15 yılı aşkın iş deneyimimle, farklı sektörlerde kazandığım bilgi ve becerilerle Intertech’te Mimar İş Analisti olarak görev alıyorum. Analitik düşünme yeteneğim, hızlı öğrenme kabiliyetim ve problem çözme becerimle iş süreçlerinde katma değer sağlayan projelerde kilit roller üstleniyorum. Farklı perspektiflerden yaklaşarak iş süreçlerini optimize ediyor ve değer odaklı çözümler geliştiriyorum.</p>
              <p>DenizBank’taki kariyerime şube operasyonlarında başladım ve 2021 yılında Bilgi Teknolojileri alanına geçiş yaparak bu alanda uzmanlaştım. Bu süreç, teknolojik yenilikleri hızla benimseme ve iş hedefleri doğrultusunda stratejik çözümler geliştirme yetkinliğimi pekiştirdi. MobilDeniz projelerinde kullanıcı ihtiyaçlarını analiz ederken, uygulama performansı ve güvenliğini artırmaya yönelik kritik tespitler ve öneriler sundum.</p>
              <p>Farklı bakış açıları geliştirerek karmaşık problemleri çözme, yenilikçi çözümler üretme ve iş süreçlerini optimize etme konularında yetkinlik kazandım. Stratejik düşünme ve karar alma süreçlerinde etkin rol üstlenerek, liderlik becerilerimle ekipleri yönlendirme ve iş hedefleri doğrultusunda çözümler geliştirme konularında deneyim sahibiyim. Hızlı öğrenme kabiliyetim sayesinde değişen teknoloji ve iş modellerine hızla adapte oluyor, etkili iletişim becerilerim sayesinde ekip içi uyumu ve paydaş iş birliklerini güçlendiriyorum.</p>
              <p>Yaptığım her işi sadece “tamamlamak” için değil, daha iyisini mümkün kılmak için yapıyorum. Bu yaklaşımla, kendi değerimi ortaya koyarak; analitik bakış açımı ve çözüm odaklı duruşumu hem insanlara hem de iş süreçlerine değer katacak şekilde kullanarak, danışmanlık ve ekip yönetimi gibi alanlarda daha fazla sorumluluk almayı hedefliyorum. Stratejik katkı sağlayan, yön gösteren ve fark yaratan bir liderliğe doğru ilerliyorum. Bu yaklaşımı bir unvandan ziyade bir sorumluluk olarak görüyor ve her koşulda etki yaratmaya odaklanıyorum.</p>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-auto border-t border-[#D6E2E8] text-sm py-6 px-6 flex flex-col md:flex-row justify-between items-center bg-transparent backdrop-blur backdrop-saturate-150">
        <p>© 2025 Burak Karaca</p>
        <a href="mailto:iletisim@burakkaraca.com.tr" className="hover:text-[#2C5F6C] transition-colors mt-2 md:mt-0">iletisim@burakkaraca.com.tr</a>
      </footer>
    </div>
  );
}

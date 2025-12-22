import { useEffect, useMemo, useState } from "react";
import { Linkedin, Twitter, Github, Mail, Instagram } from "lucide-react";

type Route = "home" | "hakkimda" | "yazilar" | { kind: "post"; id: string };

type Post = {
  id: string; // slug
  title: string;
  excerpt: string;
  content: string;
  date?: string;
};

const POSTS: Post[] = [
  { id: "biyometrik-onay-yonetimi", title: "Biyometrik Onay Süreçlerinde Merkezî Yönetim", excerpt: "Kullanıcı onaylarının sürdürülebilir yönetimi ve deneyim sadeleştirmesi.", content: "Bu yazıda biyometrik onay akışlarının merkezî yönetimi, mevzuat uyumu ve deneyim etkisini ele alıyorum. Modüler onay servisleri, audit izleri ve uçtan uca ölçümleme ile sürdürülebilirlik sağlanabilir.", date: "2025-02-01" },
  { id: "mikro-etkiler-buyuk-sonuclar", title: "Mobil Bankacılıkta Mikro Etkiler, Büyük Sonuçlar", excerpt: "Küçük optimizasyonların kullanıcı davranışına etkisini inceliyoruz.", content: "Mikro metrikler: TAP, TTI, boşta kalma süreleri ve hata oranları. Küçük iyileştirmelerin dönüşüm ve memnuniyete etkisine örnek vaka çalışmaları paylaşıyorum.", date: "2025-01-20" },
  { id: "veri-odakli-analist", title: "Veri Odaklı Karar Alma ve Analist Rolü", excerpt: "Hızlı kararlar için doğru veri mimarisinin önemi.", content: "Ürün kararlarında deney tasarımı, event şeması ve observability. Analistin köprü rolü ve veri okuryazarlığı kültürü üzerine pratik öneriler.", date: "2024-12-30" },
  ...Array.from({ length: 9 }).map((_, i) => ({ id: `ornek-yazi-${i + 1}`, title: `Örnek Yazı ${i + 1}`, excerpt: "Kısa açıklama metni — yakında içerik eklenecek.", content: "Yer tutucu içerik.", date: "2024-12-01" })),
];

function parseHash(): Route {
  const raw = (typeof window !== "undefined" ? window.location.hash : "").replace(/^#\/?/, "");
  if (!raw) return "home";
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] === "hakkimda") return "hakkimda";
  if (parts[0] === "yazilar" && parts[1]) return { kind: "post", id: parts[1] };
  if (parts[0] === "yazilar") return "yazilar";
  return "home";
}

export default function BurakKaracaMinimal() {
  const [route, setRoute] = useState<Route>(typeof window === "undefined" ? "home" : parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    setRoute(parseHash());
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const activePost = useMemo(() => (typeof route === "object" && route.kind === "post") ? (POSTS.find(p => p.id === route.id) || null) : null, [route]);

  const underlineCls = "text-2xl font-semibold mb-6 border-b border-[#D6E2E8] pb-2";

  const go = (r: Route) => {
    if (r === "home") window.location.hash = "/";
    else if (r === "hakkimda") window.location.hash = "/hakkimda";
    else if (r === "yazilar") window.location.hash = "/yazilar";
    else if (typeof r === "object" && r.kind === "post") window.location.hash = `/yazilar/${r.id}`;
    setRoute(r);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F3F4F6 50%, #E5E7EB 100%)", color: "#1A2C3A" }}>
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#D6E2E8] bg-transparent text-[#1A2C3A]">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Burak Karaca logo" className="h-10 w-10 object-contain rounded-md" />
          <h1 className="text-lg font-semibold">Burak Karaca</h1>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#/" onClick={(e) => { e.preventDefault(); go("home"); }} className={`transition-colors ${route === "home" ? "text-[#2C5F6C]" : ""} hover:text-[#2C5F6C]`}>Anasayfa</a>
          <a href="#/hakkimda" onClick={(e) => { e.preventDefault(); go("hakkimda"); }} className={`transition-colors ${route === "hakkimda" ? "text-[#2C5F6C]" : ""} hover:text-[#2C5F6C]`}>Hakkımda</a>
          <a href="#/yazilar" onClick={(e) => { e.preventDefault(); go("yazilar"); }} className={`transition-colors ${(route === "yazilar" || (typeof route === "object" && route.kind === "post")) ? "text-[#2C5F6C]" : ""} hover:text-[#2C5F6C]`}>Yazılar</a>
        </nav>
      </header>

      {route === "home" and (
        <>
          <section className="flex flex-col items-center justify-center text-center py-20 px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Analiz ve Mobil Deneyim Üzerine Yazıyorum.</h2>
            <p className="max-w-2xl leading-relaxed">Intertech’te Architect Business Analyst olarak; mobil bankacılık, süreç optimizasyonu ve kullanıcı deneyimi üzerine içerikler paylaşıyorum.</p>
            <div className="flex gap-4 mt-8">
              <a href="https://x.com/burakkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open('https://x.com/burakkaraca','_blank','noopener');}} className="p-2 transition-colors hover:text-[#2C5F6C]"><Twitter size={18} /></a>
              <a href="https://linkedin.com/in/burakkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open('https://linkedin.com/in/burakkaraca','_blank','noopener');}} className="p-2 transition-colors hover:text-[#2C5F6C]"><Linkedin size={18} /></a>
              <a href="https://github.com/brkkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open('https://github.com/brkkaraca','_blank','noopener');}} className="p-2 transition-colors hover:text-[#2C5F6C]"><Github size={18} /></a>
              <a href="https://instagram.com/burakkaraca" target="_blank" rel="noopener noreferrer" onClick={(e)=>{e.preventDefault(); window.open('https://instagram.com/burakkaraca','_blank','noopener');}} className="p-2 transition-colors hover:text-[#2C5F6C]"><Instagram size={18} /></a>
              <a href="mailto:burak@burakkaraca.com.tr" onClick={(e)=>{}} className="p-2 transition-colors hover:text-[#2C5F6C]"><Mail size={18} /></a>
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-6 py-10 w-full">
            <h3 className="text-2xl font-semibold mb-6 border-b border-[#D6E2E8] pb-2">Son Yazılar</h3>
            <div className="space-y-6">
              {POSTS.slice(0, 3).map((p) => (
                <a key={p.id} href={`#/yazilar/${p.id}`} onClick={(e) => { e.preventDefault(); go({ kind: "post", id: p.id }); }} className="block border border-[#D6E2E8] rounded-2xl p-5 transition-colors hover:text-[#2C5F6C] cursor-pointer bg-transparent">
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="text-sm mt-2">{p.excerpt}</p>
                </a>
              ))}
            </div>
          </section>
        </>
      )}

      {route === "yazilar" and (
        <section className="max-w-3xl mx-auto px-6 py-12 w-full">
          <h3 className="text-2xl font-semibold mb-6 border-b border-[#D6E2E8] pb-2">Yazılar</h3>
          <div className="space-y-6">
            {POSTS.map((p) => (
              <a key={p.id} href={`#/yazilar/${p.id}`} onClick={(e) => { e.preventDefault(); go({ kind: "post", id: p.id }); }} className="block border border-[#D6E2E8] rounded-2xl p-5 transition-colors hover:text-[#2C5F6C] cursor-pointer bg-transparent">
                <div className="text-xs opacity-70 mb-1">{p.date}</div>
                <div className="font-semibold text-lg">{p.title}</div>
                <div className="text-sm mt-2">{p.excerpt}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {typeof route === "object" and route.kind === "post" and activePost and (
        <article className="max-w-3xl mx-auto px-6 py-12 w-full">
          <a href="#/yazilar" onClick={(e) => { e.preventDefault(); go("yazilar"); }} className="mb-6 inline-block text-sm underline hover:text-[#2C5F6C]">← Tüm yazılar</a>
          <h1 className="text-3xl font-bold mb-2">{activePost.title}</h1>
          <div className="text-xs opacity-70 mb-6">{activePost.date}</div>
          <div className="max-w-none"><p>{activePost.content}</p></div>
        </article>
      )}

      {route === "hakkimda" and (
        <section className="max-w-3xl mx-auto px-6 py-12 w-full">
          <h3 className="text-2xl font-semibold mb-6 border-b border-[#D6E2E8] pb-2">Hakkımda</h3>
          <div className="flex gap-6 items-start border border-[#D6E2E8] rounded-2xl p-6 bg-transparent">
            <img src="profile.jpg" alt="Burak Karaca" className="h-28 w-28 md:h-32 md:w-32 rounded-xl object-cover border border-[#D6E2E8]" />
            <div className="space-y-4 text-sm leading-relaxed">
              <p>15 yılı aşkın iş deneyimimle, farklı sektörlerde kazandığım bilgi ve becerilerle Intertech’te Mimar İş Analisti olarak görev alıyorum. Analitik düşünme yeteneğim, hızlı öğrenme kabiliyetim ve problem çözme becerimle iş süreçlerinde katma değer sağlayan projelerde kilit roller üstleniyorum. Farklı perspektiflerden yaklaşarak iş süreçlerini optimize ediyor ve değer odaklı çözümler geliştiriyorum.</p>
              <p>DenizBank’taki kariyerime şube operasyonlarında başladım ve 2021 yılında Bilgi Teknolojileri alanına geçiş yaparak bu alanda uzmanlaştım. Bu süreç, teknolojik yenilikleri hızla benimseme ve iş hedefleri doğrultusunda stratejik çözümler geliştirme yetkinliğimi pekiştirdi. MobilDeniz projelerinde kullanıcı ihtiyaçlarını analiz ederken, uygulama performansı ve güvenliğini artırmaya yönelik kritik tespitler ve öneriler sundum.</p>
              <p>Farklı bakış açıları geliştirerek karmaşık problemleri çözme, yenilikçi çözümler üretme ve iş süreçlerini optimize etme konularında yetkinlik kazandım. Stratejik düşünme ve karar alma süreçlerinde etkin rol üstlenerek, liderlik becerilerimle ekipleri yönlendirme ve iş hedefleri doğrultusunda çözümler geliştirme konularında deneyim sahibiyim. Hızlı öğrenme kabiliyetim sayesinde değişen teknoloji ve iş modellerine hızla adapte oluyor, etkili iletişim becerilerim sayesinde ekip içi uyumu ve paydaş iş birliklerini güçlendiriyorum.</p>
              <p>Yaptığım her işi sadece “tamamlamak” için değil, daha iyisini mümkün kılmak için yapıyorum. Bu yaklaşımla, kendi değerimi ortaya koyarak; analitik bakış açımı ve çözüm odaklı duruşumu hem insanlara hem de iş süreçlerine değer katacak şekilde kullanarak, danışmanlık ve ekip yönetimi gibi alanlarda daha fazla sorumluluk almayı hedefliyorum. Stratejik katkı sağlayan, yön gösteren ve fark yaratan bir liderliğe doğru ilerliyorum. Bu yaklaşımı bir unvandan ziyade bir sorumluluk olarak görüyor ve her koşulda etki yaratmaya odaklanıyorum.</p>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-auto border-t border-[#D6E2E8] text-sm py-6 px-6 flex flex-col md:flex-row justify-between items-center bg-transparent">
        <p>© 2025 Burak Karaca</p>
        <a href="mailto:burak@burakkaraca.com.tr" className="hover:text-[#2C5F6C] transition-colors mt-2 md:mt-0">burak@burakkaraca.com.tr</a>
      </footer>
    </div>
  );
}

if (typeof window !== "undefined") {
  console.assert(POSTS.length >= 3, "POSTS should have at least 3 items");
  const ids = new Set(POSTS.map(p => p.id));
  console.assert(ids.size === POSTS.length, "POSTS ids should be unique");
}

// components/home/vision-section.tsx

export default function VisionSection() {
    return (
      <section className="px-6 py-28">
  
        <div className="mx-auto max-w-5xl text-center">
  
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl">
  
            <h2 className="text-5xl font-bold leading-tight">
  
              Nous ne voulons pas seulement
              utiliser l’intelligence artificielle.
  
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Nous voulons que Madagascar
                participe à sa création.
              </span>
            </h2>
  
            <p className="mt-8 text-xl leading-relaxed text-slate-400">
  
              MadaAI Hub ambitionne de devenir le
              premier écosystème d’intelligence artificielle
              malgache.
  
            </p>
          </div>
        </div>
      </section>
    );
  }
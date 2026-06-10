import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
      <Image
        src="/TUF promo art.png"
        alt="Hero Banner"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,16,37,0.95)] via-[rgba(26,16,37,0.75)] to-transparent" />
      <span className="absolute top-8 left-[45%] font-titan text-[var(--pink)] opacity-30 text-2xl">
        ✦
      </span>
      <span className="absolute bottom-12 left-[55%] font-titan text-[var(--pink)] opacity-30 text-lg">
        ✦
      </span>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-12 max-w-lg">
          {/* Tag */}
          <div className="inline-block bg-[var(--pink)] text-white text-xs font-extrabold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            ✦ New Drops Available
          </div>

          {/* Heading */}
          <h1 className="font-titan text-4xl md:test-5xl text-white leading-tight mb-3">
            In pursuit to <br />
            <span className="text-[var(--pink)]"> create.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
            Comics, Prints, stickers and Merchandise — made with love!
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/shop"
              className="bg-[var(--pink)] text-white font-extrabold text-sm px-6 py-3 rounded-full hover:bg-[var(--lavender)] transition-colors"
            >
              Shop now ✦
            </Link>
            <Link
              href="/about"
              className="bg-transparent text-white font-extrabold text-sm px-6 py-3 rounded-full border-2 border-white/30 hover:border-white/60 transition-colors"
            >
              See my work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div
        className="overflow-hidden leading-[0] bg-[var(--blush)]"
        style={{ marginBottom: "-2px" }}
      >
        <svg
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g className="wave1">
            <use href="#wave" x="0" y="0" fill="var(--lavender)" />
            <use href="#wave" x="352" y="0" fill="var(--lavender)" />
          </g>

          <g className="wave2">
            <use href="#wave" x="0" y="3" fill="var(--pink-border)" />
            <use href="#wave" x="352" y="3" fill="var(--pink-border)" />
          </g>

          <g className="wave3">
            <use href="#wave" x="0" y="5" fill="var(--pink)" />
            <use href="#wave" x="352" y="5" fill="var(--pink)" />
          </g>
        </svg>
      </div>

      <div className="bg-[var(--pink)] px-6 pb-4 pb-8 pt-2">
        <div className="mx-auto max-w-6xl">
          {/* sleepy panda */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="floating-image">
              <Image
                src="/sleepy_panda.png"
                alt="Sleepy panda logo"
                width={90}
                height={90}
              />
            </div>
            {/* social media links */}
            <h1 className="text-sm font-bold text-[var(--blush)]">
              Find me here:
            </h1>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thorstoreart/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--blush)] hover:text-[var(--lavender)]"
              >
                <Image
                  src="/instagram-fill-svgrepo-com.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://www.youtube.com/@thorstore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--blush)] hover:text-[var(--lavender)]"
              >
                <Image
                  src="/youtube-fill-svgrepo-com.svg"
                  alt="YouTube"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://www.tiktok.com/@thorstoreart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--blush)] hover:text-[var(--lavender)]"
              >
                <Image
                  src="/tiktok-fill-svgrepo-com.svg"
                  alt="TikTok"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <div className="h-px w-full bg-white/15" />

          <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row">
            <p className="text-xs text-[var(--blush)]/90">
              © {new Date().getFullYear()} Thorstore Art. All rights reserved.
            </p>

            <p className="text-xs text-[var(--blush)]/90">
              Fan art · Prints · Stickers · Comics ✦
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .floating-image {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .wave1 {
          animation: wave1 12s linear infinite;
          opacity: 0.4;
        }

        .wave2 {
          animation: wave2 10s linear infinite reverse;
          opacity: 0.6;
        }

        .wave3 {
          animation: wave3 8s linear infinite;
        }

        @keyframes wave1 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-352px);
          }
        }

        @keyframes wave2 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-352px);
          }
        }

        @keyframes wave3 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-352px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

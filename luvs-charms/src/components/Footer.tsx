"use client";

import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialIcons = [
    { name: "Facebook", icon: "📘", hoverColor: "#1877f2" },
    { name: "Instagram", icon: "📷", hoverColor: "#e4405f" },
    { name: "TikTok", icon: "🎵", hoverColor: "#000000" },
    { name: "Twitter", icon: "🐦", hoverColor: "#1da1f2" },
  ];

  const handleSocialClick = () => {
    setShowSocialModal(true);
    setTimeout(() => setShowSocialModal(false), 3000);
  };

  return (
    <footer className="relative border-t border-border bg-card-bg mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Contact Us
            </h3>
            <div className="space-y-2 text-secondary">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xl">📞</span>
                <a
                  href="tel:09264163675"
                  className="hover:text-primary transition-colors"
                >
                  09264163675
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xl">📍</span>
                <span>Calbayog City</span>
              </p>
              <p className="text-sm text-accent italic">
                Free delivery within Calbayog
              </p>
            </div>
          </div>

          {/* Social Media - Coming Soon */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-4">
              {socialIcons.map((social) => (
                <div key={social.name} className="relative group">
                  <button
                    onClick={handleSocialClick}
                    onMouseEnter={() => setHoveredIcon(social.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    className="text-3xl hover:scale-110 transition-transform cursor-pointer opacity-70 hover:opacity-100"
                    aria-label={`${social.name} - Coming Soon`}
                  >
                    {social.icon}
                  </button>
                  {/* Tooltip on hover */}
                  {hoveredIcon === social.name && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-md text-sm whitespace-nowrap z-10 shadow-lg">
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Modal notification */}
            {showSocialModal && (
              <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
                <p className="font-medium">🚀 Social media coming soon!</p>
                <p className="text-sm opacity-90">Stay tuned for updates</p>
              </div>
            )}
          </div>

          {/* About / Brand */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Luv&apos;s Charms
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Handmade with love ❤️
              <br />
              Unique jewelry & accessories
              <br />
              for every occasion
            </p>
          </div>
        </div>

        {/* Bottom Bar - Developer Credit */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} Luv&apos;s Charms. All rights
            reserved.
          </p>

          {/* Developer Credit */}
          <a
            href="https://github.com/MasuRii"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors group"
          >
            <span className="opacity-70 group-hover:opacity-100">
              Developed by
            </span>
            <div className="flex items-center gap-2">
              <Image
                src="https://avatars.githubusercontent.com/u/21298898?v=4"
                alt="MasuRii"
                width={24}
                height={24}
                className="rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all"
              />
              <span className="font-medium">MasuRii</span>
            </div>
          </a>
        </div>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}
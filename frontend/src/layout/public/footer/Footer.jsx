import FooterBrand from "./components/FooterBrand";

import FooterLinks from "./components/FooterLinks";

import FooterNewsletter from "./components/FooterNewsletter";

import FooterSocials from "./components/FooterSocials";

import FooterBottom from "./components/FooterBottom";

import { footerLinks } from "./constants/footerData";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-zinc-200
        bg-zinc-50
        px-6
        py-16
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            gap-16
            lg:grid-cols-[1.2fr_2fr]
          "
        >
          {/* LEFT */}
          <div className="space-y-8">
            <FooterBrand />

            <FooterSocials />

            <FooterNewsletter />
          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              gap-10
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {footerLinks.map((section, index) => (
              <FooterLinks
                key={index}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}

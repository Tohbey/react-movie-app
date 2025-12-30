import type { FooterProps } from "../Config";

export default function WebAppFooter({ footerConfig }: FooterProps) {
  console.log(footerConfig)
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About CineVault</h3>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Your ultimate destination for discovering movies and TV shows.
            Browse millions of titles, get personalized recommendations, and
            never miss what's trending.
          </p>
        </div>

        {footerConfig.map((section) => (
          <div className="footer-section" key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 CineVault. All rights reserved. Movie data provided by TMDB.
        </p>
      </div>
    </footer>
  );
}

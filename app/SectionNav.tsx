"use client";

import { sections } from "./sections";
import { useActiveSection } from "./useActiveSection";

export function MobileNav() {
  const active = useActiveSection();

  return (
    <nav className="mobile-nav" aria-label="Section navigation">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}

export function SidebarNav() {
  const active = useActiveSection();

  return (
    <aside className="nav" aria-label="Section navigation">
      <p className="brand">SEOVally</p>
      <p className="brand-sub">MCP Server Docs</p>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? "active" : ""}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

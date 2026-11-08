import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BRAND, FREE_DELIVERY_OVER, SHOP_URL } from "./data";
import { GUIDES } from "./guides";

/** Typed link targets, spread into <Link {...collLink("curl-care")} />. */
export const collLink = (handle: string) => ({ to: "/collections/$handle", params: { handle } }) as const;
export const prodLink = (handle: string) => ({ to: "/products/$handle", params: { handle } }) as const;
export const guideLink = (slug: string) => ({ to: "/guides/$slug", params: { slug } }) as const;
export const pageLink = (slug: string) => ({ to: "/pages/$slug", params: { slug } }) as const;

const STAR = "M32 8c2.2 14.6 9.4 21.8 24 24-14.6 2.2-21.8 9.4-24 24-2.2-14.6-9.4-21.8-24-24 14.6-2.2 21.8-9.4 24-24Z";

/** The Magic four-point star. `outline` draws a hairline version for large decorative use. */
export function Star({ className, outline = false }: { className?: string; outline?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {outline ? <path d={STAR} fill="none" stroke="currentColor" strokeWidth="0.35" /> : <path d={STAR} fill="currentColor" />}
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M3 10h13M11 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Magic Cosmetics home">
      <b>Magic</b>
      <i>
        <Star />
      </i>
      <small>Cosmetics</small>
    </Link>
  );
}

const NAV = [
  { label: "Curl care", link: collLink("curl-care") },
  { label: "Styling powder", link: collLink("styling-powder") },
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  return (
    <>
      <header className={`hdr${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <div className="hdr__in wrap">
          <Logo />
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.label} {...n.link}>
                {n.label}
              </Link>
            ))}
            <Link to="/guides">Guides</Link>
            <a href="/#barbers">For barbers</a>
            <Link {...pageLink("about")}>About</Link>
          </nav>
          <a className="cta-shop" href={SHOP_URL} data-cta="header-shop-now">
            Shop now
          </a>
          <button type="button" className="burger" aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            <span />
          </button>
        </div>
      </header>
      <nav id="mnav" className="mnav" aria-label="Mobile">
        <Link {...collLink("curl-care")} onClick={close}>
          Curl care
        </Link>
        <Link {...collLink("styling-powder")} onClick={close}>
          Styling powder
        </Link>
        <Link to="/guides" onClick={close}>
          Guides
        </Link>
        <a href="/#barbers" onClick={close}>
          For barbers
        </a>
        <Link {...pageLink("about")} onClick={close}>
          About
        </Link>
        <a className="cta-shop" href={SHOP_URL} data-cta="menu-shop-now">
          Shop now
        </a>
      </nav>
    </>
  );
}

/**
 * The Shop now button that floats on every page and at every scroll position.
 * Desktop: a small magnetic pull towards the pointer (transform only, off for reduced motion).
 */
export function FloatingCta({ href = SHOP_URL, label = "Shop now" }: { href?: string; label?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = Math.hypot(dx, dy) < 170 ? `translate(${(dx * 0.14).toFixed(1)}px, ${(dy * 0.14).toFixed(1)}px)` : "";
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a ref={ref} className="float-cta" href={href} rel="noopener" data-cta="float-shop-now">
      <span>{label}</span>
      <Arrow />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <Logo />
            <p>Curl care and styling powder from a UK brand, sold direct to you. Trusted by barbers.</p>
            {/* Standard Shopify newsletter form: works as soon as the store at SHOP_URL is live. */}
            <form className="news" method="post" action={`${SHOP_URL}/contact#contact_form`}>
              <input type="hidden" name="form_type" value="customer" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[tags]" value="newsletter" />
              <label className="sr" htmlFor="news-email">
                Email address
              </label>
              <div className="news__row">
                <input id="news-email" type="email" name="contact[email]" required autoComplete="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </div>
              <p className="news__fine">New products and offers. Unsubscribe at any time.</p>
            </form>
          </div>
          <nav aria-label="Shop">
            <h2>Shop</h2>
            <ul>
              <li>
                <Link {...collLink("curl-care")}>Curl care</Link>
              </li>
              <li>
                <Link {...collLink("styling-powder")}>Styling powder</Link>
              </li>
              <li>
                <a href={SHOP_URL} rel="noopener">
                  Visit the shop
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Learn">
            <h2>Learn</h2>
            <ul>
              <li>
                <Link to="/guides">All guides</Link>
              </li>
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link {...guideLink(g.slug)}>{g.title.split(/[:?(]/)[0].trim()}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              <li>
                <Link {...pageLink("about")}>About</Link>
              </li>
              <li>
                <Link {...pageLink("delivery")}>Delivery</Link>
              </li>
              <li>
                <Link {...pageLink("contact")}>Contact</Link>
              </li>
              <li>
                <a href="/#barbers">For barbers</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ftr__base">
          <span>
            © {new Date().getFullYear()} {BRAND.name}
          </span>
          <span>
            {BRAND.street}, {BRAND.locality} {BRAND.postcode}
          </span>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <span>UK delivery only. Free standard delivery over £{FREE_DELIVERY_OVER}.</span>
        </div>
      </div>
    </footer>
  );
}

/** Reveal-on-scroll for every `.rv` element: transform only, content is never hidden. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/** Page frame shared by every route: header, main, footer and the floating Shop now. */
export function Shell({ children, ctaHref, ctaLabel }: { children: ReactNode; ctaHref?: string; ctaLabel?: string }) {
  useReveal();
  return (
    <div className="mc">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingCta href={ctaHref} label={ctaLabel} />
    </div>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((it, i) => (
          <li key={it.name}>{it.href && i < items.length - 1 ? <a href={it.href}>{it.name}</a> : <span aria-current={i === items.length - 1 ? "page" : undefined}>{it.name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AccessibilityWidget.module.css";

/* ── Font size: 0 = normal, 1 = large (112%), 2 = larger (125%), 3 = largest (140%) */
type FontLevel = 0 | 1 | 2 | 3;

interface A11yState {
  fontLevel: FontLevel;
  grayscale: boolean;
  highContrast: boolean;
  negativeContrast: boolean;
  lightBackground: boolean;
  linksUnderline: boolean;
  readableFont: boolean;
}

const DEFAULT_STATE: A11yState = {
  fontLevel: 0,
  grayscale: false,
  highContrast: false,
  negativeContrast: false,
  lightBackground: false,
  linksUnderline: false,
  readableFont: false,
};

const STORAGE_KEY = "tmcwd-a11y-v2";

function load(): A11yState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_STATE;
}

function applyState(s: A11yState) {
  const root = document.documentElement;

  // Font level
  root.classList.remove("a11y-font-large", "a11y-font-larger", "a11y-font-largest");
  if (s.fontLevel === 1) root.classList.add("a11y-font-large");
  else if (s.fontLevel === 2) root.classList.add("a11y-font-larger");
  else if (s.fontLevel === 3) root.classList.add("a11y-font-largest");

  root.classList.toggle("a11y-grayscale",          s.grayscale);
  root.classList.toggle("a11y-high-contrast",      s.highContrast);
  root.classList.toggle("a11y-negative-contrast",  s.negativeContrast);
  root.classList.toggle("a11y-light-background",   s.lightBackground);
  root.classList.toggle("a11y-links-underline",    s.linksUnderline);
  root.classList.toggle("a11y-readable-font",      s.readableFont);
}

function save(s: A11yState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

/* ── SVG icons ────────────────────────────────────────────────────── */
function IconIncreaseText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700"
        fill="currentColor" stroke="none" fontFamily="Arial,sans-serif">A+</text>
    </svg>
  );
}
function IconDecreaseText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700"
        fill="currentColor" stroke="none" fontFamily="Arial,sans-serif">A-</text>
    </svg>
  );
}
function IconGrayscale() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="6" width="18" height="3" rx="1" />
      <rect x="3" y="11" width="18" height="3" rx="1" opacity=".6" />
      <rect x="3" y="16" width="18" height="3" rx="1" opacity=".3" />
    </svg>
  );
}
function IconHighContrast() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} />
      <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
    </svg>
  );
}
function IconNegativeContrast() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 3a9 9 0 0 1 0 18V3z" fill="none" stroke="currentColor"
        strokeWidth={0} style={{ fill: "var(--a11y-icon-bg, #fff)" }} />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} fill="none" />
      <path d="M12 3v18A9 9 0 0 0 12 3z"
        style={{ fill: "var(--a11y-icon-bg, #fff)" }} />
    </svg>
  );
}
function IconLightBackground() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" />
    </svg>
  );
}
function IconLinksUnderline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth={2} />
    </svg>
  );
}
function IconReadableFont() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 6h16M4 12h10M4 18h13" />
    </svg>
  );
}
function IconReset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 12a9 9 0 1 0 2.6-6.36L3 8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const panelRef   = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load saved preferences on mount
  useEffect(() => {
    const saved = load();
    setState(saved);
    applyState(saved);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    const onMouse = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        e.target !== triggerRef.current
      ) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouse);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouse);
    };
  }, [open]);

  function update(patch: Partial<A11yState>) {
    setState((prev) => {
      const next = { ...prev, ...patch };
      applyState(next);
      save(next);
      return next;
    });
  }

  function increaseText() {
    update({ fontLevel: Math.min(3, state.fontLevel + 1) as FontLevel });
  }
  function decreaseText() {
    update({ fontLevel: Math.max(0, state.fontLevel - 1) as FontLevel });
  }

  function resetAll() {
    setState(DEFAULT_STATE);
    applyState(DEFAULT_STATE);
    save(DEFAULT_STATE);
  }

  const isModified =
    state.fontLevel !== 0 ||
    state.grayscale ||
    state.highContrast ||
    state.negativeContrast ||
    state.lightBackground ||
    state.linksUnderline ||
    state.readableFont;

  return (
    <div className={styles.root}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility Tools"
          aria-modal="true"
          className={styles.panel}
        >
          {/* Header */}
          <div className={styles.panelHeader}>
            <div className={styles.panelIconWrap} aria-hidden="true">
              {/* Accessibility "person" icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                <circle cx="12" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M8 8.5h8M12 8.5v5m0 0-2.5 4m2.5-4 2.5 4" />
              </svg>
            </div>
            <span className={styles.panelTitle}>Accessibility Tools</span>
            <button
              type="button"
              aria-label="Close accessibility panel"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
              className={styles.closeBtn}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Option rows */}
          <ul className={styles.list} role="list">
            {/* Increase Text */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.fontLevel > 0 ? styles.rowActive : ""}`}
                onClick={increaseText}
                disabled={state.fontLevel >= 3}
                aria-label={`Increase text size (current level ${state.fontLevel} of 3)`}
              >
                <span className={styles.rowIcon}><IconIncreaseText /></span>
                <span className={styles.rowLabel}>Increase Text</span>
                {state.fontLevel > 0 && (
                  <span className={styles.badge} aria-hidden="true">+{state.fontLevel}</span>
                )}
              </button>
            </li>

            {/* Decrease Text */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.fontLevel > 0 ? styles.rowActive : ""}`}
                onClick={decreaseText}
                disabled={state.fontLevel <= 0}
                aria-label={`Decrease text size (current level ${state.fontLevel} of 3)`}
              >
                <span className={styles.rowIcon}><IconDecreaseText /></span>
                <span className={styles.rowLabel}>Decrease Text</span>
              </button>
            </li>

            <li role="separator" className={styles.divider} />

            {/* Grayscale */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.grayscale ? styles.rowActive : ""}`}
                onClick={() => update({ grayscale: !state.grayscale })}
                aria-pressed={state.grayscale}
              >
                <span className={styles.rowIcon}><IconGrayscale /></span>
                <span className={styles.rowLabel}>Grayscale</span>
                {state.grayscale && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            {/* High Contrast */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.highContrast ? styles.rowActive : ""}`}
                onClick={() => update({ highContrast: !state.highContrast })}
                aria-pressed={state.highContrast}
              >
                <span className={styles.rowIcon}><IconHighContrast /></span>
                <span className={styles.rowLabel}>High Contrast</span>
                {state.highContrast && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            {/* Negative Contrast */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.negativeContrast ? styles.rowActive : ""}`}
                onClick={() => update({ negativeContrast: !state.negativeContrast })}
                aria-pressed={state.negativeContrast}
              >
                <span className={styles.rowIcon}><IconNegativeContrast /></span>
                <span className={styles.rowLabel}>Negative Contrast</span>
                {state.negativeContrast && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            {/* Light Background */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.lightBackground ? styles.rowActive : ""}`}
                onClick={() => update({ lightBackground: !state.lightBackground })}
                aria-pressed={state.lightBackground}
              >
                <span className={styles.rowIcon}><IconLightBackground /></span>
                <span className={styles.rowLabel}>Light Background</span>
                {state.lightBackground && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            <li role="separator" className={styles.divider} />

            {/* Links Underline */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.linksUnderline ? styles.rowActive : ""}`}
                onClick={() => update({ linksUnderline: !state.linksUnderline })}
                aria-pressed={state.linksUnderline}
              >
                <span className={styles.rowIcon}><IconLinksUnderline /></span>
                <span className={styles.rowLabel}>Links Underline</span>
                {state.linksUnderline && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            {/* Readable Font */}
            <li>
              <button
                type="button"
                className={`${styles.row} ${state.readableFont ? styles.rowActive : ""}`}
                onClick={() => update({ readableFont: !state.readableFont })}
                aria-pressed={state.readableFont}
              >
                <span className={styles.rowIcon}><IconReadableFont /></span>
                <span className={styles.rowLabel}>Readable Font</span>
                {state.readableFont && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            </li>

            <li role="separator" className={styles.divider} />

            {/* Reset */}
            <li>
              <button
                type="button"
                className={styles.rowReset}
                onClick={resetAll}
                disabled={!isModified}
                aria-label="Reset all accessibility settings to default"
              >
                <span className={styles.rowIcon}><IconReset /></span>
                <span className={styles.rowLabel}>Reset</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={`${styles.trigger} ${isModified ? styles.triggerActive : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <circle cx="12" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 8.5h8M12 8.5v5m0 0-2.5 4m2.5-4 2.5 4" />
        </svg>
        {isModified && <span className={styles.dot} aria-hidden="true" />}
      </button>
    </div>
  );
}

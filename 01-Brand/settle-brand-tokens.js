/**
 * Settle — Brand Design Tokens
 * Source of truth for all colors, typography, spacing, and component styles.
 * Import this file in any screen or component.
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  // Core palette
  navy:     '#0a1628',  // Primary background / buttons
  amber:    '#c8a97a',  // Accent / highlights
  white:    '#ffffff',
  cream:    '#f7f4ee',  // Light background
  elec:     '#5b9ef5',  // Electric blue — links, info
  obsidian: '#111110',  // Darkest background
  success:  '#4aaa76',  // Confirmed / completed states
  alert:    '#c0503e',  // Errors / urgent states

  // Derived surfaces (dark mode)
  surface:         '#13203a',
  surfaceElevated: '#1a2d4a',
  border:          '#1e3355',
  borderBright:    '#2a4570',

  // Text
  text:      '#f0ece4',
  textMuted: 'rgba(240,236,228,0.55)',
  textDim:   'rgba(240,236,228,0.25)',

  // Semantic aliases
  primary:  '#0a1628',  // = navy
  accent:   '#c8a97a',  // = amber
  danger:   '#c0503e',  // = alert
  info:     '#5b9ef5',  // = elec

  // Tab bar
  tabBar: '#080f1e',
};

// ─── Typography ───────────────────────────────────────────────────────────────

export const fonts = {
  title:  'Sora_800ExtraBold',   // Titles — Sora 800
  body:   'DMSans_400Regular',   // Body — DM Sans 400
  bodySemiBold: 'DMSans_600SemiBold', // Body semibold — DM Sans 600
  label:  'DMMono_400Regular',   // Labels / code — DM Mono 400
};

export const fontSizes = {
  xs:   11,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  30,
  hero: 40,
};

export const lineHeights = {
  tight:  1.2,
  normal: 1.5,
  loose:  1.75,
};

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

// ─── Border radius ────────────────────────────────────────────────────────────

export const radius = {
  card:   16,  // Cards
  button: 12,  // Buttons
  small:  8,
  pill:   999,
  xs:     4,
};

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    shadowColor: '#c8a97a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
};

// ─── Component tokens ─────────────────────────────────────────────────────────

export const components = {
  // Primary button — dark navy background
  buttonPrimary: {
    backgroundColor: colors.navy,
    color: colors.white,
    borderRadius: radius.button,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },

  // Accent button — amber background
  buttonAccent: {
    backgroundColor: colors.amber,
    color: '#000000',
    borderRadius: radius.button,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },

  // Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  // Badge — success
  badgeSuccess: {
    backgroundColor: 'rgba(74,170,118,0.15)',
    color: colors.success,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  // Badge — alert
  badgeAlert: {
    backgroundColor: 'rgba(192,80,62,0.15)',
    color: colors.alert,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  // Badge — amber
  badgeAmber: {
    backgroundColor: 'rgba(200,169,122,0.15)',
    color: colors.amber,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
};

// ─── Status colors ────────────────────────────────────────────────────────────

export const statusColors = {
  booked:   { bg: 'rgba(200,169,122,0.15)', text: colors.amber },
  active:   { bg: 'rgba(74,170,118,0.15)',  text: colors.success },
  alert:    { bg: 'rgba(192,80,62,0.15)',   text: colors.alert },
  pending:  { bg: 'rgba(91,158,245,0.15)',  text: colors.elec },
  included: { bg: 'rgba(91,158,245,0.12)',  text: colors.elec },
};

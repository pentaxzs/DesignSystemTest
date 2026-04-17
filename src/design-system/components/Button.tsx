'use client';

/**
 * Button — Filled Button
 * Source: components/button.json (figmaNodeId: 57994:2227)
 *
 * Props match button.json exactly:
 *   size:  XSmall | Small | Medium | Large | XLarge  (default: Medium)
 *   shape: Round | Square                             (default: Round)
 *   showIcon: boolean                                 (default: false)
 *   state: handled via CSS (hover/focus/active/disabled)
 */

import React from 'react';

export type ButtonSize  = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type ButtonShape = 'Round' | 'Square';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
}

/* ─── Size config (from button.json → sizes) ─── */
const SIZE: Record<ButtonSize, {
  height: string;
  px: string;
  pxIcon: string;
  iconPx: number;
  gap: string;
  text: string;
  leading: string;
  radius: Record<ButtonShape, string>;
}> = {
  XSmall: {
    height:  'h-6',
    px:      'px-3',
    pxIcon:  'px-[10px]',
    iconPx:  12,
    gap:     'gap-1',
    text:    'text-[10px]',
    leading: 'leading-[14px]',
    radius:  { Round: 'rounded-xl',   Square: 'rounded-[4px]'  },
  },
  Small: {
    height:  'h-8',
    px:      'px-4',
    pxIcon:  'px-3',
    iconPx:  16,
    gap:     'gap-1.5',
    text:    'text-[12px]',
    leading: 'leading-[16px]',
    radius:  { Round: 'rounded-2xl',  Square: 'rounded-[6px]'  },
  },
  Medium: {
    height:  'h-10',
    px:      'px-6',
    pxIcon:  'px-4',
    iconPx:  18,
    gap:     'gap-2',
    text:    'text-[14px]',
    leading: 'leading-[20px]',
    radius:  { Round: 'rounded-[20px]', Square: 'rounded-lg'   },
  },
  Large: {
    height:  'h-14',
    px:      'px-8',
    pxIcon:  'px-6',
    iconPx:  20,
    gap:     'gap-2',
    text:    'text-[16px]',
    leading: 'leading-[24px]',
    radius:  { Round: 'rounded-[28px]', Square: 'rounded-xl'   },
  },
  XLarge: {
    height:  'h-[72px]',
    px:      'px-10',
    pxIcon:  'px-8',
    iconPx:  24,
    gap:     'gap-2.5',
    text:    'text-[20px]',
    leading: 'leading-[28px]',
    radius:  { Round: 'rounded-[36px]', Square: 'rounded-2xl'  },
  },
};

export function Button({
  label,
  icon,
  showIcon = false,
  size  = 'Medium',
  shape = 'Round',
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) {
  const s       = SIZE[size];
  const hasIcon = showIcon && !!icon;
  const radius  = s.radius[shape];
  const px      = hasIcon ? s.pxIcon : s.px;

  return (
    <button
      disabled={disabled}
      className={[
        /* layout */
        'group relative inline-flex items-center justify-center overflow-hidden',
        'select-none font-medium tracking-[0.1px] transition-shadow duration-200',
        /* size */
        s.height, px, s.gap, s.text, s.leading, radius,
        /* colors & shadow — enabled vs disabled */
        disabled
          ? 'bg-[rgba(29,27,32,0.12)] text-[rgba(29,27,32,0.38)] cursor-not-allowed'
          : 'bg-primary text-on-primary cursor-pointer group-hover:shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)]',
        /* focus ring (accessibility) */
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* State layer — Hovered 8%, Focused/Pressed 10% */}
      {!disabled && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-0 bg-on-primary',
            'opacity-0 transition-opacity duration-200',
            'group-hover:opacity-[0.08]',
            'group-focus:opacity-[0.10]',
            'group-active:opacity-[0.10]',
          ].join(' ')}
        />
      )}

      {/* Icon slot */}
      {hasIcon && (
        <span
          aria-hidden="true"
          className="relative z-10 flex-shrink-0 flex items-center justify-center"
          style={{ width: s.iconPx, height: s.iconPx }}
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

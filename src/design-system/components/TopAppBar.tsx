'use client';

/**
 * TopAppBar
 * Source: components/topAppBar.json (figmaNodeId: 58114:20521)
 *
 * configuration:
 *   Small-centered — 64px, title centered, leading menu, 1 trailing icon
 *   Small          — 64px, title left, leading arrow_back, 1 trailing icon
 *   Medium         — 112px (2-row), headline/small title
 *   Large          — 120px (2-row), headline/medium title
 *   Search         — 64px, search bar replacing title
 *
 * elevation:
 *   Flat      — transparent bg
 *   On-scroll — bg-surface-container
 */

import React from 'react';
import { Icon, IconName } from '@/design-system/icons';

export type TopAppBarConfig    = 'Small-centered' | 'Small' | 'Small-image' | 'Medium' | 'Large' | 'Search';
export type TopAppBarElevation = 'Flat' | 'On-scroll';

export interface TopAppBarProps {
  configuration?: TopAppBarConfig;
  elevation?: TopAppBarElevation;
  title?: string;
  leadingIcon?: IconName | 'none';
  trailingIcons?: IconName[];
  searchPlaceholder?: string;
  onLeadingClick?: () => void;
  onTrailingClick?: (icon: IconName, index: number) => void;
  className?: string;
}

/* ─── Icon Button — 48px touch target, 24px icon ─── */
function NavIconBtn({
  icon,
  onClick,
}: {
  icon: IconName;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08] group-active:opacity-[0.10]"
      />
      <Icon name={icon} size={24} className="relative z-10" />
    </button>
  );
}

/* ─── Single-row (Small variants) ─── */
function SmallBar({
  configuration,
  elevation,
  title,
  leadingIcon,
  trailingIcons = [],
  searchPlaceholder,
  onLeadingClick,
  onTrailingClick,
  className,
}: TopAppBarProps) {
  const isSearch   = configuration === 'Search';
  const isCentered = configuration === 'Small-centered';
  const bgClass    = elevation === 'On-scroll' ? 'bg-surface-container' : 'bg-transparent';

  return (
    <header
      className={[
        'w-full h-16 px-1 flex items-center gap-1',
        bgClass,
        className,
      ].join(' ')}
    >
      {/* Leading icon */}
      {leadingIcon && leadingIcon !== 'none' && (
        <NavIconBtn icon={leadingIcon} onClick={onLeadingClick} />
      )}

      {/* Middle area */}
      {isSearch ? (
        /* Search bar — h-14, rounded-full, bg-surface-container-highest */
        <div className="flex-1 flex items-center h-14 px-4 rounded-full bg-surface-container-highest text-on-surface-variant">
          <Icon name="search" size={24} className="flex-shrink-0 mr-3" />
          <span className="text-body-lg">{searchPlaceholder ?? 'Search'}</span>
        </div>
      ) : (
        <div className={['flex-1 px-3', isCentered ? 'text-center' : 'text-left'].join(' ')}>
          <span className="text-title-lg font-normal text-on-surface">{title}</span>
        </div>
      )}

      {/* Trailing icons */}
      {trailingIcons.map((icon, i) => (
        <NavIconBtn
          key={icon}
          icon={icon}
          onClick={() => onTrailingClick?.(icon, i)}
        />
      ))}
    </header>
  );
}

/* ─── Two-row (Medium / Large) ─── */
function TallBar({
  configuration,
  elevation,
  title,
  leadingIcon,
  trailingIcons = [],
  onLeadingClick,
  onTrailingClick,
  className,
}: TopAppBarProps) {
  const isLarge   = configuration === 'Large';
  const totalH    = isLarge ? 'h-[120px]' : 'h-[112px]';
  const titleClass = isLarge ? 'text-headline-md' : 'text-headline-sm';
  const bgClass    = elevation === 'On-scroll' ? 'bg-surface-container' : 'bg-transparent';

  return (
    <header className={['w-full flex flex-col', totalH, bgClass, className].join(' ')}>
      {/* Top row — 64px */}
      <div className="flex items-center gap-1 h-16 px-1 pt-2 pb-2">
        {leadingIcon && leadingIcon !== 'none' && (
          <NavIconBtn icon={leadingIcon} onClick={onLeadingClick} />
        )}
        <div className="flex-1" />
        {trailingIcons.map((icon, i) => (
          <NavIconBtn
            key={icon}
            icon={icon}
            onClick={() => onTrailingClick?.(icon, i)}
          />
        ))}
      </div>

      {/* Bottom row — title */}
      <div className="px-4 pb-5">
        <span className={[titleClass, 'font-normal text-on-surface'].join(' ')}>
          {title}
        </span>
      </div>
    </header>
  );
}

/* ─── Unified export ─── */
export function TopAppBar(props: TopAppBarProps) {
  const { configuration = 'Small-centered' } = props;

  if (configuration === 'Medium' || configuration === 'Large') {
    return <TallBar {...props} />;
  }
  return <SmallBar {...props} />;
}

'use client';

/**
 * Card — Outlined / Elevated / Filled
 * Source: components/cards.json (figmaNodeId: 55412:13979)
 *
 * orientation="Stacked"   : Media → Header → Content → Actions (vertical)
 * orientation="Horizontal": Avatar + Title/Subhead + TrailingIcon (80px)
 */

import React from 'react';
import { Icon } from '@/design-system/icons';

export type CardStyle       = 'Outlined' | 'Elevated' | 'Filled';
export type CardOrientation = 'Stacked' | 'Horizontal';

/* ─── Shared sub-types ─── */
export interface CardAction {
  label: string;
  onClick?: () => void;
}

/* ─── Stacked props ─── */
export interface StackedCardProps {
  orientation: 'Stacked';
  style?: CardStyle;
  /** 188px media placeholder area */
  media?: React.ReactNode;
  /** 40px circular avatar */
  avatar?: React.ReactNode;
  title?: string;
  subhead?: string;
  body?: string;
  secondaryAction?: CardAction;
  primaryAction?: CardAction;
  className?: string;
}

/* ─── Horizontal props ─── */
export interface HorizontalCardProps {
  orientation: 'Horizontal';
  style?: CardStyle;
  avatar?: React.ReactNode;
  title?: string;
  subhead?: string;
  className?: string;
}

export type CardProps = StackedCardProps | HorizontalCardProps;

/* ─── Style → Tailwind ─── */
const STYLE_CLASS: Record<CardStyle, string> = {
  Outlined: 'bg-surface border border-outline-variant shadow-none',
  Elevated: 'bg-surface-container-low border-none shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]',
  Filled:   'bg-surface-container-highest border-none shadow-none',
};

/* ─── Icon button (48×48, icon 24) ─── */
function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors">
      {children}
    </button>
  );
}

/* ─── Stacked Card ─── */
function StackedCard({
  style = 'Outlined',
  media,
  avatar,
  title,
  subhead,
  body,
  secondaryAction,
  primaryAction,
  className = '',
}: StackedCardProps) {
  return (
    <div
      className={[
        'group relative flex flex-col w-full rounded-xl overflow-hidden',
        STYLE_CLASS[style],
        /* state layer on hover/press */
        'cursor-pointer',
        className,
      ].join(' ')}
    >
      {/* State layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08] group-active:opacity-[0.10]"
      />

      {/* Header — 72px */}
      {(avatar || title || subhead) && (
        <div className="relative z-10 flex items-center gap-3 h-[72px] px-4">
          {avatar && (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high">
              {avatar}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title   && <p className="text-title-md font-medium text-on-surface truncate">{title}</p>}
            {subhead && <p className="text-body-md text-on-surface-variant truncate">{subhead}</p>}
          </div>
          <IconBtn>
            <Icon name="more_horiz" size={24} />
          </IconBtn>
        </div>
      )}

      {/* Media — 188px */}
      {media && (
        <div className="relative z-10 h-[188px] w-full bg-surface-container-high overflow-hidden">
          {media}
        </div>
      )}

      {/* Content */}
      {body && (
        <div className="relative z-10 px-4 pt-4 pb-4">
          <p className="text-body-md text-on-surface-variant">{body}</p>
        </div>
      )}

      {/* Actions — right-aligned */}
      {(secondaryAction || primaryAction) && (
        <div className="relative z-10 flex items-center justify-end gap-2 px-4 pb-4">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="h-10 px-6 rounded-[20px] text-label-lg font-medium text-primary hover:bg-primary/8 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="h-10 px-6 rounded-[20px] text-label-lg font-medium bg-primary text-on-primary hover:shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)] transition-shadow"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Horizontal Card ─── */
function HorizontalCard({
  style = 'Outlined',
  avatar,
  title,
  subhead,
  className = '',
}: HorizontalCardProps) {
  return (
    <div
      className={[
        'group relative flex items-center gap-4 h-20 w-full rounded-xl px-4',
        STYLE_CLASS[style],
        'cursor-pointer overflow-hidden',
        className,
      ].join(' ')}
    >
      {/* State layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08] group-active:opacity-[0.10]"
      />

      {avatar && (
        <div className="relative z-10 w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high">
          {avatar}
        </div>
      )}

      <div className="relative z-10 flex-1 min-w-0">
        {title   && <p className="text-title-md font-medium text-on-surface truncate">{title}</p>}
        {subhead && <p className="text-body-md text-on-surface-variant truncate">{subhead}</p>}
      </div>

      <div className="relative z-10 text-on-surface-variant">
        <Icon name="arrow_forward" size={24} />
      </div>
    </div>
  );
}

/* ─── Unified export ─── */
export function Card(props: CardProps) {
  if (props.orientation === 'Horizontal') return <HorizontalCard {...props} />;
  return <StackedCard {...props} />;
}

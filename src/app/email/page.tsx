'use client';

/**
 * Email App — Home Screen (AI-powered)
 *
 * Pattern:  home-mobile.json (adapted for email context)
 * Components:
 *   - TopAppBar  → Small, Flat  (topAppBar.json)
 *   - AI Summary → Card Elevated slot layout  (cards.json)
 *   - Button     → Small Round  (button.json)
 *   - Tabs       → Primary, Fixed, Label only  (tabs.json)
 *   - Email list → Horizontal card spec  (cards.json / horizontalMediaText)
 *   - NavigationBar, GestureBar  (home-mobile.json)
 *
 * Tokens: sys.light.* from tokens/color.json
 * Typography: typescale from tokens/typography.json
 * Icons: icons/icons.json
 */

import { useState } from 'react';
import { TopAppBar } from '@/design-system/components/TopAppBar';
import { Button } from '@/design-system/components/Button';
import { Icon } from '@/design-system/icons';

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */

const AI_SUMMARY = {
  label: 'AI Summary',
  date: 'Today, Apr 16',
  text: 'You have 3 urgent messages — a contract approval from Legal, a deadline reminder from Design, and a meeting invite from Emily. 12 newsletters and 4 order confirmations require no action.',
  highlights: [
    { tag: 'Urgent', count: 3, color: 'text-error bg-error-container' },
    { tag: 'To-do', count: 2, color: 'text-primary bg-primary-container' },
    { tag: 'FYI', count: 16, color: 'text-on-surface-variant bg-surface-container-highest' },
  ],
};

type TabId = 'all' | 'unread' | 'starred';
const TABS: { id: TabId; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'unread',  label: 'Unread' },
  { id: 'starred', label: 'Starred' },
];

interface Email {
  id: number;
  sender: string;
  initial: string;
  avatarColor: string;
  subject: string;
  snippet: string;
  time: string;
  unread: boolean;
  starred: boolean;
  tag?: string;
}

const EMAILS: Email[] = [
  {
    id: 1,
    sender: 'Legal Team',
    initial: 'L',
    avatarColor: 'bg-error-container text-on-error-container',
    subject: 'Contract approval needed',
    snippet: 'Please review and sign the attached agreement before EOD Friday.',
    time: '10:42 AM',
    unread: true,
    starred: true,
    tag: 'Urgent',
  },
  {
    id: 2,
    sender: 'Emily Chen',
    initial: 'E',
    avatarColor: 'bg-tertiary-container text-on-tertiary-container',
    subject: 'Q2 Design Review — Meeting invite',
    snippet: 'Hi! Can you join us Thursday at 3 PM to go over the new mockups?',
    time: '9:15 AM',
    unread: true,
    starred: false,
    tag: 'To-do',
  },
  {
    id: 3,
    sender: 'Design System',
    initial: 'D',
    avatarColor: 'bg-primary-container text-on-primary-container',
    subject: 'Deadline reminder: Figma handoff',
    snippet: 'This is a reminder that the Figma handoff is due tomorrow at noon.',
    time: '8:00 AM',
    unread: true,
    starred: false,
    tag: 'Urgent',
  },
  {
    id: 4,
    sender: 'GitHub',
    initial: 'G',
    avatarColor: 'bg-surface-container-highest text-on-surface',
    subject: '[PR #142] Design token sync merged',
    snippet: 'Your pull request has been successfully merged into main.',
    time: 'Yesterday',
    unread: false,
    starred: false,
  },
  {
    id: 5,
    sender: 'Notion',
    initial: 'N',
    avatarColor: 'bg-surface-container-highest text-on-surface',
    subject: 'Weekly digest — Apr 8–14',
    snippet: '5 pages updated in your workspace this week. See what changed.',
    time: 'Yesterday',
    unread: false,
    starred: true,
  },
  {
    id: 6,
    sender: 'Finance',
    initial: 'F',
    avatarColor: 'bg-secondary-container text-on-secondary-container',
    subject: 'Your invoice is ready',
    snippet: 'Invoice #1089 for April has been generated. Amount due: $2,400.',
    time: 'Mon',
    unread: false,
    starred: false,
  },
];

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════ */

/** AI Summary Card — Elevated card (cards.json), slot layout, primaryContainer bg */
function AiSummaryCard({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    /* Elevated card: bg-surface-container-low, shadow level1, rounded-xl */
    <div className="mx-4 rounded-xl bg-surface-container-low shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] overflow-hidden">

      {/* Card header slot — 72px, paddingHorizontal 16 (cards.json / stackedMediaText.header) */}
      <div className="flex items-center gap-3 h-[72px] px-4">
        {/* AI avatar — primary-container circle */}
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
          {/* sparkle-style star icon from icons.json: star_filled */}
          <Icon name="star_filled" size={20} className="text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          {/* title/medium (cards.json contentSlots.header.title) */}
          <p className="text-title-md font-medium text-on-surface">{AI_SUMMARY.label}</p>
          {/* body/medium (cards.json contentSlots.header.subhead) */}
          <p className="text-body-md text-on-surface-variant">{AI_SUMMARY.date}</p>
        </div>

        <button
          onClick={onToggle}
          className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors"
        >
          <Icon name="more_horiz" size={24} />
        </button>
      </div>

      {/* Content slot — paddingHorizontal 16, paddingTop 0, paddingBottom 16 */}
      <div className="px-4 pb-4 flex flex-col gap-3">

        {/* Tag chips — highlight counts */}
        <div className="flex gap-2">
          {AI_SUMMARY.highlights.map((h) => (
            <span
              key={h.tag}
              className={[
                'inline-flex items-center gap-1 px-2 h-6 rounded-full',
                'text-label-sm font-medium',
                h.color,
              ].join(' ')}
            >
              {h.tag} · {h.count}
            </span>
          ))}
        </div>

        {/* Summary text — body/medium (cards.json contentSlots.content.body) */}
        <p
          className={[
            'text-body-md text-on-surface-variant leading-5 transition-all',
            expanded ? '' : 'line-clamp-2',
          ].join(' ')}
        >
          {AI_SUMMARY.text}
        </p>

        {/* Actions row — cards.json contentSlots.actions, right-aligned, gap 8 */}
        <div className="flex items-center justify-end gap-2 pt-1">
          {/* secondary action — text button (label/large, primary color) */}
          <button
            onClick={onToggle}
            className="h-8 px-4 rounded-2xl text-label-lg font-medium text-primary hover:bg-primary/8 transition-colors"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
          {/* primary action — Button Small Round (button.json) */}
          <Button size="Small" label="View all" />
        </div>
      </div>
    </div>
  );
}

/** Primary Tabs — tabs.json: Primary, Fixed, Label only, h-12, indicator 3px, rounded top */
function PrimaryTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    /* container: bg-surface, full width — tabs.json colors.Primary.containerValue */
    <div className="flex bg-surface border-b border-outline-variant/40">
      {TABS.map((tab) => {
        const isSelected = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              /* tab item: flex-1, h-12, min-w-12, px-4 — tabs.json layout.Fixed */
              'group relative flex flex-1 items-center justify-center h-12 px-4 min-w-[48px]',
              'overflow-hidden transition-colors',
              /* typography: title/small (tabs.json typography.label → title/small) */
              'text-title-sm font-medium tracking-[0.1px]',
              isSelected ? 'text-primary' : 'text-on-surface-variant',
            ].join(' ')}
          >
            {/* State layer */}
            <span
              aria-hidden="true"
              className={[
                'pointer-events-none absolute inset-0 opacity-0 transition-opacity',
                'group-hover:opacity-[0.08] group-active:opacity-[0.10]',
                isSelected ? 'bg-primary' : 'bg-on-surface',
              ].join(' ')}
            />

            <span className="relative z-10">{tab.label}</span>

            {/* Indicator — 3px, rounded top corners, primary color (tabs.json styles.Primary.indicator) */}
            {isSelected && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-[3px] bg-primary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Sender Avatar — 40px circle, initial letter */
function SenderAvatar({ initial, colorClass }: { initial: string; colorClass: string }) {
  return (
    <div
      className={[
        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
        'text-title-sm font-medium',
        colorClass,
      ].join(' ')}
    >
      {initial}
    </div>
  );
}

/** Email List Item — Horizontal card spec (cards.json / horizontalMediaText)
 *  h-[80px], paddingHorizontal 16, avatar 40px, title/medium, body/medium, trailing 24px
 */
function EmailItem({ email, onStar }: { email: Email; onStar: (id: number) => void }) {
  return (
    <div className="group relative flex items-center gap-4 h-20 px-4 bg-surface cursor-pointer overflow-hidden">
      {/* State layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08] group-active:opacity-[0.10]"
      />

      {/* Sender avatar (cards.json horizontalMediaText.avatar: size 40, cornerRadius 20) */}
      <SenderAvatar initial={email.initial} colorClass={email.avatarColor} />

      {/* Content area */}
      <div className="relative z-10 flex-1 min-w-0 py-3">
        {/* Subject — title/medium (cards.json horizontalMediaText.title) */}
        <p
          className={[
            'text-title-md text-on-surface truncate leading-6',
            email.unread ? 'font-medium' : 'font-normal',
          ].join(' ')}
        >
          {/* Unread dot */}
          {email.unread && (
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 mb-[1px] align-middle" />
          )}
          {email.subject}
        </p>

        {/* Sender + snippet — body/medium (cards.json horizontalMediaText.subhead) */}
        <p className="text-body-md text-on-surface-variant truncate leading-5">
          {email.sender} · {email.snippet}
        </p>
      </div>

      {/* Trailing meta — time + star (cards.json horizontalMediaText.trailingIcon: size 24) */}
      <div className="relative z-10 flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-body-sm text-on-surface-variant">{email.time}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onStar(email.id); }}
          className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon
            name={email.starred ? 'star_filled' : 'star'}
            size={18}
            className={email.starred ? 'text-primary' : ''}
          />
        </button>
      </div>
    </div>
  );
}

/** Navigation Bar — home-mobile.json: h-64, 3 items, secondaryContainer pill */
function NavigationBar({ active }: { active: number }) {
  const items = [
    { icon: 'mail_filled' as const, label: 'Inbox' },
    { icon: 'search' as const,      label: 'Search' },
    { icon: 'person' as const,      label: 'Profile' },
  ];
  return (
    <nav
      className="flex items-stretch flex-shrink-0"
      style={{ height: 64, backgroundColor: 'var(--m3-surface-container)' }}
    >
      {items.map((item, i) => {
        const isSelected = i === active;
        return (
          <button
            key={item.label}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5"
          >
            {/* Icon container — 56×32, cornerRadius 16 (home-mobile.json navigationBar.item.iconContainer) */}
            <div
              className={[
                'flex items-center justify-center w-14 h-8 rounded-2xl transition-colors',
                isSelected ? 'bg-secondary-container' : '',
              ].join(' ')}
            >
              <Icon
                name={item.icon}
                size={24}
                className={isSelected ? 'text-on-surface' : 'text-on-surface-variant'}
              />
            </div>
            {/* label/medium — home-mobile.json navigationBar.item.label */}
            <span
              className={[
                'text-label-md font-medium',
                isSelected ? 'text-secondary' : 'text-on-surface-variant',
              ].join(' ')}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/** Gesture Bar — home-mobile.json: h-24, handle 108×4 */
function GestureBar() {
  return (
    <div className="flex items-center justify-center h-6 flex-shrink-0 bg-surface-container">
      <div className="w-[108px] h-1 rounded-full bg-on-surface opacity-20" />
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default function EmailHomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [emails, setEmails] = useState<Email[]>(EMAILS);

  const handleStar = (id: number) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    );
  };

  const filteredEmails = emails.filter((e) => {
    if (activeTab === 'unread') return e.unread;
    if (activeTab === 'starred') return e.starred;
    return true;
  });

  return (
    /* Mobile frame — home-mobile.json page spec: 412×1788, border 8px #CAC4D0, radius 28 */
    <div className="min-h-screen bg-neutral-200 flex items-start justify-center py-8">
      <div
        className="relative flex flex-col bg-surface overflow-hidden"
        style={{
          width: 412,
          minHeight: 812,
          borderRadius: 28,
          border: '8px solid #CAC4D0',
        }}
      >
        {/* ── Status Bar — home-mobile.json statusBar: h-52, paddingH 24 ── */}
        <div className="flex items-center justify-between h-[52px] px-6 bg-surface flex-shrink-0">
          <span className="text-[14px] font-medium text-on-surface tracking-[0.14px]">9:41</span>
          <div className="flex gap-1 text-on-surface">
            <Icon name="notifications" size={16} />
          </div>
        </div>

        {/* ── Top App Bar — Small, Flat (topAppBar.json) ── */}
        <TopAppBar
          configuration="Small"
          title="Inbox"
          leadingIcon="menu_open"
          trailingIcons={['search', 'more_horiz']}
        />

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* AI Summary Card — cards.json Elevated + slot layout */}
          <div className="py-4">
            <AiSummaryCard
              expanded={summaryExpanded}
              onToggle={() => setSummaryExpanded((v) => !v)}
            />
          </div>

          {/* Primary Tabs — tabs.json: Primary, Fixed, Label only */}
          <PrimaryTabs active={activeTab} onChange={setActiveTab} />

          {/* Email list — Horizontal card spec (cards.json) */}
          <div className="flex flex-col divide-y divide-outline-variant/30">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <EmailItem key={email.id} email={email} onStar={handleStar} />
              ))
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-8">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center">
                  <Icon name="inbox" size={32} className="text-on-surface-variant" />
                </div>
                <p className="text-title-md font-medium text-on-surface">All caught up</p>
                <p className="text-body-md text-on-surface-variant">
                  No emails in this category right now.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* ── Navigation Bar — home-mobile.json navigationBar ── */}
        <NavigationBar active={0} />
        <GestureBar />
      </div>
    </div>
  );
}

'use client';

/**
 * AI Search App — Home Screen
 *
 * Pattern:  home-mobile.json (adapted for search context)
 * Components:
 *   - TopAppBar    → Search configuration  (topAppBar.json)
 *   - Cards        → Elevated, Stacked     (cards.json)
 *   - Tabs         → Primary Fixed         (tabs.json)
 *
 * Tokens: sys.light.* — tokens/color.json
 * Typography: typescale — tokens/typography.json
 * Icons: icons/icons.json
 */

import { useState } from 'react';
import { Icon } from '@/design-system/icons';

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */

type TabId = 'all' | 'images' | 'videos' | 'news';
const TABS: { id: TabId; label: string }[] = [
  { id: 'all',    label: 'All'    },
  { id: 'images', label: 'Images' },
  { id: 'videos', label: 'Videos' },
  { id: 'news',   label: 'News'   },
];

const AI_FEATURES = [
  { icon: 'image'      as const, label: 'Lens',      sub: 'Search by image', color: 'bg-primary-container text-primary'           },
  { icon: 'mic_filled' as const, label: 'Voice',     sub: 'Say something',   color: 'bg-error-container text-error'               },
  { icon: 'g_translate'as const, label: 'Translate', sub: 'AI translation',  color: 'bg-secondary-container text-secondary'       },
  { icon: 'location_on'as const, label: 'Near me',   sub: 'Local results',   color: 'bg-tertiary-container text-on-tertiary-container' },
];

const RECENT_SEARCHES = [
  { query: 'Material Design 3 guidelines', time: '2 min ago'  },
  { query: 'Next.js 16 app router',        time: '1 hour ago' },
  { query: 'Figma design system',          time: 'Yesterday'  },
];

const TRENDING = [
  { topic: 'AI Image Generation',  category: 'Technology' },
  { topic: 'Design System 2025',   category: 'Design'     },
  { topic: 'Mobile UX Trends',     category: 'UX'         },
  { topic: 'React Server Components', category: 'Dev'     },
];

const RESULTS = [
  {
    title:   'Material Design 3 — Google',
    url:     'material.io › design',
    snippet: "Material Design is Google's open-source design system. Build beautiful, usable products faster with our components and guidance.",
    tag:     'Official',
    icon:    'language' as const,
  },
  {
    title:   'AI-Powered Search: How It Works',
    url:     'blog.example.com › ai-search',
    snippet: 'Modern search engines leverage AI to understand natural language queries, provide contextual results, and surface the most relevant content.',
    tag:     'Article',
    icon:    'language' as const,
  },
  {
    title:   'Figma — The Collaborative Interface Design Tool',
    url:     'figma.com',
    snippet: 'Build better products as a team. Design, prototype, and gather feedback all in one place with Figma.',
    tag:     'Tool',
    icon:    'language' as const,
  },
];

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════ */

/** Search bar — TopAppBar Search config (topAppBar.json: Search, h-64) */
function SearchBar({ query, onFocus }: { query: string; onFocus?: () => void }) {
  return (
    <div className="px-4 py-2 bg-surface">
      {/* Search input — h-14, rounded-full, bg-surface-container-highest */}
      <div
        className="flex items-center h-14 px-4 gap-3 rounded-full bg-surface-container-highest cursor-text"
        onClick={onFocus}
      >
        <Icon name="search" size={24} className="text-on-surface-variant flex-shrink-0" />
        <span className={['flex-1 text-body-lg', query ? 'text-on-surface' : 'text-on-surface-variant'].join(' ')}>
          {query || 'Search or ask anything…'}
        </span>
        {/* Mic + Lens inline */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-on-surface/8 transition-colors text-on-surface-variant">
            <Icon name="mic_filled" size={22} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-on-surface/8 transition-colors text-on-surface-variant">
            <Icon name="image" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** AI Feature grid — 4 tonal shortcut buttons */
function AiFeatureRow() {
  return (
    <section className="px-4 py-4 bg-surface">
      <div className="grid grid-cols-4 gap-3">
        {AI_FEATURES.map((f) => (
          <button
            key={f.label}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Tonal icon container — 56px circle */}
            <div
              className={[
                'w-14 h-14 rounded-full flex items-center justify-center',
                'transition-opacity group-hover:opacity-80',
                f.color,
              ].join(' ')}
            >
              <Icon name={f.icon} size={24} />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-label-md font-medium text-on-surface">{f.label}</span>
              <span className="text-label-sm text-on-surface-variant text-center leading-4">{f.sub}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/** Filter tabs — tabs.json: Primary, Fixed, Label only */
function FilterTabs({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div className="flex bg-surface border-b border-outline-variant/40">
      {TABS.map((tab) => {
        const isSelected = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              'group relative flex flex-1 items-center justify-center h-12 px-3 min-w-[48px] overflow-hidden transition-colors',
              'text-title-sm font-medium tracking-[0.1px]',
              isSelected ? 'text-primary' : 'text-on-surface-variant',
            ].join(' ')}
          >
            <span
              aria-hidden="true"
              className={[
                'pointer-events-none absolute inset-0 opacity-0 transition-opacity',
                'group-hover:opacity-[0.08] group-active:opacity-[0.10]',
                isSelected ? 'bg-primary' : 'bg-on-surface',
              ].join(' ')}
            />
            <span className="relative z-10">{tab.label}</span>
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

/** Trending topic item */
function TrendingItem({ topic, category, rank }: { topic: string; category: string; rank: number }) {
  return (
    <div className="group relative flex items-center gap-3 h-14 px-4 cursor-pointer overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08]"
      />
      {/* Rank */}
      <span className="w-6 text-body-lg font-medium text-on-surface-variant text-center flex-shrink-0">{rank}</span>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-body-lg text-on-surface truncate">{topic}</p>
        <p className="text-body-sm text-on-surface-variant">{category}</p>
      </div>
      {/* Arrow */}
      <Icon name="arrow_forward" size={18} className="text-on-surface-variant flex-shrink-0" />
    </div>
  );
}

/** Recent search item */
function RecentItem({ query, time, onRemove }: { query: string; time: string; onRemove: () => void }) {
  return (
    <div className="group relative flex items-center gap-3 h-14 px-4 cursor-pointer overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-on-surface opacity-0 transition-opacity group-hover:opacity-[0.08]"
      />
      <Icon name="schedule" size={20} className="text-on-surface-variant flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-body-lg text-on-surface truncate">{query}</p>
        <p className="text-body-sm text-on-surface-variant">{time}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors flex-shrink-0"
      >
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

/** Search result card — cards.json Elevated */
function ResultCard({ result }: { result: typeof RESULTS[0] }) {
  return (
    <div className="mx-4 rounded-xl bg-surface-container-low shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Source row */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
          <Icon name={result.icon} size={12} className="text-on-surface-variant" />
        </div>
        <span className="text-body-sm text-on-surface-variant truncate flex-1">{result.url}</span>
        <span className="text-label-sm font-medium text-primary bg-primary-container px-2 py-0.5 rounded-full flex-shrink-0">
          {result.tag}
        </span>
      </div>
      {/* Title */}
      <p className="px-4 text-title-md font-medium text-on-surface leading-6">{result.title}</p>
      {/* Snippet */}
      <p className="px-4 pt-1 pb-4 text-body-md text-on-surface-variant line-clamp-2 leading-5">
        {result.snippet}
      </p>
    </div>
  );
}

/** Section header */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between h-12 px-4">
      <span className="text-title-sm font-medium text-on-surface-variant uppercase tracking-[0.8px] text-[11px]">
        {title}
      </span>
      <button className="text-label-md font-medium text-primary hover:opacity-80 transition-opacity">
        See all
      </button>
    </div>
  );
}

/** Navigation Bar */
function NavigationBar({ active }: { active: number }) {
  const items = [
    { icon: 'search'       as const, label: 'Search'  },
    { icon: 'image'        as const, label: 'Images'  },
    { icon: 'mic'          as const, label: 'Voice'   },
    { icon: 'account_circle' as const, label: 'Profile' },
  ];
  return (
    <nav className="flex items-stretch flex-shrink-0 bg-surface-container" style={{ height: 64 }}>
      {items.map((item, i) => {
        const isSelected = i === active;
        return (
          <button
            key={item.label}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5"
          >
            <div className={[
              'flex items-center justify-center w-14 h-8 rounded-2xl transition-colors',
              isSelected ? 'bg-secondary-container' : '',
            ].join(' ')}>
              <Icon
                name={item.icon}
                size={24}
                className={isSelected ? 'text-on-surface' : 'text-on-surface-variant'}
              />
            </div>
            <span className={[
              'text-label-md font-medium',
              isSelected ? 'text-secondary' : 'text-on-surface-variant',
            ].join(' ')}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/** Gesture Bar */
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

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [recents, setRecents]     = useState(RECENT_SEARCHES);
  const [showResults, setShowResults] = useState(false);

  const removeRecent = (idx: number) =>
    setRecents((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="min-h-screen bg-neutral-200 flex items-start justify-center py-8">
      <div
        className="relative flex flex-col bg-surface overflow-hidden"
        style={{ width: 412, minHeight: 812, borderRadius: 28, border: '8px solid #CAC4D0' }}
      >
        {/* ── Status Bar ── */}
        <div className="flex items-center justify-between h-[52px] px-6 bg-surface flex-shrink-0">
          <span className="text-[14px] font-medium text-on-surface tracking-[0.14px]">9:41</span>
          <div className="flex items-center gap-2 text-on-surface">
            <Icon name="account_circle" size={28} />
          </div>
        </div>

        {/* ── Search Bar (TopAppBar Search config) ── */}
        <SearchBar
          query=""
          onFocus={() => setShowResults((v) => !v)}
        />

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto scrollbar-none">

          {/* AI Features */}
          <AiFeatureRow />

          {/* Divider */}
          <div className="h-px mx-4 bg-outline-variant/40" />

          {/* Filter Tabs */}
          <FilterTabs active={activeTab} onChange={setActiveTab} />

          {showResults ? (
            /* ── Results view ── */
            <div className="flex flex-col gap-3 py-4">
              {/* AI Answer Card — Elevated (cards.json) */}
              <div className="mx-4 rounded-xl bg-primary-container overflow-hidden">
                <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="star_filled" size={18} className="text-on-primary" />
                  </div>
                  <div>
                    <p className="text-label-lg font-medium text-on-primary-container">AI Overview</p>
                    <p className="text-label-sm text-on-primary-container/70">Generated by AI</p>
                  </div>
                </div>
                <p className="px-4 pb-4 text-body-md text-on-primary-container leading-5">
                  Material Design 3 (M3) is Google's latest design system offering adaptive, accessible, and expressive components built for Android, Web, and Flutter platforms.
                </p>
              </div>
              {/* Web results */}
              {RESULTS.map((r, i) => <ResultCard key={i} result={r} />)}
            </div>
          ) : (
            /* ── Home view ── */
            <>
              {/* Trending */}
              <section className="bg-surface pt-2">
                <SectionHeader title="Trending" />
                {TRENDING.map((t, i) => (
                  <TrendingItem key={t.topic} topic={t.topic} category={t.category} rank={i + 1} />
                ))}
              </section>

              {/* Recent Searches */}
              {recents.length > 0 && (
                <section className="bg-surface pt-2">
                  <SectionHeader title="Recent" />
                  {recents.map((r, i) => (
                    <RecentItem key={i} query={r.query} time={r.time} onRemove={() => removeRecent(i)} />
                  ))}
                </section>
              )}

              {/* Empty state (when all recents removed) */}
              {recents.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-12 px-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center">
                    <Icon name="search" size={32} className="text-on-surface-variant" />
                  </div>
                  <p className="text-title-md font-medium text-on-surface">No recent searches</p>
                  <p className="text-body-md text-on-surface-variant">
                    Your recent searches will appear here.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Navigation Bar ── */}
        <NavigationBar active={0} />
        <GestureBar />
      </div>
    </div>
  );
}

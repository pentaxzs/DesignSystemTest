/**
 * home-mobile Pattern Page
 * Source: patterns/home-mobile.json (figmaNodeId: 56615:82356)
 *
 * Structure (top → bottom):
 *   TopAppBar (Medium) → Section 1 Avatar Carousel → Section 2 Hero Carousel
 *   → Section 3 Square Grid → Section 4 Album Cards → Section 5 Article List
 *   → Section 6 More Like → NavigationBar → GestureBar
 */

import { TopAppBar } from '@/design-system/components/TopAppBar';
import { Icon } from '@/design-system/icons';

/* ─── Helpers ─── */

/** Section header with title + arrow icon (titleHeader in home-mobile.json) */
function SectionHeader({ title, noPadding }: { title: string; noPadding?: boolean }) {
  return (
    <div
      className={[
        'flex items-center justify-between h-12',
        noPadding ? '' : 'px-4',
      ].join(' ')}
    >
      <span className="text-title-lg font-normal text-on-surface">{title}</span>
      <button className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors">
        <Icon name="arrow_forward" size={24} />
      </button>
    </div>
  );
}

/** Circular image placeholder */
function AvatarPlaceholder({ size }: { size: number }) {
  return (
    <div
      className="rounded-full bg-surface-container-high flex-shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

/** Rounded rectangle image placeholder */
function ImgPlaceholder({
  width,
  height,
  radius = 16,
}: {
  width?: number | string;
  height: number;
  radius?: number;
}) {
  return (
    <div
      className="bg-surface-container-high flex-shrink-0"
      style={{
        width: width ?? '100%',
        height,
        borderRadius: radius,
      }}
    />
  );
}

/* ─── Section 1 — Avatar Carousel ─── */
function AvatarCarousel() {
  const items = [
    { label: 'Artist A' },
    { label: 'Artist B' },
    { label: 'Artist C' },
    { label: undefined },
    { label: undefined },
    { label: undefined },
    { label: undefined },
    { label: undefined },
  ];
  return (
    <section className="bg-surface pb-4">
      <SectionHeader title="Discover" />
      <div className="flex gap-2 overflow-x-auto pl-4 scrollbar-none">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
            <AvatarPlaceholder size={96} />
            {item.label && (
              <span className="text-label-lg font-medium text-on-surface w-24 text-center truncate">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 2 — Hero Carousel ─── */
function HeroCarousel() {
  const items = [{ artist: 'Neon Pulse', title: 'Electric Dream' }, { artist: 'Luna Wave', title: 'Starfall' }];
  return (
    <section className="bg-surface">
      <SectionHeader title="Featured" />
      <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none">
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: 'calc(100% - 72px)' }}>
            <ImgPlaceholder height={221} radius={28} />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 min-w-0">
                <p className="text-body-lg text-on-surface truncate">{item.artist}</p>
                <p className="text-body-md text-on-surface-variant truncate">{item.title}</p>
              </div>
              {/* Tonal icon button — play */}
              <button className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                <Icon name="play_arrow_filled" size={24} />
              </button>
            </div>
          </div>
        ))}
        {/* Peek card */}
        <div className="w-14 flex-shrink-0" />
      </div>
    </section>
  );
}

/* ─── Section 3 — Square Grid Cards ─── */
function SquareGridCards() {
  const items = [
    { label: 'Pop Hits' }, { label: 'Chill' }, { label: 'Focus' },
    {}, {}, {}, {}, {},
  ];
  return (
    <section className="bg-surface">
      <SectionHeader title="Browse" />
      <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1 flex-shrink-0 items-center">
            <ImgPlaceholder width={96} height={96} radius={16} />
            {(item as { label?: string }).label && (
              <span className="text-label-lg font-medium text-on-surface w-24 text-center truncate">
                {(item as { label?: string }).label}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 4 — Album Card Carousel ─── */
function AlbumCardCarousel() {
  const items = [
    { artist: 'Neon Pulse', song: 'Electric Dream' },
    { artist: 'Luna Wave', song: 'Starfall' },
    { artist: 'Deep Echo', song: 'Void Runner' },
    { artist: 'Solar Flare', song: 'Ignite' },
  ];
  return (
    <section className="bg-surface pb-4">
      <SectionHeader title="New Releases" />
      <div className="flex gap-2 overflow-x-auto pl-4 scrollbar-none" style={{ height: 187 }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex gap-2 rounded-xl bg-surface-container-high p-2"
            style={{ width: 140 }}
          >
            <ImgPlaceholder width={116} height={119} radius={8} />
            <div className="flex flex-col justify-between pr-2 py-1 min-w-0">
              <p className="text-title-sm font-medium text-on-surface truncate">{item.artist}</p>
              <p className="text-body-sm text-on-surface-variant truncate">{item.song}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 5 — Article List ─── */
function ArticleList() {
  const items = [
    { headline: 'Breaking News', description: 'Something big happened in the world today that you should probably know about.', date: 'Apr 15', duration: '3 min' },
    { headline: 'Tech Update', description: 'The latest in AI and software developments from around the industry.', date: 'Apr 14', duration: '5 min' },
  ];
  return (
    <section className="bg-surface px-4 pb-2">
      <SectionHeader title="Latest" noPadding />
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 h-[120px]">
            <ImgPlaceholder width={120} height={120} radius={16} />
            <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
              <div className="flex flex-col gap-1">
                <p className="text-title-lg font-normal text-on-surface line-clamp-2 leading-7">{item.headline}</p>
                <p className="text-body-md text-on-surface-variant line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                  <AvatarPlaceholder size={24} />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>
                <Icon name="play_arrow_filled" size={24} className="text-on-surface-variant" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 6 — More Like ─── */
function MoreLike() {
  const items = [
    { label: 'Track 1' }, { label: 'Track 2' }, { label: 'Track 3' },
    {}, {}, {}, {}, {},
  ];
  return (
    <section className="bg-surface pt-6 pb-4 flex flex-col gap-4">
      {/* Header with avatar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <AvatarPlaceholder size={40} />
          <div>
            <p className="text-body-sm text-on-surface-variant">More like</p>
            <p className="text-title-md font-medium text-on-surface">Neon Pulse</p>
          </div>
        </div>
        <button className="flex items-center justify-center w-12 h-12 rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors">
          <Icon name="arrow_forward" size={24} />
        </button>
      </div>

      {/* Carousel */}
      <div className="flex gap-2 overflow-x-auto pl-4 scrollbar-none" style={{ height: 124 }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1 flex-shrink-0 items-center">
            <ImgPlaceholder width={96} height={96} radius={16} />
            {(item as { label?: string }).label && (
              <span className="text-label-lg font-medium text-on-surface w-24 text-center truncate">
                {(item as { label?: string }).label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Supporting text */}
      <p className="px-4 pb-2 text-body-md text-on-surface-variant">
        Based on your recent listening activity
      </p>
    </section>
  );
}

/* ─── Navigation Bar ─── */
function NavigationBar({ active }: { active: 0 | 1 | 2 }) {
  const items = [
    { icon: 'search' as const,         label: 'Discover' },
    { icon: 'play_arrow_filled' as const, label: 'Listen' },
    { icon: 'person' as const,          label: 'Profile' },
  ];

  return (
    <nav className="bg-surface-container flex items-stretch h-16 flex-shrink-0">
      {items.map((item, i) => {
        const isSelected = i === active;
        return (
          <button
            key={item.label}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5 relative group"
          >
            {/* Active indicator pill — 56×32 */}
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

/* ─── Gesture Bar ─── */
function GestureBar() {
  return (
    <div className="bg-surface-container flex items-center justify-center h-6 flex-shrink-0">
      <div className="w-[108px] h-1 rounded-full bg-on-surface" />
    </div>
  );
}

/* ─── Page ─── */
export default function HomeMobilePage() {
  return (
    /* Mobile frame: max-w-[412px] centered, with border */
    <div className="min-h-screen bg-neutral-200 flex items-start justify-center py-8">
      <div
        className="flex flex-col bg-surface overflow-hidden"
        style={{
          width: 412,
          minHeight: 1788,
          borderRadius: 28,
          border: '8px solid #CAC4D0',
        }}
      >
        {/* Status bar placeholder */}
        <div className="flex items-center justify-between h-[52px] px-6 bg-surface flex-shrink-0">
          <span className="text-[14px] font-medium text-on-surface tracking-[0.14px]">9:41</span>
          <div className="w-6 h-6 rounded-full bg-surface-container-high" />
          <div className="flex items-center gap-1 text-on-surface">
            <Icon name="notifications" size={17} />
          </div>
        </div>

        {/* Medium Top App Bar — headline/medium-emphasized */}
        <TopAppBar
          configuration="Medium"
          title="Good morning"
          leadingIcon="arrow_back"
          trailingIcons={['notifications', 'settings']}
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          <AvatarCarousel />
          <HeroCarousel />
          <SquareGridCards />
          <AlbumCardCarousel />
          <ArticleList />
          <MoreLike />
        </div>

        {/* Bottom fixed */}
        <NavigationBar active={0} />
        <GestureBar />
      </div>
    </div>
  );
}

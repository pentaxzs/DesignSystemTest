import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/email');
}

// ── Button showcase (kept for local reference) ──────────────────
function _ButtonShowcase() {
  return (
    <main className="p-10 flex flex-col gap-10 bg-surface min-h-screen">
      <h1 className="text-headline-md font-medium text-on-surface">
        Button — Filled
      </h1>

      {/* Size */}
      <section className="flex flex-col gap-4">
        <h2 className="text-title-md font-medium text-on-surface-variant">Size</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="XSmall" label="XSmall" />
          <Button size="Small"  label="Small" />
          <Button size="Medium" label="Medium" />
          <Button size="Large"  label="Large" />
          <Button size="XLarge" label="XLarge" />
        </div>
      </section>

      {/* Shape */}
      <section className="flex flex-col gap-4">
        <h2 className="text-title-md font-medium text-on-surface-variant">Shape</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button shape="Round"  label="Round" />
          <Button shape="Square" label="Square" />
        </div>
      </section>

      {/* With Icon */}
      <section className="flex flex-col gap-4">
        <h2 className="text-title-md font-medium text-on-surface-variant">With Icon</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="Small"
            label="Add"
            showIcon
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            }
          />
          <Button
            size="Medium"
            label="Add item"
            showIcon
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            }
          />
          <Button
            size="Large"
            label="Add to cart"
            showIcon
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <h2 className="text-title-md font-medium text-on-surface-variant">State — Disabled</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button label="Disabled" disabled />
          <Button
            label="Disabled + Icon"
            disabled
            showIcon
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            }
          />
        </div>
      </section>
    </main>
  );
}

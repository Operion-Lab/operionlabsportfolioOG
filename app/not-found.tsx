import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <div className="site-shell text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Page not found</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The page may have moved, or the URL may be incorrect.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

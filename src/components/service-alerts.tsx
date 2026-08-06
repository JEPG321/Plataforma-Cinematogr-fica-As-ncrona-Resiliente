import type { ServiceAlert } from "../entities/domain";

interface ServiceAlertsProps {
  alerts: ServiceAlert[];
}

export function ServiceAlerts({ alerts }: ServiceAlertsProps) {
  if (!alerts.length) {
    return null;
  }

  return (
    <section className="grid gap-3" aria-live="polite">
      {alerts.map((alert) => (
        <article
          key={`${alert.title}-${alert.message}`}
          className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100"
        >
          <strong className="font-semibold">{alert.title}</strong>{" "}
          <span>{alert.message}</span>
        </article>
      ))}
    </section>
  );
}

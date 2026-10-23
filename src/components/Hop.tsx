/** A small "request" label that marks each section as one hop of the trace. */
export function Hop({ method, path, meta, status = "200 OK" }: { method: string; path: string; meta?: string; status?: string }) {
  return (
    <span className="hop mono">
      <b className="hop-m">{method}</b> {path}
      {meta ? <span className="hop-meta"> · {meta}</span> : null}
      <span className="hop-s"> · {status}</span>
    </span>
  );
}

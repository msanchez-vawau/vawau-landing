import { termsIntroduction, termsSections } from "@/lib/installation-terms";
export default function Terms() {
  return <div className="installation-terms">
    {termsIntroduction.map(p => <p key={p}>{p}</p>)}
    {termsSections.map(s => <section key={s.title}>
      <h3>{s.title}</h3>
      {s.paragraphs.map(p => <p key={p}>{p}</p>)}
      {s.items && <ul>{s.items.map(p => <li key={p}>{p}</li>)}</ul>}
      {s.after?.map(p => <p key={p}>{p}</p>)}
    </section>)}
  </div>;
}

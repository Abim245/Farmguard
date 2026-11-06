const CROPS = ["any", "maize", "cassava", "tomato"];

export default function Selectors({ states, state, crop, setState, setCrop }) {
  return (
    <div className="selectors">
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Select state</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select value={crop} onChange={(e) => setCrop(e.target.value)}>
        {CROPS.map((c) => (
          <option key={c} value={c}>
            {c === "any" ? "Any crop" : c[0].toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
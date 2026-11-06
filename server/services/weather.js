import { STATES } from "../data/states.js";

export async function getWeather(state) {
  const coords = STATES[state];
  if (!coords) return null;
  const [lat, lon] = coords;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,precipitation` +
    `&daily=precipitation_sum,temperature_2m_max,temperature_2m_min` +
    `&forecast_days=7&timezone=Africa%2FLagos`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      now: d.current,
      next7days: d.daily.time.map((day, i) => ({
        date: day,
        rainMm: d.daily.precipitation_sum[i],
        maxC: d.daily.temperature_2m_max[i],
        minC: d.daily.temperature_2m_min[i],
      })),
    };
  } catch {
    return null; // weather is optional, never break the chat
  }
}
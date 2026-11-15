// Loads works/works.json and returns the works sorted newest first.
// Throws on network, HTTP, or format errors so callers can show the failure.
export async function loadWorks() {
  const response = await fetch('works/works.json');
  if (!response.ok) {
    throw new Error(`works.json: HTTP ${response.status}`);
  }
  const works = await response.json();
  if (!Array.isArray(works)) {
    throw new Error('works.json: top level must be an array');
  }
  // publishedAt is YYYY-MM-DD, so string order equals date order.
  return works.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

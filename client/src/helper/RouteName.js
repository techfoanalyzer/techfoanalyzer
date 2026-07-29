// Helper function for dynamic search routing
export const RouteSearch = (q) => {
  if (q && q.trim() !== "") {
    return `/search?q=${encodeURIComponent(q.trim())}`;
  }
  return `/search`;
};
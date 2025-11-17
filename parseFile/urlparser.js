function parseFullUrl(fullUrl) {
  try {
    const parsed = new URL(fullUrl);
    const queryObj = {};
    for (const [k, v] of parsed.searchParams) {
            queryObj[k] = v;
    }
    return {
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      query: queryObj
    };
  } catch (err) {
    throw new Error('Invalid URL');
  }
}

module.exports = { parseFullUrl };

export const searchiTunes = async (term, entity, attribute = 'term') => {
  try {
    const response = await fetch(`https://itunes.apple.com/search?${attribute}=${encodeURIComponent(term)}&entity=${entity}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

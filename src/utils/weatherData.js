const toronto = {
  latitude: 43.6532,
  longitude: -79.3832,
  timeZone: 'America/Toronto'
};

function requireNumber(value) {
  if (!Number.isFinite(value)) throw new Error('Invalid weather observation');
  return value;
}

function formatTemperature(value) {
  return `${Math.round(requireNumber(value))}°C`;
}

module.exports = { toronto, requireNumber, formatTemperature };

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function calculateETA(distanceKm) {
  const avgSpeed = 30
  return Math.ceil((distanceKm / avgSpeed) * 60)
}

function findNearestDriver(lat, lng, drivers) {
  let nearest = null
  let minDist = Infinity
  for (const d of drivers) {
    const dist = haversine(lat, lng, d.lat, d.lng)
    if (dist < minDist) { minDist = dist; nearest = d }
  }
  return nearest ? { ...nearest, distance: minDist, eta: calculateETA(minDist) } : null
}

module.exports = { haversine, calculateETA, findNearestDriver }

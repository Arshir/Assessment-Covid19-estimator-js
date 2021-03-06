// Estimate the number of currently infected people based on impact level
function EstCurrentlyInfected(reportedCases, impactFactor) {
  // estimate current infection figure
  return reportedCases * impactFactor; // formular: reportedCases x severityImpactFactor
}

// Get the number of days making up the period
function NormalisePeriodToDays(periodType) {
  let days = 0;
  switch (periodType.toLowerCase()) {
    case 'weeks':
      days = 7; // 7 days in a week
      break;
    case 'months':
      days = 30; // 30 days in month
      break;
    case 'years':
      days = 365; // 365 days in year (assuming not a leap year)
      break;
    case 'days':
      days = 1; // 1 day in day
      break;
    default:
      days = 0;
  }
  return days;
}
// Estimate infections by requested time period
function EstInfectionsByRequestedTime(currentInfections, timeToElapse, periodType) {
  const days = NormalisePeriodToDays(periodType);
  // Check for numeric compatible argument values
  if (Number.isSafeInteger(currentInfections) && Number.isSafeInteger(timeToElapse) && days > 0) {
    const requestedTime = days * timeToElapse; // days of equivalent
    // estimate frequency of infections double at interval of 3 days
    const doublingFreq = Number.parseInt(requestedTime / 3, 10);
    return currentInfections * (2 ** doublingFreq);
  }
  return 0;
}
module.exports = {
  EstCurrentlyInfected,
  EstInfectionsByRequestedTime,
  NormalisePeriodToDays

};

/* // Estimate the severe cases by requested time
function EstSevereCasesInICU(infectionsByRequestedTime) {
  // By research 5% of infections by requested time estimated in ICU
  const icuCasesPercentage = 0.05;
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to research, estimated severe cases by requested time in ICU is
    return parseInt(infectionsByRequestedTime * icuCasesPercentage, 10);
  }
  return 0;
}
// Estimate total number of available bed for severe cases
function EstSevereCasesOnVentilators(infectionsByRequestedTime) {
  // By research 35% of beds available estimated for severe cases
  const ventilatorCasesPercentage = 0.02;
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to research, estimated severe cases by requested time on ventilators is
    return parseInt(infectionsByRequestedTime * ventilatorCasesPercentage, 10);
  }
  return 0;
} */

// Estimate measure of severe cases of infections by requested time
function EstMeasuresOfSevereCasesByRequestedTime(infectionsByRequestedTime, casePercentage) {
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to research, estimated severe cases by requested time
    return parseInt(infectionsByRequestedTime * casePercentage, 10);
  }
  return 0;
}

// Estimate the amount of dollars lost over the requested period
function EstDollarsInFlightOverRequestedPeriod(infectionsByRequestedTime, dailyIncomePopPercentage,
  dailyIncome, days) {
  let dollarsInFlight = 1;
  const infByRqTime = infectionsByRequestedTime;
  const dailyIncPercent = dailyIncomePopPercentage;

  if (!Number.isNaN(infByRqTime) && !Number.isNaN(dailyIncPercent)
      && !Number.isNaN(dailyIncome) && !Number.isNaN(days)) {
    dollarsInFlight *= infectionsByRequestedTime;
    dollarsInFlight *= dailyIncomePopPercentage;
    dollarsInFlight *= dailyIncome;
    dollarsInFlight *= days;
    dollarsInFlight /= 100;
    dollarsInFlight = parseInt(dollarsInFlight, 10);

    return dollarsInFlight;
  }
  return 0;
}

module.exports = {
  EstMeasuresOfSevereCasesByRequestedTime,
  EstDollarsInFlightOverRequestedPeriod
};

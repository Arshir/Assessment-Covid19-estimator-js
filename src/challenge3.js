// Estimate measure of severe cases of infections by requested time
function EstMeasuresOfSevereCasesByRequestedTime(infectionsByRequestedTime, casePercentage) {
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to research, estimated severe cases by requested time
    return infectionsByRequestedTime * casePercentage;
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
    dollarsInFlight /= days;
    // dollarsInFlight = parseInt(dollarsInFlight, 10);

    return dollarsInFlight;
  }
  return 0;
}

module.exports = {
  EstMeasuresOfSevereCasesByRequestedTime,
  EstDollarsInFlightOverRequestedPeriod
};

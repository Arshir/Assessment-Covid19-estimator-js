const chaOne = require('./challenge1.js');
const chaTwo = require('./challenge2.js');
const chaThree = require('./challenge3.js');
// Challleng 1 process
function ChallengeOne(output) {
  const ImpactCoeft = 10;
  const SevereCoeft = 50;
  // Get reportedCases from input data
  const cases = output.data.reportedCases;
  // estimate CurrentlyInfected for impact and severeimpact infections
  const impInfected = chaOne.EstCurrentlyInfected(cases, ImpactCoeft);
  const sevInfected = chaOne.EstCurrentlyInfected(cases, SevereCoeft);
  // estimate infections by requested time
  const time = output.data.timeToElapse;
  const timeUnit = output.data.periodType;

  const impInfbyTime = chaOne.EstInfectionsByRequestedTime(impInfected, time, timeUnit);
  const sevInfbyTime = chaOne.EstInfectionsByRequestedTime(sevInfected, time, timeUnit);
  // Assign values to output object.
  output.impact.currentlyInfected = impInfected;
  output.impact.infectionsByRequestedTime = impInfbyTime;
  output.severeImpact.currentlyInfected = sevInfected;
  output.severeImpact.infectionsByRequestedTime = sevInfbyTime;
  return output;
}
// Challenge 2 process
function ChallengeTwo(output) {
  // Get total available hospital beds from input data
  const totalBeds = output.data.totalHospitalBeds;
  // Get estimated severe cases available bed
  const totalSevCsBeds = chaTwo.EstAvailableBedforSevereCases(totalBeds);
  // Get estimated impact InfectionsByRequestedTime
  const impInfbyTime = output.impact.infectionsByRequestedTime;
  // Get estimated severe-impact InfectionsByRequestedTime
  const sevImpInfbyTime = output.severeImpact.infectionsByRequestedTime;
  // estimate impact severecasesbyrequestedtime
  const impSevCsByTime = chaTwo.EstSevereCasesByRequestedTime(impInfbyTime);
  // estimate severe-impact severecasesbyrequestedtime
  const sevImpSevCsByTime = chaTwo.EstSevereCasesByRequestedTime(sevImpInfbyTime);

  const impBedRqTime = chaTwo.EstHospitalBedsByRequestedTime(totalSevCsBeds, impSevCsByTime);

  const sevImpBedRqTime = chaTwo.EstHospitalBedsByRequestedTime(totalSevCsBeds, sevImpSevCsByTime);

  // Assign values to output object.
  output.impact.severeCasesByRequestedTime = impSevCsByTime;
  output.impact.hospitalBedsByRequestedTime = impBedRqTime;
  output.severeImpact.severeCasesByRequestedTime = sevImpSevCsByTime;
  output.severeImpact.hospitalBedsByRequestedTime = sevImpBedRqTime;

  return output;
}
// Challenge 3 process
function ChallengeThree(output) {
  // Percentage measure of severe cases requiring ventilator according to research
  const ventilatorCasesPercentage = 0.02;
  // Percentage measure of severe cases requiring intensive care
  const icuCasesPercentage = 0.05;

  // Get estimated impact InfectionsByRequestedTime
  const impInfbyTime = output.impact.infectionsByRequestedTime;
  // Get estimated severe-impact InfectionsByRequestedTime
  const sevImpInfbyTime = output.severeImpact.infectionsByRequestedTime;
  // Get avgDailyIncomeInUSD
  const avgDailyIncome = output.data.region.avgDailyIncomeInUSD;
  // Get avgDailyIncomePopulation
  const avgDailyIncomePop = output.data.region.avgDailyIncomePopulation;
  // Get days
  const days = output.data.timeToElapse * chaOne.NormalisePeriodToDays(output.data.periodType);
  // Estimate severe cases of infections by requested time requiring icu
  const impSevCsByTimeVent = chaThree.EstMeasuresOfSevereCasesByRequestedTime(
    impInfbyTime, ventilatorCasesPercentage
  );
  // Estimate severe cases of infections by requested time requiring icu
  const impSevCsByTimeICU = chaThree.EstMeasuresOfSevereCasesByRequestedTime(
    impInfbyTime, icuCasesPercentage
  );

  // Estimate severe cases of infections by requested time requiring icu
  const sevImpSevCsByTimeVent = chaThree.EstMeasuresOfSevereCasesByRequestedTime(
    sevImpInfbyTime, ventilatorCasesPercentage
  );
  // Estimate severe cases of infections by requested time requiring icu
  const sevImpSevCsByTimeICU = chaThree.EstMeasuresOfSevereCasesByRequestedTime(
    sevImpInfbyTime, icuCasesPercentage
  );
  // Estimate Dollars Lost by infection impact
  const impdollarsInFlight = chaThree.EstDollarsInFlightOverRequestedPeriod(
    impInfbyTime, avgDailyIncomePop, avgDailyIncome, days
  );

  // Estimate Dollars Lost by severe infection impact
  const sevImpdollarsInFlight = chaThree.EstDollarsInFlightOverRequestedPeriod(
    sevImpInfbyTime, avgDailyIncomePop, avgDailyIncome, days
  );
  // Assign values to output object.
  output.impact.casesForICUByRequestedTime = impSevCsByTimeICU;
  output.impact.casesForVentilatorsByRequestedTime = impSevCsByTimeVent;
  output.impact.dollarsInFlight = impdollarsInFlight;
  output.severeImpact.casesForICUByRequestedTime = sevImpSevCsByTimeICU;
  output.severeImpact.casesForVentilatorsByRequestedTime = sevImpSevCsByTimeVent;
  output.severeImpact.dollarsInFlight = sevImpdollarsInFlight;
  return output;
}

// const covid19ImpactEstimator = (data) => data;

const covid19ImpactEstimator = (data) => {
  // const input = data;
  // const impact = {};
  // const severeImpact = {};

  let output = {
    data,
    impact: {},
    severeImpact: {}
  };
  // Resolve challenge one
  output = ChallengeOne(output);
  // Resolve challenge two
  output = ChallengeTwo(output);
  // Resolve challenge three
  output = ChallengeThree(output);

  return output;
};

export default covid19ImpactEstimator;

const chaOne = require('./challenge1.js');
const chaTwo = require('./challenge2.js');

function ChallengeOne(output) {
  const ImpactCoeft = 10;
  const SevereCoeft = 50;
  // Get reportedCases from input data
  const cases = output.data.reportedCases;
  // estimate CurrentlyInfected for impact and severeimpact infections
  const impInfected = chaOne.EstCurrentlyInfected(cases, ImpactCoeft);
  const sevInfected = chaOne.EstCurrentlyInfected(cases, SevereCoeft);
  // estimate infections by requested time
  const time = output.data.period;
  const timeUnit = output.data.periodType;

  const impInfbyTime = chaOne.EstInfectionsByRequestedTime(impInfected, time, timeUnit);
  const sevInfbyTime = chaOne.EstInfectionsByRequestedTime(sevInfected, time, timeUnit);
  // Assign values to output object.
  output.estimate.impact.CurrentlyInfected = impInfected;
  output.estimate.impact.InfectionsByRequestedTime = impInfbyTime;
  output.estimate.severeImpact.CurrentlyInfected = sevInfected;
  output.estimate.severeImpact.InfectionsByRequestedTime = sevInfbyTime;
  return output;
}

function ChallengeTwo(output) {
  // Get total available hospital beds from input data
  const totalBeds = output.data.totalHospitalBeds;
  // Get estimated severe cases available bed
  const totalSevCsBeds = chaTwo.EstAvailableBedforSevereCases(totalBeds);
  // Get estimated impact InfectionsByRequestedTime
  const impInfbyTime = output.estimate.impact.InfectionsByRequestedTime;
  // Get estimated severe-impact InfectionsByRequestedTime
  const sevImpInfbyTime = output.estimate.severeImpact.InfectionsByRequestedTime;
  // estimate impact severecasesbyrequestedtime
  const impSevCsByTime = chaTwo.EstSevereCasesByRequestedTime(impInfbyTime);
  // estimate severe-impact severecasesbyrequestedtime
  const sevImpSevCsByTime = chaTwo.EstSevereCasesByRequestedTime(sevImpInfbyTime);

  const impBedRqTime = chaTwo.EstHospitalBedsByRequestedTime(totalSevCsBeds, impSevCsByTime);

  const sevImpBedRqTime = chaTwo.EstHospitalBedsByRequestedTime(totalSevCsBeds, sevImpSevCsByTime);

  // Assign values to output object.
  output.estimate.impact.SevereCasesByRequestedTime = impSevCsByTime;
  output.estimate.impact.HospitalBedsByRequestedTime = impBedRqTime;
  output.estimate.severeImpact.SevereCasesByRequestedTime = sevImpSevCsByTime;
  output.estimate.severeImpact.HospitalBedsByRequestedTime = sevImpBedRqTime;


  return output;
}
// const covid19ImpactEstimator = (data) => data;

const covid19ImpactEstimator = (data) => {
  const input = data;
  const impact = {};
  const severeImpact = {};

  let output = {
    data: input,
    estimate: {
      impact,
      severeImpact
    }
  };

  output = ChallengeOne(output);

  output = ChallengeTwo(output);

  return output;
};

export default covid19ImpactEstimator;

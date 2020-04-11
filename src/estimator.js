const chaOne = require('./challenge1.js');


const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

function ChallengeOne(output) {
  const ImpactCoeft = 10;
  const SevereCoeft = 50;
  // Get reportedCases from input data
  const cases = output.data.reportedCases;
  // estimate CurrentlyInfected for impact and severeimpact infections
  const impInfected = chaOne.EstCurrentlyInfected(cases, ImpactCoeft);
  const sevInfected = chaOne.EstCurrentlyInfected(input.reportedCases, SevereCoeft);
  // estimate infections by requested time
  const time = input.period;
  const timeUnit = input.periodType;

  const impInfbyTime = chaOne.EstInfectionsByRequestedTime(impInfected, time, timeUnit);
  const sevInfbyTime = chaOne.EstInfectionsByRequestedTime(sevInfected, time, timeUnit);
  // Assign values to output object.
  output.estimate.impact.CurrentlyInfected = impInfected;
  output.estimate.impact.InfectionsByRequestedTime = impInfbyTime;
  output.estimate.severeImpact.CurrentlyInfected = sevInfected;
  output.estimate.severeImpact.InfectionsByRequestedTime = sevInfbyTime;
  return output;
}

// const covid19ImpactEstimator = (data) => data;

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  let output = {
    data,
    estimate: {
      impact,
      severeImpact
    }
  };

  output = ChallengeOne(output);

  return output;
};

export default covid19ImpactEstimator;

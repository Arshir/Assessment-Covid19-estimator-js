// Estimate the severe cases by requested time
function EstSevereCasesByRequestedTime(infectionsByRequestedTime) {
  // By research 15% of infections by requested time estimated are severe cases
  const severeCasesPercentage = 0.15;
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to formular, estimated severe cases by requested time is
    return (infectionsByRequestedTime * severeCasesPercentage);
  }
  return 0;
}
// Estimate total number of available bed for severe cases
function EstAvailableBedforSevereCases(totalNumberofHospitalBeds) {
  // By research 35% of beds available estimated for severe cases
  const severeCasesAvailableBedPercentage = 0.35;
  if (Number.isInteger(totalNumberofHospitalBeds)) {
    // according to research, estimated available beds for severe cases is
    return (totalNumberofHospitalBeds * severeCasesAvailableBedPercentage);
  }
  return 0;
}
// Estimate remaining number of available bed after severe cases hospitalization
function EstHospitalBedsByRequestedTime(severeCasesAvailableBed, severeCasesByRequestedTime) {
  if (Number.parseInt(severeCasesAvailableBed, 10) >= 0
  && Number.parseInt(severeCasesByRequestedTime, 10) >= 0) {
    return (severeCasesAvailableBed - severeCasesByRequestedTime);
  }
  return 0;
}

module.exports = {
  EstSevereCasesByRequestedTime,
  EstAvailableBedforSevereCases,
  EstHospitalBedsByRequestedTime

};

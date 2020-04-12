function EstSevereCasesByRequestedTime(infectionsByRequestedTime) {
  const severeCasesPercentage = 0.15; // 15% of infections
  if (Number.isInteger(infectionsByRequestedTime)) {
    // according to formular, estimated severe cases by requested time is
    return parseInt(infectionsByRequestedTime * severeCasesPercentage, 10);
  }
  return 0;
}

function EstAvailableBedforSevereCases(totalNumberofHospitalBeds) {
  const severeCasesAvailableBedPercentage = 0.35; // 35% of infections
  if (Number.isInteger(totalNumberofHospitalBeds)) {
    // according to research, estimated available beds for severe cases is
    return parseInt(totalNumberofHospitalBeds * severeCasesAvailableBedPercentage, 10);
  }
  return 0;
}

function EstHospitalBedsByRequestedTime(severeCasesAvailableBed, severeCasesByRequestedTime) {
  if (Number.isInteger(severeCasesAvailableBed) && Number.isInteger(severeCasesByRequestedTime)) {
    return parseInt(severeCasesAvailableBed - severeCasesByRequestedTime, 10);
  }
  return 0;
}

module.exports = {
  EstSevereCasesByRequestedTime,
  EstAvailableBedforSevereCases,
  EstHospitalBedsByRequestedTime

};

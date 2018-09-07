const GeoCoordinatesType = require('./geo-coordinates-type');

const SubjectLocationType = `
  type SubjectLocation {
    artifactCount:  Int,
    subjectCount:   Int,
    geoCoordinates: GeoCoordinates,
    countryCode:    String,
    region:         String,
    subRegion:      String,
    locality:       String,
    fullName:       String,
  }
`;

module.exports = [SubjectLocationType, GeoCoordinatesType];

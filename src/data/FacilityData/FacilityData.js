// TODO Get Facilities from Database

const FacilityData = [
  {
    id: 1, // Primary Key
    facilityName: "Student Recreational Sports Center", // Recreation Center Name
    facilityLocation: "Bloomington, IN", // Recreation Center Location
    facilitySport: "Soccer", // Field/Court Type
    facilityInfo: "Soccer Field #02", // Field/Court Description
    availableNow: true, // Is the field/court not reserved during the current hour
    reservationPeriodStart: 6, // What time does the Recreation Center start accepting reservations
    reservationPeriodEnd: 17, // What time does the Recreation Center stop accepting reservations
  },
  {
    id: 2,
    facilityName: "Student Recreational Sports Center",
    facilityLocation: "Bloomington, IN",
    facilitySport: "Basketball",
    facilityInfo: "Basketball Court #01",
    availableNow: false,
    reservationPeriodStart: 6,
    reservationPeriodEnd: 21,
  },
  {
    id: 3,
    facilityName: "Student Recreational Sports Center",
    facilityLocation: "Bloomington, IN",
    facilitySport: "Volleyball",
    facilityInfo: "Volleyball Court #01",
    availableNow: false,
    reservationPeriodStart: 11,
    reservationPeriodEnd: 15,
  },
  {
    id: 4,
    facilityName: "Student Recreational Sports Center",
    facilityLocation: "Bloomington, IN",
    facilitySport: "Table Tennis",
    facilityInfo: "Table Tennis Table #05",
    availableNow: false,
    reservationPeriodStart: 5,
    reservationPeriodEnd: 22,
  },
  {
    id: 5,
    facilityName: "Student Recreational Sports Center",
    facilityLocation: "Bloomington, IN",
    facilitySport: "Squash",
    facilityInfo: "Squash Court #03",
    availableNow: true,
    reservationPeriodStart: 13,
    reservationPeriodEnd: 18,
  },
  {
    id: 6,
    facilityName: "Student Recreational Sports Center",
    facilityLocation: "Bloomington, IN",
    facilitySport: "Badminton",
    facilityInfo: "Badminton Court #01",
    availableNow: false,
    reservationPeriodStart: 15,
    reservationPeriodEnd: 19,
  },
];

export default FacilityData;

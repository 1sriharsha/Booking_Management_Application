// TODO Get Gear from Database

// Gear available to rent by sport
const GearData = [
  {
    id: 1, // Primary Key
    value: 0,
    sportType: "Soccer", // Item category
    itemName: "Soccer Ball", // Item name
    itemPrice: 1.75, // Cost to rent 1 item
    maxItems: 5, // Max number that can be rented per reservation
  },
  {
    id: 2,
    value: 0,
    sportType: "Soccer",
    itemName: "Soccer Cleats",
    itemPrice: 3,
    maxItems: 12,
  },
  {
    id: 3,
    value: 0,
    sportType: "Basketball",
    itemName: "Basketball",
    itemPrice: 1.75,
    maxItems: 5,
  },
  {
    id: 4,
    value: 0,
    sportType: "Volleyball",
    itemName: "Volleyball",
    itemPrice: 1.75,
    maxItems: 5,
  },
  {
    id: 5,
    value: 0,
    sportType: "Table Tennis",
    itemName: "Ball",
    itemPrice: 0.5,
    maxItems: 8,
  },
  {
    id: 6,
    value: 0,
    sportType: "Table Tennis",
    itemName: "Racket",
    itemPrice: 2,
    maxItems: 3,
  },
  {
    id: 7,
    value: 0,
    sportType: "Squash",
    itemName: "Ball",
    itemPrice: 0.75,
    maxItems: 5,
  },
  {
    id: 8,
    value: 0,
    sportType: "Squash",
    itemName: "Racket",
    itemPrice: 2.5,
    maxItems: 4,
  },
  {
    id: 9,
    value: 0,
    sportType: "Badminton",
    itemName: "Shuttlecock",
    itemPrice: 0.5,
    maxItems: 10,
  },
  {
    id: 10,
    value: 0,
    sportType: "Badminton",
    itemName: "Racket",
    itemPrice: 2.5,
    maxItems: 4,
  },
];

export default GearData;

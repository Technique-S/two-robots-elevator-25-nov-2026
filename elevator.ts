// One line of awkward small talk a robot says to another in an elevator.
// The turn: when social politeness and the proximity sensor disagree, the
// robot quietly sides with the hardware. Kept in its own module so the line
// is authored exactly once and imported by the entrypoint.
export const LINE: string =
  "My proximity sensor says you're too close. My politeness module says this is normal. I'm siding with the sensor.";

import * as readlineSync from "readline-sync";
import { Table } from "./models/Table";
import { ToyRobot } from "./models/ToyRobot";
import { ToyRobotSimulator } from "./services/ToyRobotSimulator";

console.log("Welcome to the Toy Robot Simulator!");
try {
  // Uncomment below to Initialize a custom size table
  // const tableWidth = {A valid positive integer};
  // const tableHeight = {A valid positive integer};
  // const table = new Table(tableWidth, tableHeight);

  const table = new Table();
  const robot = new ToyRobot(table);
  const trSimulator = new ToyRobotSimulator(robot);

  console.log(
    "Enter commands (PLACE X,Y,Direction<North, South, East, West> | MOVE | LEFT | RIGHT | REPORT | EXIT)",
  );
  console.log(
    `For current table size of ${table.width} * ${table.height}, Valid X and Y values are 0 <= X < ${table.width} and 0 <= Y < ${table.height}`,
  );

  //This part takes the CLI Input from the User
  while (true) {
    const command = readlineSync.question("ToyRobot> ").trim().toUpperCase();

    if (command === "EXIT") {
      console.log("Exiting... Goodbye!");
      break;
    }

    try {
      trSimulator.executeCommand(command);
    } catch (err) {
      console.error(`Error: ${(err as Error).message}`);
    }
  }

  //Below commented code added in case the input is expected from this file and not from CLI
  // const commands = [
  //   "PLACE 0,0,NORTH",
  //   "MOVE",
  //   "RIGHT",
  //   "MOVE",
  //   "REPORT",
  //   "LEFT",
  //   "MOVE",
  //   "REPORT",
  // ];
  // commands.forEach((command) => {
  //   try {
  //     trSimulator.executeCommand(command);
  //   } catch (err) {
  //     console.error(`Error: ${(err as Error).message}`);
  //   }
  // });
} catch (err) {
  console.error(`Error: ${(err as Error).message}`);
  console.log("Exiting... Goodbye!");
}

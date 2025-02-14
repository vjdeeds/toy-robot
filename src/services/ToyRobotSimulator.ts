import { Direction } from "../types/Direction";
import { ToyRobot } from "../models/ToyRobot";

export class ToyRobotSimulator {
  private robot: ToyRobot;

  constructor(robot: ToyRobot) {
    this.robot = robot;
  }

  //Function to process command recieved from CLI
  executeCommand(command: string): void {
    if (command.trim() === "") {
      throw new Error("Please enter a valid command");
    }
    const parsedInputArray = command.trim().split(" ");

    const cmd = parsedInputArray[0];
    try {
      switch (cmd) {
        case "PLACE":
          this.executePlace(parsedInputArray);
          break;
        case "MOVE":
          this.robot.move();
          break;
        case "LEFT":
          this.robot.left();
          break;
        case "RIGHT":
          this.robot.right();
          break;
        case "REPORT":
          this.robot.report();
          break;
        default:
          console.error("Invalid Command: ", command);
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //Function to execute the place command onlky after validating the inpout
  private executePlace(parsedPlacedCommand: string[]): void {
    if (parsedPlacedCommand.length !== 2) {
      throw new Error(
        "Invalid PLACE command format: Please enter in this format => PLACE X,Y,Direction",
      );
    }

    const [x, y, direction] = parsedPlacedCommand[1].split(",");

    const xPos = parseInt(x);
    const yPos = parseInt(y);

    if (
      isNaN(xPos) ||
      isNaN(yPos) ||
      !Object.values(Direction).includes(direction as Direction)
    ) {
      throw new Error(
        "Invalid PLACE command: Coordinates or direction is incorrect.",
      );
    }

    this.robot.place(xPos, yPos, direction as Direction);
  }
}

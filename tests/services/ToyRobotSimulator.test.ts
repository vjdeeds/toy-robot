import { ToyRobotSimulator } from "../../src/services/ToyRobotSimulator";
import { ToyRobot } from "../../src/models/ToyRobot";
import { Table } from "../../src/models/Table";
import { Direction } from "../../src/types/Direction";

describe("ToyRobotSimulator", () => {
  let robot: ToyRobot;
  let simulator: ToyRobotSimulator;

  beforeEach(() => {
    const table = new Table();
    robot = new ToyRobot(table);
    simulator = new ToyRobotSimulator(robot);
  });

  test("should execute a valid PLACE command", () => {
    simulator.executeCommand("PLACE 1,2,NORTH");
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 2);
    expect(robot).toHaveProperty("direction", Direction.NORTH);
  });

  test("should throw an error for an invalid PLACE command format", () => {
    expect(() => simulator.executeCommand("PLACE")).toThrow(
      "Invalid PLACE command format: Please enter in this format => PLACE X,Y,Direction",
    );
  });

  test("should throw an error for PLACE command with invalid coordinates", () => {
    expect(() => simulator.executeCommand("PLACE A,B,NORTH")).toThrow(
      "Invalid PLACE command: Coordinates or direction is incorrect.",
    );
  });

  test("should throw an error for PLACE command with invalid direction", () => {
    expect(() => simulator.executeCommand("PLACE 1,2,NORTHERN")).toThrow(
      "Invalid PLACE command: Coordinates or direction is incorrect.",
    );
  });

  test("should move the robot if MOVE is called after PLACE", () => {
    simulator.executeCommand("PLACE 0,0,NORTH");
    simulator.executeCommand("MOVE");
    expect(robot).toHaveProperty("x", 0);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.NORTH);
  });

  test("should not move the robot off the table", () => {
    simulator.executeCommand("PLACE 0,0,SOUTH");
    expect(() => simulator.executeCommand("MOVE")).toThrow(
      "Bad Move!: Robot's about to fall off the table... Don't worry, I have got it covered!",
    );
  });

  test("should rotate the robot LEFT", () => {
    simulator.executeCommand("PLACE 1,1,NORTH");
    simulator.executeCommand("LEFT");
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.WEST);
  });

  test("should rotate the robot RIGHT", () => {
    simulator.executeCommand("PLACE 1,1,NORTH");
    simulator.executeCommand("RIGHT");
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.EAST);
  });

  test("should not execute MOVE before PLACE", () => {
    expect(() => simulator.executeCommand("MOVE")).toThrow(
      "Robot's not placed on the table!",
    );
  });

  test("should not execute LEFT before PLACE", () => {
    expect(() => simulator.executeCommand("LEFT")).toThrow(
      "Robot's not placed on the table!",
    );
  });

  test("should not execute RIGHT before PLACE", () => {
    expect(() => simulator.executeCommand("RIGHT")).toThrow(
      "Robot's not placed on the table!",
    );
  });

  test("should report the current position of the robot", () => {
    console.log = jest.fn();
    simulator.executeCommand("PLACE 2,3,EAST");
    simulator.executeCommand("REPORT");
    expect(console.log).toHaveBeenCalledWith("2,3,EAST");
  });

  test("should not execute empty command", () => {
    console.error = jest.fn();
    expect(() => simulator.executeCommand(" ")).toThrow(
      "Please enter a valid command",
    );
  });

  test("should ignore invalid commands", () => {
    console.error = jest.fn();
    simulator.executeCommand("INVALID");
    expect(console.error).toHaveBeenCalledWith("Invalid Command: ", "INVALID");
  });
});

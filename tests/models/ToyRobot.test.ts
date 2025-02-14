import { ToyRobot } from "../../src/models/ToyRobot";
import { Table } from "../../src/models/Table";
import { Direction } from "../../src/types/Direction";

describe("Robot Class", () => {
  let robot: ToyRobot;

  beforeEach(() => {
    const table = new Table();
    robot = new ToyRobot(table);
  });

  test("should place the robot at a valid position", () => {
    robot.place(1, 1, Direction.NORTH);
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.NORTH);
  });

  test("should not place the robot at an invalid position", () => {
    expect(() => robot.place(5, 5, Direction.NORTH)).toThrow(
      "Invalid position: Make sure 0 <= X < 5 and 0 <= Y < 5",
    );
  });

  test("should not allow the robot to move without having it placed", () => {
    expect(() => robot.move()).toThrow("Robot's not placed on the table!");
  });

  test("should not allow the robot to fall", () => {
    robot.place(4, 4, Direction.NORTH);
    expect(() => robot.move()).toThrow(
      "Bad Move!: Robot's about to fall off the table... Don't worry, I have got it covered!",
    );
  });

  test("should not report details if the robot is not placed on the table", () => {
    expect(() => robot.report()).toThrow("Robot's not placed on the table!");
  });

  test("should move robot north and report the current position details", () => {
    console.log = jest.fn();
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    expect(robot).toHaveProperty("x", 0);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.NORTH);

    robot.report();
    expect(console.log).toHaveBeenCalledWith("0,1,NORTH");
  });

  test("should move robot east", () => {
    robot.place(0, 0, Direction.EAST);
    robot.move();
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 0);
    expect(robot).toHaveProperty("direction", Direction.EAST);
  });

  test("should move robot south", () => {
    robot.place(1, 1, Direction.SOUTH);
    robot.move();
    expect(robot).toHaveProperty("x", 1);
    expect(robot).toHaveProperty("y", 0);
    expect(robot).toHaveProperty("direction", Direction.SOUTH);
  });

  test("should move robot west", () => {
    robot.place(1, 1, Direction.WEST);
    robot.move();
    expect(robot).toHaveProperty("x", 0);
    expect(robot).toHaveProperty("y", 1);
    expect(robot).toHaveProperty("direction", Direction.WEST);
  });

  test("should rotate robot left", () => {
    robot.place(0, 0, Direction.NORTH);
    robot.left();
    expect(robot).toHaveProperty("direction", Direction.WEST);
  });

  test("should rotate robot right", () => {
    robot.place(0, 0, Direction.NORTH);
    robot.right();
    expect(robot).toHaveProperty("direction", Direction.EAST);
  });
});

import { Direction } from "../types/Direction";
import { Table } from "./Table";

export class ToyRobot {
  private x: number | null = null;
  private y: number | null = null;
  private direction: Direction | null = null;
  private table: Table;

  private readonly directions: Direction[] = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST,
  ];

  constructor(table: Table) {
    this.table = table;
  }

  //set robot's x,y cordinates, facing in the directiojn provided
  place(x: number, y: number, direction: Direction): void {
    if (this.table.isValidPositionOnTable(x, y)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    } else {
      throw new Error(
        `Invalid position: Make sure 0 <= X < ${this.table.width} and 0 <= Y < ${this.table.height}`,
      );
    }
  }

  //Move by 1 unit in the current direction
  move(): void {
    if (this.x === null || this.y === null || this.direction === null) {
      throw new Error("Robot's not placed on the table!");
    }

    let tempX = this.x;
    let tempY = this.y;

    switch (this.direction) {
      case Direction.NORTH:
        tempY += 1;
        break;
      case Direction.EAST:
        tempX += 1;
        break;
      case Direction.SOUTH:
        tempY -= 1;
        break;
      case Direction.WEST:
        tempX -= 1;
        break;
    }

    if (this.table.isValidPositionOnTable(tempX, tempY)) {
      this.x = tempX;
      this.y = tempY;
    } else {
      throw new Error(
        "Bad Move!: Robot's about to fall off the table... Don't worry, I have got it covered!",
      );
    }
  }

  //Turn left 90 Degrees
  left(): void {
    if (this.direction !== null) {
      const currentIndex = this.directions.indexOf(this.direction);
      // Ensure circular rotation (anti-clockwise), using modulus Arithmetic
      this.direction = this.directions[(currentIndex - 1 + 4) % 4];
    } else {
      throw new Error("Robot's not placed on the table!");
    }
  }

  //Turn right 90 dgrees
  right(): void {
    if (this.direction !== null) {
      const currentIndex = this.directions.indexOf(this.direction);
      // Ensure circular rotation (clockwise), using modulus Arithmetic
      this.direction = this.directions[(currentIndex + 1) % 4];
    } else {
      throw new Error("Robot's not placed on the table!");
    }
  }

  //print the current position and direction details to the console
  report(): void {
    if (this.x !== null && this.y !== null && this.direction !== null) {
      console.log(`${this.x},${this.y},${this.direction}`);
    } else {
      throw new Error("Robot's not placed on the table!");
    }
  }
}

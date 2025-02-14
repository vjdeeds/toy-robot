import { Table } from "../../src/models/Table";

describe("Table Class", () => {
  beforeEach(() => {});

  test("should have the width and height set to 5,5", () => {
    const table = new Table();
    expect(table).toHaveProperty("width", 5);
    expect(table).toHaveProperty("height", 5);
  });

  test("should check if the position is within table's range", () => {
    const table = new Table();
    expect(table.isValidPositionOnTable(4, 3)).toEqual(true);
  });

  test("should check if the position is outside table's range", () => {
    const table = new Table(6, 5);
    expect(table.isValidPositionOnTable(7, 5)).toEqual(false);
  });

  test("should not allow invalid table size", () => {
    expect(() => new Table(0, 0)).toThrow(
      "Please enter a valid positive number for table width and height",
    );
    expect(() => new Table(0, -1)).toThrow(
      "Please enter a valid positive number for table width and height",
    );
    expect(() => new Table(-1, 0)).toThrow(
      "Please enter a valid positive number for table width and height",
    );
    expect(() => new Table(1.5, 0)).toThrow(
      "Please enter a valid positive number for table width and height",
    );
  });
});

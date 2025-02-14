export class Table {
  readonly width: number;
  readonly height: number;

  constructor(width: number = 5, height: number = 5) {
    //Cheks if the provided initial values are valid positive integers
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      throw new Error(
        "Please enter a valid positive number for table width and height",
      );
    }
    this.width = width;
    this.height = height;
  }

  //Function to check if the co-ordinates are valid wrt table size
  isValidPositionOnTable(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}

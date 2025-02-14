# toy-robot

A simple typescript application to simulate of a toy robot moving on a square tabletop of 5\*5

## Overview

- The app interacts with a user using **GUI**, and expects the following valid Commands.
- PLACE X,Y,Direction<North,South,East,West>: This will put the toy robot on the table in position X,Y and facing in the Direction provided
- MOVE: This will move the toy robot one unit forward in the direction it is currently facing.
- LEFT: This will rotate the robot 90 degrees in the left direction without changing the position of the robot.
- RIGHT: This will rotate the robot 90 degrees in the right direction without changing the position of the robot.
- REPORT: will announce the current X,Y and Direction of the robot.
- EXIT: Will exit the app GUI

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/vjdeeds/toy-robot.git
   cd toy-robot
   ```

2. Install necessary dependencies

```bash
   npm install
```

## Running the app

```bash
npm start
```

## Running Tests using Jest

```bash
   npm test
```

To test coverage:

```bash
  npm run test:coverage
```

---

### Notes

- Ensure that **Node.js** and **npm** are installed.
- The **Table** class takes a constructor params to initailize the size of the table, defaults to 5\*5

---

### Tech Stack

- TypeScript, Jest

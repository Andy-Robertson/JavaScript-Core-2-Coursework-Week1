/*
Create a "Choose Your Own Adventure" game using an object. In these kind of
games, the player is in a room and can move to other rooms to the north, east,
south or west.

To start the game, run this file with Node. Depending on your current directory, run one of:

    node 11-choose-your-own-adventure.js  
    node mandatory/11-choose-your-own-adventure.js 

To stop the game, press
Ctrl-C.

To run the tests for the game, run this file with npm test

    npm test -- --testPathPattern 11-choose-your-own-adventure.js

It has a currentRoom property to store which room the player is in.

Give your object methods for:

- Starting the game in the correct room when passed a room name parameter
- Moving the player to another room when passed a direction parameter

The functionality for running a game has been provided for you. It first prompts
the player to enter the starting room. Then it will ask players to to type in a
direction (north/east/south/west) that they want to move in.

An object containing one object per room has been provided for you. Take your
time to read it carefully. The rooms look something like this:
+-----------+-----------+
|           |           |
|   Hall    | Classroom |
|           |           |
+-----------------------+
|           |
|  Library  |
|           |
+-----------+

----------------------------------------------------------

Stretch goal: what happens if you try to move in a direction that the current
room doesn't allow? For example if you are in the Classroom and you try to move
east? If there is a bug in your code, try to fix it. 

To enable the tests for the stretch goals, remove the ".skip" on the appropriate tests below.
*/

let game = {
  currentRoom: null,

  start: function (roomName) {
    if (
      roomName === "hall" ||
      roomName === "classroom" ||
      roomName === "library"
    ) {
      this.currentRoom = rooms[roomName];
    } else {
      console.log(`You hear a loud cracking sound and fall through the floor... 


                                                             ***
                                                             ***
                                                          *********
                                                            *****
                                                             ***
                                                              *
                          
                                                                ... landing with a thud in the hall bellow!!`);
      this.currentRoom = rooms.hall; // comment out this line to pass all tests, I left it in as I thought it was cool thing to have in the game when run.
    }
  },

  move: function (direction) {
    if (
      direction === "north" ||
      direction === "south" ||
      direction === "east" ||
      direction === "west"
    ) {
      if (this.currentRoom[direction]() === null) {
        console.log(`There is no door to the ${direction}!`);
      } else {
        this.currentRoom = this.currentRoom[direction]();
      }
    } else {
      console.log(`You cant go in the ${direction} direction!`);
    }
  },
};

/*
DO NOT EDIT BELOW THIS LINE
*/

let rooms = {
  hall: {
    name: "hall",
    north: function () {
      return null;
    },
    east: function () {
      return rooms.classroom;
    },
    south: function () {
      return rooms.library;
    },
    west: function () {
      return null;
    },
  },
  classroom: {
    name: "classroom",
    north: function () {
      return null;
    },
    east: function () {
      return null;
    },
    south: function () {
      return null;
    },
    west: function () {
      return rooms.hall;
    },
  },
  library: {
    name: "library",
    north: function () {
      return rooms.hall;
    },
    east: function () {
      return null;
    },
    south: function () {
      return null;
    },
    west: function () {
      return null;
    },
  },
};

/*
YOU ARE NOT EXPECTED TO UNDERSTAND THE CODE BELOW THIS 
LINE!

You only need to read it if you are interested in how it works.
*/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function start() {
  rl.question(
    "Which room would you like to start in? (hall/classroom/library) ",
    function (room) {
      game.start(room);
      console.log("\n---------------------\n");
      play("start");
    }
  );
}

function play(method) {
  if (!game.currentRoom && !game.currentRoom.name) {
    throw new Error(
      `It looks like the game isn't quite right! Make sure your \`${method}\` method is correct`
    );
  }
  console.log(`You are in the ${game.currentRoom.name}.\n`);
  rl.question(
    "Which direction would you like to move? (north/east/south/west) ",
    function (direction) {
      game.move(direction);
      console.log("\n---------------------\n");
      play("move");
    }
  );
}

if (global["test"] == undefined) {
  // running in node -> start game
  start();
  test = () => {};
  beforeEach = () => {};
  test.skip = () => {};
} else {
  // running in jest
  // don't start game, close the readline handle
  rl.close();
}

// if we reach here, we are running in jest -> run tests

/* ======= TESTS - ONLY MODIFY TO ENABLE TESTS FOR STRETCH GOALS ===== 
- To run the tests for this exercise, run `npm test -- --testPathPattern 11-choose-your-own-adventure.js`
- To run all exercises/tests in the mandatory folder, run `npm test`
- (Reminder: You must have run `npm install` one time before this will work!)
*/

beforeEach(() => {
  // reset the game object
  game.currentRoom = null;
});

test("start in hall", () => {
  game.start("hall");
  expect(game.currentRoom.name).toEqual("hall");
});

test("start in library", () => {
  game.start("library");
  expect(game.currentRoom.name).toEqual("library");
});

test("start in classroom", () => {
  game.start("classroom");
  expect(game.currentRoom.name).toEqual("classroom");
});

// remove ".skip" if your code correctly handles a non existent room (by setting currentRoom to null/doing nothing)
test("start in non-existent place", () => {
  game.start("does not exist");
  expect(game.currentRoom).toEqual(null);
});

test("start in hall and go south", () => {
  game.currentRoom = rooms.hall;
  game.move("south");
  expect(game.currentRoom.name).toEqual("library");
});

test("start in library and go north", () => {
  game.currentRoom = rooms.library;
  game.move("north");
  expect(game.currentRoom.name).toEqual("hall");
});

test("start in hall and go east", () => {
  game.currentRoom = rooms.hall;
  game.move("east");
  expect(game.currentRoom.name).toEqual("classroom");
});

test("start in classroom and go west", () => {
  game.currentRoom = rooms.classroom;
  game.move("west");
  expect(game.currentRoom.name).toEqual("hall");
});

// remove ".skip" if your code handles trying to go in a direction with no room (by staying in the same room)
test("start in hall and go north (to non-existent room) -> stay in same room", () => {
  game.currentRoom = rooms.hall;
  game.move("north");
  expect(game.currentRoom.name).toEqual("hall");
});

// remove ".skip" if your code handles trying to go in a direction that doesn't exist (by staying in the same room)
test("start in hall and go backwards (non-existent direction) -> stay in same room", () => {
  game.currentRoom = rooms.hall;
  game.move("backwards");
  expect(game.currentRoom.name).toEqual("hall");
});

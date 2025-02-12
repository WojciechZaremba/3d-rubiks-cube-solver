function addCubeString(string) {
    solver.cubeToSolve.state = string
}
function solve() {
    for(let i = 0; i < 32; i++) {
        solver.search()
    }
    solver.updateCube()
}
function getSolvingMoves(arg) {

    // Format Fitting the Graphics Module:
    //
    // // {face: "green", lor: 1, dir: "x", clockwise: true}
    //
    // lor -1 ("left") for subtracting rotation from axis and +1 ("right") for adding the rotation
    // clockwise true when you face the side of a cube and it rotates right


    // Ancient Format From the Solving Algorithm:
    //
    // // class Turn { // every turn will be served as an object created by this class
    // //     constructor(face, turnClockWise = true, turn180 = false, step = "scrambling") {
    // //         this.step = step
    // //         this.faceToRotate = face
    // //         this.direction = turnClockWise
    // //         this.turn180 = turn180
    // //     }
    // //     execute(currentState) {
    // //         console.log("step", this.step)
    // //         return rotor(this.faceToRotate, currentState, indexes3x3, this.direction, this.turn180)
    // //     }
    // //     undo(currentState) {
    // //         console.log("step", this.step)
    // //         return rotor(this.faceToRotate, currentState, indexes3x3, !this.direction, this.turn180)
    // //     }
    // // }
    //
    // turn180 is always false - don't bother
    // faces are indexed in a similar way to the graphics module
    // turnClockWise determinsed direction when you face the side of a cube


    const ancientArray = solver.cubeToSolve.history
    const modernArray = []

    for (let i = 0; i < ancientArray.length; i++) {
        if (arg === "skipScrambling" && ancientArray[i].step === "scrambling") {
            continue
        }
       const faceFirstNum = ancientArray[i].faceToRotate[0]

       let face = ""
       let lor = 1
       let dir = "xyz"
       const clockwise = ancientArray[i].direction
       
       switch (faceFirstNum) {
            case 0:
                face = "orange"
                lor = clockwise ? 1 : -1
                dir = "z"
            break;
            case 9:
                face = "white"
                lor = clockwise ? -1 : 1
                dir = "y"
            break;
            case 18:
                face = "red"
                lor = clockwise ? -1 : 1
                dir = "z"
            break;
            case 27:
                face = "yellow"
                lor = clockwise ? 1 : -1
                dir = "y"
            break;
            case 36:
                face = "blue"
                lor = clockwise ? -1 : 1
                dir = "x"
            break;
            case 45:
                face = "green"
                lor = clockwise ? 1 : -1
                dir = "x"
            break;
       }
       modernArray.push({face, lor, dir, clockwise})
       
    }
    console.log(ancientArray)
    console.log(modernArray)
    return modernArray
}

function scrambleAgain() {
    solver.scrambleAgain()
}
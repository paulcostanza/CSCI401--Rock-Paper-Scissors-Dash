// "*" = wall
// " " = open space
// "p" = power up

// how to make levels unique
// time to complete
// color
// amount/types/frequency of power-ups
// a level where there are multiple bad guys chasing you 
// a slow-mo level where everyone moves really slow

const mapBrick = [
    //LEVEL1
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", " ", "*"],// OP IN 14TH
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", "*", "*", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", " ", "*", " ", " ", "*", "*", " ", " ", "*", "*", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", " ", " ", "*", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", "*", "*", " ", "*", " ", "*", " ", "*", "p", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", "*", "*", " ", " ", " ", "*", "*", "*"],
        ["*", " ", "*", " ", " ", " ", " ", "*", "*", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", " ", "*", "*", " ", " ", " ", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", "*", " ", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"] // OP IN 2ND 
    ],
    // // LEVEL2
    [
        ["*", "*", "*", "*", "*", " ", "*", "*", "*", "*", "*", "*", "*", "*", "*"], // OP IN 6TH
        ["*", " ", " ", " ", "*", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", " ", " ", "*", "*", "*", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", " ", " ", "*", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", "*", "*", " ", " ", "*", " ", "*", " ", " ", " ", " ", "*", "*", "*"],
        ["*", "*", " ", " ", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", "*", " ", " ", "*", "*", "*", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", "*", "*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", "*", " ", "*", "*", " ", "*", " ", "*", " ", "*", " ", "*", "*", "*"],
        ["*", " ", " ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", "p", "*", " ", "*", " ", " ", " ", " ", "*", "*", " ", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", "*", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", "*", "*", "*", "*", "*", "*", " ", "*", "*", "*", "*", "*", "*", "*"], //OP IN 8TH
    ],
    // // LEVEL3
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "*", "*", " ", " ", " ", " ", "*"],//OP IN 1ST
        ["*", "*", "*", "*", "*", " ", "*", " ", "*", "*", " ", " ", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", " ", "*", "*", "*", " ", "*", "*", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", "*", "*", " ", "*", " ", "*", " ", " ", " ", " ", "*", "*"],
        ["*", " ", " ", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", "*", " ", "*", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", " ", " ", " ", "*", "*", " ", "*", "*", "*", "*", "*", " ", "*"],
        ["*", " ", "*", "*", " ", "*", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", " ", " ", "*", " ", " ", " ", " ", "*", "p", " ", " ", " "],//OP IN 15TH
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ],
    // // LEVEL4
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", " ", "*"],//OP 14TH
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", "*", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", "*", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", "*", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", "p", "*", " ", "*"],
        ["*", "*", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", "*", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", " ", "*"],
    ],
    //LEVEL5
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", "*", "*", "*", "*", "*", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", " ", " ", " ", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", "*", "*", " ", "*", " ", "*", " ", "*"],
        [" ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", " ", "*", "p", "*", "*", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", " ", " ", " ", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", "*", "*", "*", "*", "*", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*", " ", " "],
        ["*", " ", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ],
    // //LEVEL6
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
        [" ", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*"],
        ["*", "p", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*"],
        ["*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " ", " ", "*", " ", " "],
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ],
    //LEVEL7
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", " ", " ", "p", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*", "*", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ],
    //LEVEL8
    [
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*"],
        ["*", " ", " ", "*", " ", "*", " ", " ", " ", "*", " ", "*", " ", " ", "*"],
        ["*", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "p", "*"],
        ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ],
]
export default mapBrick
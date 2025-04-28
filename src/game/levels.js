// components
import mapBrick from './moreLevels.js'
import score from './score.js'

// Character sprites
import paper0 from './Sprites/Paper0.png'
import rock0 from './Sprites/Rock0.png'
import scissors0 from './Sprites/Scissors0.png'
import paper1 from './Sprites/Paper1.png'
import paper2 from './Sprites/Paper2.png'
import paper3 from './Sprites/Paper3.png'
import scissors2 from './Sprites/Scissors2.png'

// classes
import PowerUp from './powerup.js'
import Pellet from './pellet.js'
import Character from './characters.js'
import Brick from './brick.js'
import Tunnel from './tunnel.js'

// functions
import { checkCharacterDirection, characterMeetsBrick } from './utilityFunctions.js'
import { getSelectedCharacter } from './selectedCharacter.js'

// events
import { lastKeyPressed, currentlyPressedKeys, mobileControls } from './eventListeners.js'

function runCanvas(level) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");  /// Store the 2D rendering context

  // game setup
  let userSpeedLimit = 4
  let badGuySpeed = 3
  let brickSize = 40

  let border = []
  let pellets = []
  let powerUps = []
  let tunnel1 = []
  let tunnel2 = []
  let tunnel3 = []
  mobileControls()
  let selected = getSelectedCharacter()
  
  let imageSrc;

   if (selected === "Paper") {
     imageSrc = [paper1, paper2, paper1, paper3];
   } else if (selected === "Rock") {
     imageSrc = [rock0];
   } else if (selected === "Scissors") {
     imageSrc = [scissors0, scissors2];
   }
  const paper = new Character({
    position: {
      x: 62.5,
      y: 62.5
    },
    velocity: {
      x: 0,
      y: 0
    },
	imageSrc: imageSrc
  }, ctx)
  
  if(selected !== "Rock"){
        imageSrc = [rock0];
    	}
    	else{
    	imageSrc = [paper1, paper2, paper1, paper3];
    	}
  
  const rock = new Character({
      position: {
        x: 542.5,
        y: 62.5
      },
      velocity: {
        x: 5,
        y: 0
      },
  	imageSrc: imageSrc
    }, ctx)

	if (selected !== "Scissors"){
	      	imageSrc = [scissors0, scissors2];
	  	}
	  	else{
			imageSrc = [paper1, paper2, paper1, paper3];
	  	}	
    const scissors = new Character({
      position: {
        x: 542.5,
        y: 542.5
      },
      velocity: {
        x: 5,
        y: 0
      },
  	  imageSrc: imageSrc
    }, ctx)

  function pelletCollision(character, pellet, s) {
	if (Math.hypot(character.position.x - pellet.positionX, character.position.y - pellet.positionY) < 10) {
	        pellets.splice(pellets.indexOf(pellet), 1)
	        // score gets updated here
			if (s == 1){
	        	score(10)
			}
	      }
  }
  
  function checkCharacterLocation(character, tunnel) {
	if(!character.tunnelCooldown){
    	if (character.position.x > tunnel[0].x-(brickSize /2) && character.position.x < tunnel[0].x+(brickSize/2) && character.position.y > tunnel[0].y-(brickSize /2) && character.position.y < tunnel[0].y+(brickSize /2)) {
      		character.position.x = tunnel[1].x+2.5
      		character.position.y = tunnel[1].y+2.5
			character.tunnelCooldown = true;
			setTimeout(() => character.tunnelCooldown = false, 100);
    	} else if (character.position.x > tunnel[1].x-(brickSize /2) && character.position.x < tunnel[1].x+(brickSize /2) && character.position.y > tunnel[1].y-(brickSize /2) && character.position.y < tunnel[1].y+(brickSize /2)) {
	  		character.position.x = tunnel[0].x+2.5
	  		character.position.y = tunnel[0].y+2.5
			character.tunnelCooldown = true;
            setTimeout(() => character.tunnelCooldown = false, 100);
		}  
	if(character.position.x < 0 || character.position.x > 600 || character.position.y < 0 || character.position.y > 600)
		{
		character.position.x = 62.5
		character.position.y = 62.5
		}
  	}
  }

  

  const badGuys = [rock, scissors]

  mapBrick[level].forEach((row, i) => {
    row.forEach((column, j) => {

      // wall == *, in the array
      if (column === "*") {
        let testBrick = new Brick(brickSize * j, brickSize * i, ctx)
        border.push(testBrick)
      } else if (column === " ") {
        let testPellet = new Pellet(brickSize * j + (brickSize / 2) - 2.5, brickSize * i + (brickSize / 2) - 2.5, ctx) // 2.5: half the pellet sq size
        pellets.push(testPellet)

        // Power up - lowercase 'p'
      } else if (column === "p") {
        let testPowerUp = new PowerUp(brickSize * j + (brickSize / 2) - 12.5, brickSize * i + (brickSize / 2) - 12.5, ctx) // 12.5: half the powerup sq size
        powerUps.push(testPowerUp)
      }
	  else if (column === "o1") {
		let testTunnel = new Tunnel(brickSize * j + (brickSize / 2), brickSize * i + (brickSize / 2))				
		tunnel1.push(testTunnel)
	  }
	  else if (column === "o2") {
	    let testTunnel = new Tunnel(brickSize * j + (brickSize / 2), brickSize * i + (brickSize / 2))	
	    tunnel2.push(testTunnel)
	  }
	  else if (column === "o3") {
	  	let testTunnel = new Tunnel(brickSize * j + (brickSize / 2), brickSize * i + (brickSize / 2))	
	    tunnel3.push(testTunnel)
	  }
    })
  })

  function animate() {

    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (tunnel1.length > 0) {
		checkCharacterLocation(paper, tunnel1);
		checkCharacterLocation(rock, tunnel1);
		checkCharacterLocation(scissors, tunnel1);
	}

	if (tunnel2.length > 0) {
		checkCharacterLocation(paper, tunnel2);
		checkCharacterLocation(rock, tunnel2);
		checkCharacterLocation(scissors, tunnel2);
	}

	if (tunnel3.length > 0) {
		checkCharacterLocation(paper, tunnel3);
		checkCharacterLocation(rock, tunnel3);
		checkCharacterLocation(scissors, tunnel3);
	}
    // makes character move depending on the key that is pressed
    if (currentlyPressedKeys.w.pressed && lastKeyPressed === 'w' ||
      currentlyPressedKeys.ArrowUp.pressed && lastKeyPressed === 'ArrowUp'
    ) {
      for (let i = 0; i < border.length; i++) {
        const brickPart = border[i]
        if (characterMeetsBrick({ circle: { ...paper, velocity: { x: 0, y: -4 } }, rectangle: brickPart })) {
          paper.velocity.y = 0;
          break
        } else {
          paper.velocity.y = -userSpeedLimit
        }
      }
    } else if (currentlyPressedKeys.s.pressed && lastKeyPressed === 's' ||
      currentlyPressedKeys.ArrowDown.pressed && lastKeyPressed === 'ArrowDown'
    ) {
      for (let i = 0; i < border.length; i++) {
        const brickPart = border[i]
        if (characterMeetsBrick({ circle: { ...paper, velocity: { x: 0, y: 4 } }, rectangle: brickPart })) {
          paper.velocity.y = 0
          break
        } else {
          paper.velocity.y = userSpeedLimit
        }
      }
    } else if (currentlyPressedKeys.a.pressed && lastKeyPressed === 'a' ||
      currentlyPressedKeys.ArrowLeft.pressed && lastKeyPressed === 'ArrowLeft'
    ) {
      for (let i = 0; i < border.length; i++) {
        const brickPart = border[i]
        if (characterMeetsBrick({ circle: { ...paper, velocity: { x: -4, y: 0 } }, rectangle: brickPart })) {
          paper.velocity.x = 0
          break
        } else {
          paper.velocity.x = -userSpeedLimit
        }
      }
    } else if (currentlyPressedKeys.d.pressed && lastKeyPressed === 'd' ||
      currentlyPressedKeys.ArrowRight.pressed && lastKeyPressed === 'ArrowRight'
    ) {
      for (let i = 0; i < border.length; i++) {
        const brickPart = border[i]
        if (characterMeetsBrick({ circle: { ...paper, velocity: { x: 4, y: 0 } }, rectangle: brickPart })) {
          paper.velocity.x = 0
          break
        } else {
          paper.velocity.x = userSpeedLimit
        }
      }
    }

    // render powerups
    powerUps.forEach(powerup => {
      powerup.draw()

      if (Math.hypot(paper.position.x - powerup.positionX, paper.position.y - powerup.positionY) < 20) {
        powerUps.splice(powerUps.indexOf(powerup), 1)

        userSpeedLimit = 7.5

        // testing speed powerup
        setTimeout(function () {

          // return to standard speed
          userSpeedLimit = 4
        }, 10000);
      }
    })

    // render pellets
    pellets.forEach(pellet => {
      pellet.draw()

      // COLLISION DETECTION TEMPLATE
      // a^2 + b^2 = c^
      // subtract x's and y's to get distance
	  pelletCollision(paper, pellet, 1)
	  pelletCollision(rock, pellet, 0)
	  pelletCollision(scissors, pellet, 0)

      
	  

      // triggers next level if you collect all the pellets
      if (pellets.length === 0) {
        console.log('no more pellets!')
        runCanvas(level + 1)
      }

    })

    border.forEach(brick => {
      brick.drawBrick()

      // Check for collision based on movement direction
      if (checkCharacterDirection(paper, brick)) {
        if (characterMeetsBrick({ circle: paper, rectangle: brick })) {
          paper.velocity.x = 0;
          paper.velocity.y = 0;
        }
      }
    })
    paper.move()

    // Badguy AI
    // how do you make the AI characters move?
    // collision detection: track bad guy collisions at any point in time
    // let bad guy move in a direction that is open
    // if border appears, check for opening
    // move that way
    badGuys.forEach(dude => {

      const collisions = []
      const openPath = []
      let direction

      // bad guy goes up
      if (dude.velocity.y < 0) {
        for (let i = 0; i < border.length; i++) {
          const brickPart = border[i]
          if (characterMeetsBrick({ circle: { ...dude, velocity: { x: 0, y: -5 } }, rectangle: brickPart })) {

            openPath.push('down', 'right', 'left')

            direction = openPath[Math.floor(Math.random() * 3)]

            switch (direction) {
              case 'down':
                dude.velocity.x = 0
                dude.velocity.y = badGuySpeed
                break
              case 'up':
                dude.velocity.x = 0
                dude.velocity.y = -1 * badGuySpeed
                break
              case 'right':
                dude.velocity.x = badGuySpeed
                dude.velocity.y = 0
                break
              case 'left':
                dude.velocity.x = -1 * badGuySpeed
                dude.velocity.y = 0
                break
            }

            openPath.splice(0, 3)
          }
        }

        // bad guy goes down
      } else if (dude.velocity.y > 0) {
        for (let i = 0; i < border.length; i++) {
          const brickPart = border[i]
          if (characterMeetsBrick({ circle: { ...dude, velocity: { x: 0, y: 5 } }, rectangle: brickPart })) {

            openPath.push('up', 'right', 'left')

            direction = openPath[Math.floor(Math.random() * 3)]

            switch (direction) {
              case 'down':
                dude.velocity.x = 0
                dude.velocity.y = badGuySpeed
                break
              case 'up':
                dude.velocity.x = 0
                dude.velocity.y = -1 * badGuySpeed
                break
              case 'right':
                dude.velocity.x = badGuySpeed
                dude.velocity.y = 0
                break
              case 'left':
                dude.velocity.x = -1 * badGuySpeed
                dude.velocity.y = 0
                break
            }

            openPath.splice(0, 3)
          }
        }

        // bad guy goes left
      } else if (dude.velocity.x < 0) {
        for (let i = 0; i < border.length; i++) {
          const brickPart = border[i]
          if (characterMeetsBrick({ circle: { ...dude, velocity: { x: -5, y: 0 } }, rectangle: brickPart })) {

            openPath.push('up', 'right', 'down')

            direction = openPath[Math.floor(Math.random() * 3)]

            switch (direction) {
              case 'down':
                dude.velocity.x = 0
                dude.velocity.y = badGuySpeed
                break
              case 'up':
                dude.velocity.x = 0
                dude.velocity.y = -1 * badGuySpeed
                break
              case 'right':
                dude.velocity.x = badGuySpeed
                dude.velocity.y = 0
                break
              case 'left':
                dude.velocity.x = -1 * badGuySpeed
                dude.velocity.y = 0
                break
            }

            openPath.splice(0, 3)
          }
        }

        // bad guy goes right
      } else if (dude.velocity.x > 0) {
        for (let i = 0; i < border.length; i++) {
          const brickPart = border[i]

          if (characterMeetsBrick({ circle: { ...dude, velocity: { x: 5, y: 0 } }, rectangle: brickPart })) {

            openPath.push('up', 'down', 'left')

            direction = openPath[Math.floor(Math.random() * 3)]

            switch (direction) {
              case 'down':
                dude.velocity.x = 0
                dude.velocity.y = badGuySpeed
                break
              case 'up':
                dude.velocity.x = 0
                dude.velocity.y = -1 * badGuySpeed
                break
              case 'right':
                dude.velocity.x = badGuySpeed
                dude.velocity.y = 0
                break
              case 'left':
                dude.velocity.x = -1 * badGuySpeed
                dude.velocity.y = 0
                break
            }

            openPath.splice(0, 3)
          }
        }
      }

      dude.move()
    })

  }

  animate()
}

export default runCanvas
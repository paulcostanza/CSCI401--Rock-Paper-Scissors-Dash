class Character {
    constructor({ position, velocity, imageSrc }, ctx) {
        this.position = position
        this.velocity = velocity
        this.imageSrc = imageSrc
        this.radius = 15
        this.image = new Image()
        this.image.src = this.imageSrc[0]
        this.frameindex = 0
        this.angle = 0;
        this.ctx = ctx
        this.state = 'active'
        this.tunnelCooldown = false;
        this.prevCollisions = [] // for badguy's AI

        // setInterval(() => {
        //     if (this.velocity.x != 0 || this.velocity.y != 0) {
        //         this.frameindex = (this.frameindex + 1) % this.imageSrc.length
        //         this.image.src = this.imageSrc[this.frameindex]
        //     }
        // }, 250)
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(
            this.image,
            - this.radius,
            - this.radius,
            this.radius * 2,
            this.radius * 2
        );
        this.ctx.restore();
    }

    move() {
        if (this.velocity.x > 0) this.angle = 0; // Moving right
        if (this.velocity.x < 0) this.angle = Math.PI; // Moving left
        if (this.velocity.y > 0) this.angle = Math.PI / 2; // Moving down
        if (this.velocity.y < 0) this.angle = -Math.PI / 2; // Moving up
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    update() {
        switch (this.state) {
            case 'alive':
                break
            case 'bluntForceTrauma':
                break
            case 'firstDegreeMurder':
                this.state = 'death'
        }
    }

}

export default Character
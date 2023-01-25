class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, backwards, loop, speed) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, backwards, loop, speed});
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;

    }

    drawFrame(TICK, ctx, x, y, cale) {

        this.elapsedTime += TICK * this.speed;
         if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        if(this.elapsedTime > this.totalTime) reset();
        const frame = this.currentFrame();

        if(this.backwards){
            ctx.save();
            ctx.scale(-1,1);

            ctx.drawImage(this.spritesheet, this.xStart + this.width * frame, this.yStart, this.width, this.height, -x - this.width, y, this.width * scale, this.height * scale)
            ctx.restore();
        }else
            ctx.drawImage(this.spritesheet, this.xStart + this.width * frame, this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale)

    }
    reset() {
        this.elapsedTime -= this.totalTime;
    }
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }

    isAlmostDone(TICK) {
        return (this.elapsedTime + 1 >= this.totalTime);
    }
}

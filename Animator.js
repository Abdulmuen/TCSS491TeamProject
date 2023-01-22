class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, backwards, loop) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, backwards, loop});
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;

    }

    drawFrame(tick, ctx, x, y, scale) {

        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime){
            if(this.loop){
                this.elapsedTime -= this.totalTime;
            }else
                return this.isDone;
        }
        const frame = this.currentFrame();

        if(this.backwards){
            ctx.save();
            ctx.scale(-1,1);

            ctx.drawImage(this.spritesheet, this.xStart + this.width * frame, this.yStart, this.width, this.height, -x - this.width, y, this.width * scale, this.height * scale)
            ctx.restore();
        }else
            ctx.drawImage(this.spritesheet, this.xStart + this.width * frame, this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale)

    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}
//@ts-nocheck
interface FloatHoriComp {
    leftMove: number,
    rightMove: number,
    speed: number,
    dir: number
}

export const FloatHori = (_input: FloatHoriComp) => {
    let {leftMove, rightMove, dir, speed} = _input
    let leftLimit;
    let rightLimit;

    return {
        id: "floatHori",
        require: [
            "area",
            "pos"
        ],
        add() {
            leftLimit = this.pos.x - leftMove;
            rightLimit = this.pos.x + rightMove;
        },
        update() {
            this.move(dir * speed, 0);
            if(this.pos.x >= rightLimit || this.pos.x <= leftLimit)
            {
                dir = -dir
            }
        }
    }
}
import k from "../kaboom"
import Matter from 'matter-js'
import type { PosComp, RectComp, RotateComp } from 'kaboom'

interface FloatHoriComp {
    leftMove: number,
    rightMove: number,
    speed: number,
    dir: number
}

export const FloatHori = (_input: FloatHoriComp) => {
    let {leftMove, rightMove, dir, speed} = _input
    let leftLimit: number;
    let rightLimit: number;

    return {
        id: "floatHori",
        require: [
            "area",
            "pos"
        ],
        add(this: PosComp) {
            leftLimit = this.pos.x - leftMove;
            rightLimit = this.pos.x + rightMove;
        },
        update(this: PosComp) {
            this.move(dir * speed, 0);
            if(this.pos.x >= rightLimit || this.pos.x <= leftLimit)
            {
                dir = -dir
            }
        }
    }
}

export function MatterRect (engine: Matter.Engine, options = {}, w = 32, h = 32) {
    let rectbody: Matter.Body | undefined
    return {
        id: "MatterRect",
        require: [
            "pos"
        ],
        add(this: PosComp & RectComp & RotateComp) {
            const { x, y } = this.pos;
            const { width = w, height = h } = this
            rectbody = Matter.Bodies.rectangle(
                x,
                y,
                width,
                height,
                options
            )
            Matter.Composite.add(engine.world, rectbody)
        },
        update(this: PosComp & RectComp & RotateComp) {
            if(!rectbody)
            {
                return
            }

            this.pos.x = rectbody.position.x;
            this.pos.y = rectbody.position.y;
            this.angle = k.rad2deg(rectbody.angle);           
        }
    }
}
import k from "../kaboom"
import Matter from 'matter-js'
import type { PosComp, RectComp, RotateComp, SpriteComp } from 'kaboom'

interface FloatHoriInput {
    xrange: number,
    delay: number
}

type MatterRectComp = PosComp & RectComp & RotateComp;
type MatterSpriteComp = PosComp & RotateComp & SpriteComp;

export const FloatHori = (_input: FloatHoriInput) => {
    let {xrange, delay} = _input
    let leftLimit: number;
    let rightLimit: number;

    return {
        id: "FloatHori",
        require: [
            "area",
            "pos"
        ],
        add(this: PosComp) {
            leftLimit = this.pos.x - xrange;
            rightLimit = this.pos.x + xrange;
        },
        update(this: PosComp) {
            this.pos.x = wave(leftLimit, rightLimit, time() + delay);
        },
        setDelay(_num: number) {
            delay = _num
        },
        setXRange(_num: number) {
            xrange = _num
        }
    }
}

export function MatterSprite (engine: Matter.Engine, options = {}, w = 32, h = 32) {
    let spriteBody: Matter.Body | undefined
    return {
        id: "MatterSprite",
        require: [
            "pos",
            "rotate",
            "sprite"
        ],
        matterMove (_movex: number, _movey: number) {
            if(!spriteBody)
            {
                return
            }
            spriteBody.position.x += _movex;
            spriteBody.position.y += _movey;

            debug.log(`${spriteBody.position.x}`);
        },
        add (this: MatterSpriteComp) {
            const {x, y} = this.pos;
            // const {width = w, height = h} = this;
            // console.log(`width: ${w}`)
            // console.log(`height: ${height}`)
            spriteBody = Matter.Bodies.rectangle(
                x,
                y,
                w,
                h,
                options
            )
            Matter.Composite.add(engine.world, spriteBody)
        },
        update (this: MatterSpriteComp) {
            if(!spriteBody)
            {
                return
            }
            Matter.Body.setAngle(spriteBody, 0);
            
            this.pos.x = spriteBody.position.x;
            this.pos.y = spriteBody.position.y;
            this.angle = k.rad2deg(spriteBody.angle);
        }
    }
}

export function MatterRect (engine: Matter.Engine, options = {}, w = 32, h = 32) {
    let rectbody: Matter.Body | undefined
    return {
        id: "MatterRect",
        require: [
            "pos",
            "rect",
            "rotate"
        ],
        add(this: MatterRectComp) {
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
        update(this: MatterRectComp) {
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
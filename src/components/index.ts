import k from "../kaboom"
import Matter from 'matter-js'
import type { PosComp, RectComp, RotateComp, SpriteComp } from 'kaboom'

interface FloatHoriInput {
    leftX: number,
    rightX: number,
    delay: number
}

interface FloatVertInput {
    upY: number,
    downY: number,
    delay: number
}

type MatterRectComp = PosComp & RectComp & RotateComp;
type MatterSpriteComp = PosComp & RotateComp & SpriteComp;

export const FloatVert = (_input: FloatVertInput) => {
    let { upY, downY, delay } = _input;
    let upLimit: number;
    let downLimit: number;

    return {
        id: "FloatVert",
        require: [
            "area",
            "pos"
        ],
        add(this: PosComp) {
            upLimit = this.pos.y - upY;
            downLimit = this.pos.y + downY;
        },
        update(this: PosComp) {
            this.pos.y = wave(upLimit, downLimit, time() + delay);
        },
        setDelay(_value: number) {
            delay = _value;
        },
        setUpY(_value: number) {
            upY = _value;
        },
        setDownY(_value: number) {
            downY = _value;
        }
    }
}

export const FloatHori = (_input: FloatHoriInput) => {
    let {leftX, rightX, delay} = _input
    let leftLimit: number;
    let rightLimit: number;

    return {
        id: "FloatHori",
        require: [
            "area",
            "pos"
        ],
        add(this: PosComp) {
            leftLimit = this.pos.x - leftX;
            rightLimit = this.pos.x + rightX;
        },
        update(this: PosComp) {
            this.pos.x = wave(leftLimit, rightLimit, time() + delay);
        },
        setDelay(_num: number) {
            delay = _num
        },
        setLeftX(_value: number) {
            leftX = _value;
        },
        setRightX(_value: number) {
            rightX = _value;
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
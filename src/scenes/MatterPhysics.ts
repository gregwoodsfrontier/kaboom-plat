import k from "../kaboom"
import Matter from "matter-js";
import { MatterRect, MatterSprite } from "../components";
import { TILE_UNIT, SCALE } from "../levels/config";

const MatterPhysics = () => {
    const engine = Matter.Engine.create()

    const play = createPlayer(engine, k.width()*0.5, k.height()*0.5 );
    
    console.log(play.width)

    // play.sayHi();

    // add blue platform
    k.add([
        k.pos(
            k.width() * 0.5,
            k.height() * 0.75
        ),
        k.rect(
            128,
            32
        ),
        k.origin('center'),
        k.rotate(0),
        k.color(
            0, 0, 255
        ),
        MatterRect(engine, {
            isStatic: true
        })
    ]);

    k.onKeyDown("left", () => {
        play.matterMove(-1, 0)
    })

    k.onKeyDown("right", () => {
        play.matterMove(1, 0)
    })

    /* k.onKeyDown("space", () => {
        play.matterMove(0, -1)
    }) */

    k.onKeyRelease(["left", "right"], () => {
        play.matterMove(0, 0)
    })

    k.onUpdate(() => {
        Matter.Engine.update(engine, k.dt() * 1000);
    })
}

// when mattersprite is enabled, the sprite disapppears

const createPlayer = (_engine: Matter.Engine, x = 0, y = 0) => {
    return k.add([
        sprite("hero", { anim: "idle" }),
        pos(x, y),
        area(),
        scale(SCALE),
        rotate(0),
        k.origin('center'),
        "player",
        MatterSprite(_engine, 
        TILE_UNIT*SCALE, 
        TILE_UNIT*SCALE
        )
    ])
}

const createRedRect = (engine: Matter.Engine) => {
    return k.add([
        k.pos(
            k.width() * 0.5,
            k.height() * 0.5
        ),
        k.rect(
            32,
            32
        ),
        k.rotate(0),
        k.origin('center'),
        k.color(
            255, 0, 0
        ),
        MatterRect(engine)
    ]);
}

export default MatterPhysics
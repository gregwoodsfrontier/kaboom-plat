import k from "../kaboom"
import Matter from "matter-js";
import { MatterRect } from "../components";

const MatterPhysics = () => {
    const engine = Matter.Engine.create()

    const red = k.add([
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

    // add blue platform
    k.add([
        k.pos(
            k.width() * 0.5 - 64,
            k.height() * 0.75
        ),
        k.rect(
            128,
            32
        ),
        k.origin('center'),
        k.color(
            0, 0, 255
        ),
        MatterRect(engine, {
            isStatic: true
        })
    ]);

    k.onUpdate(() => {
        Matter.Engine.update(engine, k.dt() * 1000);
        if(red.pos.y >= k.height())
        {
            k.go("matterphysics")
        }
    })
}

export default MatterPhysics
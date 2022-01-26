import k from "../kaboom"
import layout from "../levels"
import levelConfig from "../levels/config"

const Game = (levelIdx: number) => {
    // add a sprite
    /* k.add([
        k.sprite("hero", { anim: "idle" }),
        k.area(),
        k.solid(),
        k.origin("center"),
        k.pos( k.width()/2, k.height()/2 ),
        k.scale(3,3)
    ]) */

    k.addLevel(layout[levelIdx], levelConfig)
    
}

export default Game
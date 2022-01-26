import k from "../kaboom"
import layout from "../levels"
import levelConfig from "../levels/config"

const SPEED = 100

const Game = (levelIdx: number) => {
    const map = k.addLevel(layout[levelIdx], levelConfig);

    // add a sprite
    const player = k.add([
        k.sprite("hero", { anim: "idle" }),
        k.pos( map.getPos(2, 8) ),
        k.area(),
        k.body(),
        k.origin("center"),
        k.scale(3,3)
    ]);

    /* const dirs = {
        "left": LEFT,
        "right": RIGHT,
        "up": UP,
        "down": DOWN,
    } */

    k.onKeyDown("left", () => {
        player.move(-SPEED, 0);
        player.flipX(true)
    })
    
    k.onKeyDown("right", () => {
        player.move(SPEED, 0);
        player.flipX(false);
    })

    k.onKeyRelease(["left", "right"], () => {
        player.play("idle");
    })

    k.onKeyPress(["left", "right"], () => {
        player.play("run")
    })
    
}

export default Game
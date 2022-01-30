import k from "../kaboom"
import layout from "../levels"
import levelConfig from "../levels/config"

const SPEED = 150
const JUMP_FORCE = 600

const Game = (levelIdx: number) => {
    const map = k.addLevel(layout[levelIdx], levelConfig);

    // add a sprite
    const player = k.add([
        k.sprite("hero", { anim: "idle" }),
        k.pos( map.getPos(2, 14) ),
        k.area(),
        k.body(),
        k.origin("center"),
        k.scale(3,3)
    ]);

    k.onKeyDown("left", () => {
        player.move(-SPEED, 0);
        player.flipX(true)
    })
    
    k.onKeyDown("right", () => {
        player.move(SPEED, 0);
        player.flipX(false);
    })

    k.onKeyRelease(["left", "right", "up"], () => {
        player.play("idle");
    })

    k.onKeyPress(["left", "right"], () => {
        player.play("run")
    })

    k.onKeyPress("up", () => {
        if(player.isGrounded())
        {
            player.jump(JUMP_FORCE)
            player.play("jump")
        }
    })
    
    player.onCollide("big-door", () => {
        if(levelIdx < layout.length)
        {
            go("game", levelIdx + 1)
        }
        else
        {
            go("win")
        }
    })
}

export default Game
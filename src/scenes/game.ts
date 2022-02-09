import { GameObj } from "kaboom"
import k from "../kaboom"
import layout from "../levels"
import levelConfig from "../levels/config"

const SPEED = 150
const JUMP_FORCE = 800 //600

const Game = (levelIdx: number) => {
    const map = k.addLevel(layout[levelIdx], levelConfig);
    let hasBigKey = false;
    // let hasSmallKey = false;

    // add a sprite
    const player = k.add([
        k.sprite("hero", { anim: "idle" }),
        k.pos( map.getPos(2, 13) ),
        k.area(),
        k.body(),
        k.origin("center"),
        k.scale(3,3),
        "player"
    ]);

    defineControls(player);

    const period = 2;
    let time = period;

    /* const plat = get("float")

    onUpdate("float", (f) => {
        f.move(0, f.dir * f.speed)
    })

    loop(period, () => {
        plat.forEach((e) => {
            e.dir = -e.dir
        })
    }) */
    


    player.onCollide("big-key", (bigKey: GameObj) => {
        destroy(bigKey);
        hasBigKey = true;
        console.log('player has big key')
    })

    player.onGround(() => {
        player.play("idle")
    })
    
    player.onCollide("big-door", () => {
        if(hasBigKey)
        {
            hasBigKey = false;

            if(levelIdx < layout.length)
            {
                go("game", levelIdx + 1)
            }
            else
            {
                go("win")
            }
        }
        else
        {
            return
        }
    })
}

const defineControls = (_player: GameObj) => {
    k.onKeyDown("left", () => {
        _player.move(-SPEED, 0);
        _player.flipX(true)
    })
    
    k.onKeyDown("right", () => {
        _player.move(SPEED, 0);
        _player.flipX(false);
    })

    k.onKeyRelease(["left", "right"], () => {
        _player.play("idle");
    })

    k.onKeyPress(["left", "right"], () => {
        _player.play("run")
    })

    k.onKeyPress("up", () => {
        if(_player.isGrounded())
        {
            _player.jump(JUMP_FORCE);
            _player.play("jump");
        }
    })
}

export default Game
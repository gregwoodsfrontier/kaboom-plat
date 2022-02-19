import { GameObj } from "kaboom"
import k from "../kaboom"
import layout from "../levels"
import { TILE_UNIT } from "../levels/config"
import levelConfig from "../levels/config"
import { FloatHori } from "../components"

// const PBHS = 0.8 // PLAYER BODY HEIGHT SCALE
const SPEED = 180
const JUMP_FORCE = 800 //600

const Game = (levelIdx: number) => {
    const map = k.addLevel(layout[levelIdx], levelConfig);
    let hasBigKey = false;
    // let hasSmallKey = false;

    // add a sprite
    const player = get("player")[0]

    defineControls(player);

    const floating = get("float");
    if(floating[0])
    {
        floating[0].setDelay(1.2);
    }

    player.onCollide("big-key", (bigKey: GameObj) => {
        destroy(bigKey);
        hasBigKey = true;
        console.log('player has big key')
    })

    player.onGround(() => {
        player.play("idle")
    })

    player.onCollide("danger", () => {
        debug.log("player collide spikes");

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
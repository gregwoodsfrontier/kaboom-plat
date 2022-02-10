import { GameObj } from "kaboom"
import k from "../kaboom"
import layout from "../levels"
import { TILE_UNIT } from "../levels/config"
import levelConfig from "../levels/config"
import { FloatHori } from "../components"

// const PBHS = 0.8 // PLAYER BODY HEIGHT SCALE
const SPEED = 150
const JUMP_FORCE = 800 //600

const Game = (levelIdx: number) => {
    const map = k.addLevel(layout[levelIdx], levelConfig);
    let hasBigKey = false;
    // let hasSmallKey = false;

    // add a sprite
    const player = get("player")[0]

    defineControls(player);

    // create Platform
    k.add([
        sprite("gnd-solo"),
        scale(3,3),
        k.area({height:8}),
        k.solid(),
        k.pos(map.getPos(10, 10)),
        FloatHori({
            leftMove: 9 * TILE_UNIT,
            rightMove:  9 * TILE_UNIT,
            dir: 1,
            speed: TILE_UNIT * 5
        }),
        "float"
    ]);

    k.add([
        sprite("gnd-solo"),
        scale(3,3),
        k.area({height:8}),
        k.solid(),
        k.pos(map.getPos(7, 6)),
        FloatHori({
            leftMove: 6 * TILE_UNIT,
            rightMove:  9 * TILE_UNIT,
            dir: -1,
            speed: TILE_UNIT * 5
        }),
        "float"
    ]);



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
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
        k.pos( map.getPos(15, 13) ),
        k.area({height:16*0.8, offset:vec2(0,16*(1-0.8)*2)}),
        k.body(),
        k.origin("center"),
        k.scale(3,3),
        "player"
    ]);

    defineControls(player);

    const plat_a = k.add([
        sprite("gnd-solo"),
        scale(3,3),
        k.area({height:8}),
        k.solid(),
        k.pos(map.getPos(10, 10)),
        "float"
    ])
    


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
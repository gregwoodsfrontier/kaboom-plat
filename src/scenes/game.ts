import { GameObj } from "kaboom"
import k from "../kaboom"
import layout from "../levels"
import { TILE_UNIT } from "../levels/config"
import levelConfig from "../levels/config"

const PBHS = 0.8 // PLAYER BODY HEIGHT SCALE
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
        k.area({
            height: TILE_UNIT * PBHS, 
            offset: vec2( 0, TILE_UNIT * (1 - PBHS) * 2)
        }),
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
        "float",
        {
            leftX: map.getPos(8, 10).x,
            rightX: map.getPos(12, 10).x,
            upY: map.getPos(10, 6).y,
            downY: map.getPos(10, 11).y,
            dir: 1,
            speed: TILE_UNIT * 5
        }
    ])

    plat_a.onUpdate(() => {
        const {upY, downY, speed} = plat_a
        /* plat_a.move(0, plat_a.dir * speed);
        if(plat_a.pos.y >= downY || plat_a.pos.y <= upY)
        {
            plat_a.dir *= -1
        } */
        plat_a.move(plat_a.dir * speed, 0);
        if(plat_a.pos.x >= plat_a.rightX || plat_a.pos.x <= plat_a.leftX)
        {
            plat_a.dir *= -1
        }
    })




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
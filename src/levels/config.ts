import { FloatHori, FloatVert } from "../components"
import k from "../kaboom"

export const SCALE = 3
export const TILE_UNIT = 16
const TILE_WIDTH = TILE_UNIT * SCALE
const TILE_HEIGHT = TILE_UNIT * SCALE
const PBHS = 0.8 // PLAYER BODY HEIGHT SCALE

const levelConfig = {
    pos: vec2(0, TILE_HEIGHT),
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    "E": () => [
        sprite("gnd-three-all"),
        area({
            height: TILE_UNIT * 0.5
        }),
        solid(),
        scale(SCALE),
        "float-vert",
        FloatVert({
            upY: TILE_UNIT * 2,
            downY: TILE_UNIT * 2,
            delay: 0
        })
    ],
    "1": () => [
        sprite("spike"),
        area({
            height: TILE_UNIT * 0.5,
            offset: vec2(0, TILE_UNIT * 1.5)
        }),
        solid(),
        scale(SCALE),
        rotate(0),
        "danger"
    ],
    "2": () => [
        sprite("spike"),
        k.origin('botright'),
        area({
            height: TILE_UNIT * 0.5,
            offset: vec2(TILE_UNIT*3, TILE_UNIT*1.5)
        }),
        solid(),
        scale(SCALE),
        rotate(180),
        "danger"
    ],
    "o": () => [
        sprite("non-border-no-wht"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "p": () => [
        sprite("hero", { anim: "idle" }),
        area({
            height: TILE_UNIT * PBHS, 
            offset: vec2( 0, TILE_UNIT * (1 - PBHS) * 3)
        }),
        body(),
        scale(SCALE),
        "player"
    ],
    "C": () => [
        sprite("gnd-three-all"),
        area({
            height: TILE_UNIT * 0.5
        }),
        solid(),
        scale(SCALE),
        "whole",
        "float",
        FloatHori({
            xrange: TILE_UNIT * 12,
            delay: 0
        })
    ],
    "@": () => [
        sprite("gnd-solo"),
        area(),
        solid(),
        scale(SCALE),
        "float",
        {
            speed: 48,
            dir: choose([-1, 1])
        }
    ],
    "#": () => [
        sprite("zone-top"),
        area(),
        solid(),
        scale(SCALE)
    ],
    ".": () => [
        sprite("zone-mid"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "_": () => [
        sprite("zone-bot"),
        area(),
        solid(),
        scale(SCALE)
      ],
    "l": () => [
        sprite("blockLeftTop"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "r": () => [
        sprite("blockRightTop"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "m": () => [
        sprite("blockMidTop"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "<": () => [
        sprite("blkLeftFloat"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "=": () => [
        sprite("blkMidFloat"),
        area(),
        solid(),
        scale(SCALE)
    ],
    ">": () => [
        sprite("blkRightFloat"),
        area(),
        solid(),
        scale(SCALE)
    ],
    "D": () => [
        sprite("big-door", { anim: "closed" }),
        area(),
        solid(),
        scale(SCALE),
        "big-door"
    ],
    "K": () => [
        sprite("big-key"),
        area(),
        scale(SCALE),
        "big-key"
    ],

}

export default levelConfig
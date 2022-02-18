import { FloatHori } from "../components"

export const SCALE = 3
export const TILE_UNIT = 16
const TILE_WIDTH = TILE_UNIT * SCALE
const TILE_HEIGHT = TILE_UNIT * SCALE
const PBHS = 0.8 // PLAYER BODY HEIGHT SCALE

const levelConfig = {
    pos: vec2(0, TILE_HEIGHT),
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
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
        FloatHori({
            leftMove: 9 * TILE_UNIT,
            rightMove:  9 * TILE_UNIT,
            dir: choose([1, -1]),
            speed: TILE_UNIT * 5
        }),
        "whole"
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
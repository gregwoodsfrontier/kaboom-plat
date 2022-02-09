const SCALE = 3
const TILE_UNIT = 16
const TILE_WIDTH = TILE_UNIT * SCALE
const TILE_HEIGHT = TILE_UNIT * SCALE

const levelConfig = {
    pos: vec2(0, TILE_HEIGHT),
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    "a": () => [
        sprite("gnd-three", { anim: "left" }),
        area(),
        solid(),
        scale(SCALE),
        "float"
    ],
    "b": () => [
        sprite("gnd-three", { anim: "mid" }),
        area(),
        solid(),
        scale(SCALE),
        "float"
    ],
    "c": () => [
        sprite("gnd-three", { anim: "right" }),
        area(),
        solid(),
        scale(SCALE),
        "float"
    ],
    "@": () => [
        sprite("gnd-solo"),
        area(),
        solid(),
        scale(SCALE),
        "float"
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
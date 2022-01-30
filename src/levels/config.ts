const SCALE = 3
const TILE_UNIT = 16
const TILE_WIDTH = TILE_UNIT * SCALE
const TILE_HEIGHT = TILE_UNIT * SCALE

const levelConfig = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
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
        scale(SCALE),
        "big-door"
    ],
    "K": () => [
        sprite("big-key"),
        area(),
        "big-key"
    ],

}

export default levelConfig
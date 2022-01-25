import k from "../kaboom"

const Game = () => {
    // add a sprite
    k.add([
        k.sprite("hero", { anim: "idle" }),
        k.area(),
        k.solid(),
        k.origin("center"),
        k.pos( k.width()/2, k.height()/2 ),
        k.scale(5, 5)
    ])
    
}

export default Game
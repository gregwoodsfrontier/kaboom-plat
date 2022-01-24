import k from "../kaboom"

const Game = () => {
    k.add([
        k.pos(k.width()*0.5, k.height()*0.5),
        k.rect(100, 100),
        k.color(255, 0, 0),
        k.origin('center')
    ]);

    k.add([
        k.text("OHHH HIII!"),
        k.pos(k.width()*0.5, k.height()*0.1),
        k.origin('center')
    ])
}

export default Game
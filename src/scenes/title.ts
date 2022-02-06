import k from "../kaboom"

const Title = () => {

    // add a title name
    k.add([
        k.text('Simple Platformer', {
            size: 24
        }),
        k.origin("center"),
        k.pos(
            k.width()/2,
            k.height() * 0.25
        )
    ]);

    // press space to enter
    k.add([
        k.text('Press [SPACE] to play', {
            size: 24
        }),
        k.origin("center"),
        k.pos(
            k.width()/2,
            k.height() * 0.55
        )
    ]);

    k.onKeyPress("space", () => {
        k.go("game", 0)
    })
}

export default Title
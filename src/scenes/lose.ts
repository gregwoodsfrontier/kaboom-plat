import k from "../kaboom"

const Lose = () => {
    k.add([
        k.text("You Win!"),
        k.pos( k.width()*0.5, k.height()*0.5 ),
        k.origin("center")
    ])
}

export default Lose
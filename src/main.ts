import k from "./kaboom"
import Game from "./scenes/game"

k.loadSpriteAtlas(
    "/tilesets/1bitplatformer.png",
    "/tilesets/1bitplatformer.json"
)

k.scene('game', Game)

k.go('game', 0)
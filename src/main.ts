import k from "./kaboom"
import Win from "./scenes/win"
import Lose from "./scenes/lose"
import Game from "./scenes/game"
import Title from "./scenes/title"

k.loadSpriteAtlas(
    "/tilesets/1bitplatformer.png",
    "/tilesets/1bitplatformer.json"
)

k.scene('title', Title)
k.scene('game', Game)
k.scene('win', Win)
k.scene('lose', Lose)

k.go('title')
import k from "./kaboom"
import Win from "./scenes/win"
import Lose from "./scenes/lose"
import Game from "./scenes/game"
import Title from "./scenes/title"
import MatterPhysics from "./scenes/MatterPhysics"

k.loadSpriteAtlas(
    "/tilesets/1bitplatformer.png",
    "/tilesets/1bitplatformer.json"
)

k.scene('title', Title)
k.scene('game', Game)
k.scene('win', Win)
k.scene('lose', Lose)
k.scene('matterphysics', MatterPhysics)

// k.go('title')
k.go('game', 0)
// k.go("matterphysics")
debug.inspect = true
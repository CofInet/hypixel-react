import { initAPI } from '../../../api/ApiHelper'
import { getHeadMetadata } from '../../../utils/SSRUtils'
import { notFound } from 'next/navigation'
import RBContainer from '../../../components/ReactBootstrapWrapper/Container'
import PlayerDetails from '../../../components/PlayerDetails/PlayerDetails'
import { parseAuction, parsePlayer } from '../../../utils/Parser/APIResponseParser'

export default async function Page({ params }) {
    let playerInfo = await getPlayerInfo(params.uuid)
    return (
        <div className="page">
            <RBContainer>
                <PlayerDetails player={parsePlayer(playerInfo.player)} auctions={playerInfo.auctions.map(parseAuction)} />
            </RBContainer>
        </div>
    )
}

async function getPlayerInfo(uuid) {
    let api = initAPI(true)
    let playerName = ''
    try {
        playerName = await api.getPlayerName(uuid)
    } catch {
        notFound()
    }
    let auctions = []
    try {
        await api.getAuctions(uuid, 0)
    } catch {
        console.error('Error loading player auctions for player ' + uuid)
    }
    return {
        auctions: (auctions as any[]) || [],
        player: {
            uuid: uuid,
            name: playerName
        }
    }
}

export function generateMetadata({ params }) {
    let api = initAPI(true)
    let player = {
        name: '',
        iconUrl: ''
    } as any
    try {
        let name = api.getPlayerName(params.uuid)
        player = parsePlayer({
            uuid: params.uuid,
            name
        })
    } catch (e) {
        console.error('Error loading player name', e)
    }
    return getHeadMetadata(
        `${player?.name} Auctions and Bids | Hypixel SkyBlock AH history tracker`,
        `Auctions and bids for ${player?.name} in Hypixel Skyblock.`,
        player?.iconUrl?.split('?')[0],
        [player?.name || ''],
        `${player?.name} Auctions and Bids | Hypixel SkyBlock AH history tracker`
    )
}

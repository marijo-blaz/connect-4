import tokenColorEnum from "app/connectFour/shared/enums/TokenColorEnum";
import IPlayer from "app/connectFour/shared/interfaces/IPlayer";

const INITIAL_PLAYER_DATA: IPlayer[] = [
    { id: 0, name: "player1", score: 0, color: tokenColorEnum.RED },
    { id: 1, name: "player2", score: 0, color: tokenColorEnum.ORANGE },
];

export default INITIAL_PLAYER_DATA;

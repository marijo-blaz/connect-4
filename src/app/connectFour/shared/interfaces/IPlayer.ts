import tokenColorEnum from "../enums/TokenColorEnum";

interface IPlayer {
    id: number;
    name: string;
    color: tokenColorEnum;
    score: number;
}

export default IPlayer;

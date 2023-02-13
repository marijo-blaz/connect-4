import tokenColorEnum from "../enums/TokenColorEnum";

interface IPlayer {
    id: number;
    name: string;
    color: tokenColorEnum;
    score: number;
    isNext: boolean;
}

export default IPlayer;

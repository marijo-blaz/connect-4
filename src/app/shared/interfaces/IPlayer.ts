import tokenColorEnum from "../enums/TokenColorEnum";

interface IPlayer {
    id: number;
    name: string;
    color: tokenColorEnum;
    isNext: boolean;
}

export default IPlayer;

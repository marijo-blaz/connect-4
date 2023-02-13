import { IPlayer, IToken } from "app/shared/interfaces";

const getWinnerFromArray = (inputArray: IToken[]): IPlayer | undefined => {
    let sum = 0;
    let bestPlayer: IPlayer | undefined = undefined;

    inputArray.every(({ player }, index) => {
        if (player && player.id === inputArray[index + 1]?.player?.id) sum++;
        else sum = 0;

        if (sum === 3) {
            bestPlayer = player;
            return false;
        }

        return true;
    });

    return bestPlayer;
};

export default getWinnerFromArray;

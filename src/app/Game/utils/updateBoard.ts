import { IGridColumn, IPlayer, IToken } from "app/shared/interfaces";

const getUpdatedBoard = (
    grid: IGridColumn[],
    selectedColumnId: number,
    players: IPlayer[],
    playerId: number
) => {
    return grid.map((column) => {
        if (column.id == selectedColumnId) {
            const lastUneditedRowId = column.rows.findIndex(
                (v) => v.isPopulated === true
            );

            if (lastUneditedRowId === 0) return { ...column };

            const index = lastUneditedRowId < 0 ? 6 : lastUneditedRowId;

            let updatedRow: IToken[] = column.rows.map((row) => {
                if (row.id === column.rows[index - 1].id) {
                    return {
                        ...row,
                        isPopulated: true,
                        player: players.find((v) => v.id === playerId),
                    };
                }
                return { ...row };
            });
            return { ...column, rows: [...updatedRow] };
        }
        return column;
    });
};

export default getUpdatedBoard;

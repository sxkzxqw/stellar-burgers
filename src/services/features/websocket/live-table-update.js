
const insertData = (table, action) => {
    return [
        ...table.slice(0, action.data.pos),
        ...action.data.rows,
        ...table.slice(action.data.pos)
    ]
}

const deleteData = (table, action) => {
    return table.filter(({ id }) => !action.data.includes(id));
}

const updateData = (table, action) => {
    return table.map(row => {
        const index = action.data.findIndex((updatedRow) => updatedRow.id === row.id);
        if (index !== -1) {
            return action.data[index];
        }
        return row;
    });
}

const moveData = (prevTable, action) => {
    const table = [...prevTable];
    action.data.forEach((move) => {
        table.splice(move.to, 0, table.splice(move.from, 1)[0]);
    });
    return table;
}

export const liveTableUpdate = (prevTable, actions) => {
    let table = prevTable;
    actions.forEach((action) => {
        switch (action.type) {
            case LiveTableActionType.DATA:
                table = action.data;
                break;
            case LiveTableActionType.INSERT:
                table = insertData(table, action);
                break;
            case LiveTableActionType.DELETE:
                table = deleteData(table, action);
                break;
            case LiveTableActionType.UPDATE:
                table = updateData(table, action);
                break;
            case LiveTableActionType.MOVE:
                table = moveData(table, action);
                break;
        }
    });

    return table;
}

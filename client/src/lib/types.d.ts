interface ActionItemFromServer {
    task: string;
    priority: 1 | 2 | 3;
}

interface ActionItem extends ActionItemFromServer {
    id: string;
    isCompleted: boolean;
}

export { ActionItemFromServer, ActionItem }
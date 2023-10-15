import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type MoveColumnMutationResolverArgs = {
    columnId: string;
    toIndex: number;
};

export class MoveColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: MoveColumnMutationResolverArgs): Promise<any> {
        const {columnId, toIndex} = args;

        try {
            const columnsToUpdate = await this.fetchAllColumnsAsc();
            if (!columnsToUpdate) {
                throw new Error('No columns found');
            }

            const indexToRemove = this.findIndexToRemove(columnsToUpdate, columnId);
            const reorderedColumns = this.reorderColumns(columnsToUpdate, indexToRemove, toIndex);

            await this.updateColumnPositions(reorderedColumns);

            return await this.fetchAllColumnsWithItemsAsc();
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while moving the column');
        }
    }

    protected findIndexToRemove(columns: any[], columnId: string): number {
        const index = columns.findIndex(column => column.id === parseInt(columnId));
        if (index === -1) {
            throw new Error('Column not found');
        }
        return index;
    }

    protected reorderColumns(columns: any[], indexToRemove: number, newIndex: number): any[] {
        const [removed] = columns.splice(indexToRemove, 1);
        columns.splice(newIndex, 0, removed);
        return columns;
    }

    protected async updateColumnPositions(columns: any[]): Promise<void> {
        const updatePromises = columns.map((column, index) => {
            if (column.index !== index) {
                return this.updateColumnPositionForId(column.id, index);
            }
            return Promise.resolve();
        });
        await Promise.all(updatePromises);
    }

    protected updateColumnPositionForId(columnId: number, index: number) {
        return this.client.column.update({
            where: {id: columnId},
            data: {index}
        });
    }
}

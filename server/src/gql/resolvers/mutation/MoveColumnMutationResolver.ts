import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type MoveColumnMutationResolverArgs = {
    columnId: string;
    position: number;
};

export class MoveColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: MoveColumnMutationResolverArgs): Promise<any> {
        try {
            const columnsToUpdate = await this.fetchAllColumnsAsc();
            if (!columnsToUpdate) {
                throw new Error('No columns found');
            }

            const indexToRemove = this.findIndexToRemove(columnsToUpdate, args.columnId);
            const reorderedColumns = this.reorderColumns(columnsToUpdate, indexToRemove, args.position);

            await this.updateColumnPositions(reorderedColumns);

            return this.fetchAllColumnsWithItemsAsc();
        } catch (e) {
            console.log(e);
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

    protected reorderColumns(columns: any[], indexToRemove: number, newPosition: number): any[] {
        const [removed] = columns.splice(indexToRemove, 1);
        columns.splice(newPosition, 0, removed);
        return columns;
    }

    protected async updateColumnPositions(columns: any[]): Promise<void> {
        const updatePromises = columns.map((column, index) => {
            if (column.position !== index) {
                return this.updateColumnPositionForId(column.id, index);
            }
            return Promise.resolve();
        });
        await Promise.all(updatePromises);
    }

    protected updateColumnPositionForId(columnId: number, position: number) {
        return this.client.column.update({
            where: {id: columnId},
            data: {position}
        });
    }
}

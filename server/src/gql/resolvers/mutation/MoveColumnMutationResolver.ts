import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type MoveColumnMutationResolverArgs = {
    columnId: string;
    position: number;
}

export class MoveColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: MoveColumnMutationResolverArgs): Promise<any> {
        return this.client.column.update({
            where: {id: parseInt(args.columnId)},
            data: {
                position: args.position,
            }
        });
    }
}
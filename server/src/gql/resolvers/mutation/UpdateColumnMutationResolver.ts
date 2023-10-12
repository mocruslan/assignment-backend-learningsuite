import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateColumnMutationResolverArgs = {
    columnId: string;
    name: string;
}

export class UpdateColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateColumnMutationResolverArgs): Promise<any> {
        return this.client.column.update({
            where: {id: parseInt(args.columnId)},
            data: {name: args.name},
        });
    }
}
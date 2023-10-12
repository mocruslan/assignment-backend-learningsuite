import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type MoveItemMutationResolverArgs = {
    itemId: string;
    toColumnId: string;
    position: number;
}

export class MoveItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: any): Promise<any> {
        return this.client.item.update({
            where: {id: parseInt(args.itemId)},
            data: {
                column: {
                    connect: {
                        id: parseInt(args.toColumnId),
                    }
                },
                position: args.position,
            }
        });
    }
}
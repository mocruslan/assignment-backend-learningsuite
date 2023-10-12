import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type CreateItemMutationResolverArgs = {
    columnId: string;
    name: string;
}

export class CreateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: CreateItemMutationResolverArgs): Promise<any> {
        return this.client.item.create({
            data: {
                name: args.name,
                position: 0,
                column: {
                    connect: {
                        id: parseInt(args.columnId),
                    }
                }
            }
        });
    }
}
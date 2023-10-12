import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateItemMutationResolverArgs = {
    itemId: string;
    name: string;
}

export class UpdateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateItemMutationResolverArgs): Promise<any> {
        return this.client.item.update({
            where: {id: parseInt(args.itemId)},
            data: {name: args.name},
        });
    }
}
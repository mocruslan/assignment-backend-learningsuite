import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateItemMutationResolverArgs = {
    itemId: string;
    name?: string;
    done?: boolean;
}

export class UpdateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateItemMutationResolverArgs): Promise<any> {
        const {itemId, name, done} = args;
        console.log(args); // TODO: Add as debug

        return this.client.item.update({
            where: {id: parseInt(itemId)},
            data: {
                name: name,
                done: done
            }
        }).catch(e => {
            console.log(e)
        });
    }
}
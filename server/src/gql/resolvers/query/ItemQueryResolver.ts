import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

export type ItemQueryResolverArgs = {
    id: string;
}

export class ItemQueryResolver extends QueryResolverAbstract {
    async getResolver(args: ItemQueryResolverArgs): Promise<any> {
        return this.client.item.findUnique({
            where: {id: parseInt(args.id)},
        });
    }
}
import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

export type ItemQueryResolverArgs = {
    id: string;
}

export class ItemQueryResolver extends QueryResolverAbstract {
    async getResolver(args: ItemQueryResolverArgs): Promise<any> {
        console.log(args);

        return this.client.item.findUnique({
            where: {
                id: parseInt(args.id)
            },
            include: {
                column: true
            }
        }).catch(e => {
            console.log(e)
        });
    }
}
import {QueryResolverAbstract} from "../abstracts/QueryResolverAbstract";

type ItemQueryResolverArgs = {
    id: string;
}

export class ItemQueryResolver extends QueryResolverAbstract {
    async getResolver(args: ItemQueryResolverArgs): Promise<any> {
        const {id} = args;

        try {
            return await this.client.item.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    column: true
                }
            });
        } catch (e) {
            console.error(e);
            throw new Error('An error occurred while fetching the item');
        }

    }
}
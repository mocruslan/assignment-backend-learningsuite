import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

type CreateItemMutationResolverArgs = {
    name: string;
    columnId: string;
    done: boolean;
}

export class CreateItemMutationResolver extends MutationResolverAbstract {
    async getResolver(args: CreateItemMutationResolverArgs): Promise<any> {
        const {name, columnId} = args;
        console.log(args);

        try {
            const maxPositionItem = await this.client.item.findFirst({
                select: {position: true},
                where: {columnId: parseInt(columnId)},
                orderBy: {position: 'desc'},
            });

            return this.client.item.create({
                data: {
                    name: name,
                    position: maxPositionItem ? maxPositionItem.position + 1 : 0,
                    column: {
                        connect: {
                            id: parseInt(columnId),
                        },
                    },
                },
            }).catch(e => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

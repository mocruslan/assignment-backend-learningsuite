import {MutationResolverAbstract} from "../abstracts/MutationResolverAbstract";

export type UpdateColumnMutationResolverArgs = {
    columnId: string;
    name: string;
}

export class UpdateColumnMutationResolver extends MutationResolverAbstract {
    async getResolver(args: UpdateColumnMutationResolverArgs): Promise<any> {
        const {columnId, name} = args;
        console.log(args);

        return this.client.column.update({
            where: {id: parseInt(columnId)},
            data: {
                name: name
            },
            include: {
                items: true,
            }
        }).catch(e => {
            console.log(e)
        });
    }
}
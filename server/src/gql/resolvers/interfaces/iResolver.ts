export interface IResolver {
    getResolver(args: any): Promise<any>;
}
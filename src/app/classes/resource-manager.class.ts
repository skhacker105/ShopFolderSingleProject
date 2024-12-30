import { DataSyncHandler, IndexedDBHandler } from '.';
import { IAccessControl, ISyncTransactionData } from '../interfaces';

export class ResourceManager {
    private dbHandler: IndexedDBHandler;
    private dataSyncHandler: DataSyncHandler;

    constructor(dbHandler: IndexedDBHandler, dataSyncHandler: DataSyncHandler) {
        this.dbHandler = dbHandler;
        this.dataSyncHandler = dataSyncHandler;
    }

    async addResource<T>(storeName: string, resource: T, accessControls: IAccessControl[]): Promise<void> {
        try {
            await this.dbHandler.create(storeName, resource);
            console.log(`Resource added to ${storeName} locally.`);

            const syncResult = this.dataSyncHandler.syncData(resource as ISyncTransactionData, accessControls);
            if (!syncResult.success) {
                this.handleSyncFailure(syncResult, storeName, resource);
            }
        } catch (error) {
            console.error(`Error adding resource to ${storeName}:`, error);
        }
    }

    async updateResource<T>(storeName: string, resource: T, accessControls: IAccessControl[]): Promise<void> {
        try {
            const existingResource = await this.dbHandler.read(storeName, (resource as any).id);
            await this.dbHandler.update(storeName, resource);
            console.log(`Resource updated in ${storeName} locally.`);

            const syncResult = this.dataSyncHandler.syncData(resource as ISyncTransactionData, accessControls);
            if (!syncResult.success) {
                this.handleSyncFailure(syncResult, storeName, existingResource);
            }
        } catch (error) {
            console.error(`Error updating resource in ${storeName}:`, error);
        }
    }

    async deleteResource<T>(storeName: string, resourceId: string, accessControls: IAccessControl[]): Promise<void> {
        try {
            const resource = await this.dbHandler.read(storeName, resourceId);
            await this.dbHandler.delete(storeName, resourceId);
            console.log(`Resource deleted from ${storeName} locally.`);

            const syncResult = this.dataSyncHandler.syncData({ ...resource, deleted: true } as ISyncTransactionData, accessControls);
            if (!syncResult.success) {
                this.handleSyncFailure(syncResult, storeName, resource, true);
            }
        } catch (error) {
            console.error(`Error deleting resource from ${storeName}:`, error);
        }
    }

    private async handleSyncFailure<T>(
        syncResult: { success: boolean; failedTargets: { userId: string; reason: string }[] },
        storeName: string,
        resource: T,
        isDelete = false
    ) {
        for (const { userId, reason } of syncResult.failedTargets) {
            if (reason === 'Access Denied') {
                console.warn(`Access denied for user ${userId}: Undoing local transaction.`);
                if (isDelete) {
                    await this.dbHandler.create(storeName, resource);
                } else {
                    await this.undoTransaction(storeName, (resource as any).id);
                }
            } else {
                console.warn(`Sync failed for user ${userId}: Storing transaction for retry.`);
                this.dataSyncHandler.storeFailedTransaction(resource as ISyncTransactionData, userId);
            }
        }
    }

    async undoTransaction(storeName: string, resourceId: string): Promise<void> {
        try {
            const existingResource = await this.dbHandler.read(storeName, resourceId);
            if (existingResource) {
                console.warn("Undoing transaction: Reverting to previous state.");
                await this.dbHandler.update(storeName, existingResource);
            } else {
                console.warn("Undoing transaction: Deleting new entry.");
                await this.dbHandler.delete(storeName, resourceId);
            }
        } catch (error) {
            console.error("Error undoing transaction:", error);
        }
    }
}

import { Component, OnInit, inject } from '@angular/core';
import { BaseService } from '../../services';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-db',
  templateUrl: './delete-db.component.html',
  styleUrl: './delete-db.component.scss'
})
export class DeleteDBComponent implements OnInit {

  dbName: string = '';
  deleteStatus: 'pass' | 'fail' | 'blocked' | undefined;
  deleteMessage = '';
  readonly dialogRef = inject(MatDialogRef<DeleteDBComponent>);

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    const currentUserId = this.baseService.currentUserId.value
    if (currentUserId) this.dbName = currentUserId;
  }

  deleteDB(): void {
    if (!this.dbName) return;

    try {
      this.baseService.dbHandler?.closeDatabase();
      const request = indexedDB.deleteDatabase(this.dbName);

      request.onerror = (event) => {
        console.log("Error deleting database.");
        this.deleteStatus = 'fail';
        this.deleteMessage = 'Error deleting database.';
      };

      request.onsuccess = (event) => {
        console.log("Database deleted successfully.");
        this.dbName = '';
        this.deleteStatus = 'pass';
        this.deleteMessage = 'Database deleted successfully.';
        this.baseService.resetCurrentUser();
        this.baseService.logout();
        this.dialogRef.close();
      };

      request.onblocked = () => {
        console.log("Couldn't delete database due to the operation being blocked");
        this.deleteStatus = 'blocked';
        this.deleteMessage = "Couldn't delete database due to the operation being blocked";
    };
    } catch (err) { }
  }

}

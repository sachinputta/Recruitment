import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';


export interface Item {
  id?: number;
  name: string;
  purchaseDescription?: string;
  rate: number | null;
  purchaseRate?: number | null;
  description?: string;
  usageUnit?: string;
}

@Component({
  selector: 'app-itemspage',
  templateUrl: './itemspage.component.html',
  styleUrls: ['./itemspage.component.scss']
})
export class ItemspageComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery = '';

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  sortDirection: 'asc' | 'desc' | 'none' = 'none';

  isModalOpen = false;
  isEditMode = false; // New flag to toggle between add and edit modes

  newItem: Item = {
    name: '',
    purchaseDescription: '',
    rate: null,
    purchaseRate: null,
    description: '',
    usageUnit: '',
  };
  customerId: string = '';
  itemsList: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    // this.fetchItems();
    // this.getItems();

    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      this.customerId = storedCustomerId;
      this.getItems();
    } else {
      console.error('Customer ID not found in localStorage!');
    }
  }

  // fetchItems(): void {
  //   this.customerService.getItems().subscribe({
  //     next: (data: Item[]) => {
  //       this.items = data;
  //       this.updateFilteredItems();
  //     },
  //     error: (error) => {
  //       console.error('Error fetching items:', error);
  //     }
  //   });
  // }

  // getItems(): void {
  //   this.customerService.getItemsByCustomerId(this.customerId).subscribe({
  //     next: (data) => {
  //       this.itemsList = data;
  //       this.filteredItems = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching items:', err);
  //     }
  //   });
  // }

  getItems(): void {
    this.customerService.getItemsByCustomerId(this.customerId).subscribe({
      next: (data) => {
        this.itemsList = data;
        this.items = data; // <-- Add this
        this.filteredItems = [...data]; // Fresh filtered data
        this.updatePagination(); // Update pagination to match new data
      },
      error: (err) => {
        console.error('Error fetching items:', err);
      }
    });
  }
  
  

  updateFilteredItems(): void {
    this.filteredItems = this.searchQuery.trim()
      ? this.items.filter(item =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : [...this.items];

    this.sortItems();
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
  }

  getPaginatedItems(): Item[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  onSearch(): void {
    this.updateFilteredItems();
  }

  limitWords() {
    const words = this.newItem.purchaseDescription?.trim().split(/\s+/);
    if (words && words.length > 10) {
      this.newItem.purchaseDescription = words.slice(0, 10).join(' ');
    }
  }
  
  getWordCount(): number {
    if (!this.newItem.purchaseDescription) return 0;
    return this.newItem.purchaseDescription.trim().split(/\s+/).length;
  }
  

  openModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false; // Set to add mode
    this.resetNewItem();
  }

  // New method to open modal in edit mode
  openEditModal(item: Item): void {
    this.isModalOpen = true;
    this.isEditMode = true; // Set to edit mode
    this.newItem = { ...item }; // Populate with existing item data
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetNewItem();
  }

  resetNewItem(): void {
    this.newItem = {
      name: '',
      purchaseDescription: '',
      rate: null,
      purchaseRate: null,
      description: '',
      usageUnit: '',
    };
  }

  // submitItem(): void {
  //   if (!this.newItem.name || this.newItem.rate === null) {
  //     alert('Name and Rate are required.');
  //     return;
  //   }

  //   const finalItem: Item = {
  //     ...this.newItem,
  //     purchaseRate: this.newItem.purchaseRate ?? null, // Use null if undefined
  //     description: this.newItem.description || 'NA',
  //     usageUnit: this.newItem.usageUnit || 'NA',
  //   };

  //   if (this.isEditMode) {
  //     // Update existing item
  //     if (!finalItem.id) {
  //       console.error('Item ID is undefined in edit mode');
  //       return;
  //     }
  //     this.customerService.updateItem(finalItem).subscribe({
  //       next: () => {
  //         // this.fetchItems(); 
  //         this.closeModal();
  //       },
  //       error: (error) => {
  //         console.error('Error updating item:', error);
  //         alert('Failed to update item. Please try again.');
  //       }
  //     });
  //   } else {
  //     // Add new item
  //     this.customerService.addItem(finalItem).subscribe({
  //       next: () => {
  //         // this.fetchItems(); // Refresh items from server
  //         this.getItems();
  //         this.closeModal();
  //       },
  //       error: (error) => {
  //         console.error('Error adding item:', error);
  //         alert('Failed to add item. Please try again.');
  //       }
  //     });
  //   }
  // }

  submitItem(): void {
    const customerId = localStorage.getItem('customerId');
  
    if (!customerId) {
      console.error('Customer ID not found in localStorage');
      return;
    }
  
    const payload: any = {
      name: this.newItem.name,
      purchaseDescription: this.newItem.purchaseDescription,
      rate: this.newItem.rate,
      customerId: customerId
    };
  
    // Add edit-only fields if in edit mode
    if (this.isEditMode) {
      payload.id = this.newItem.id;
      payload.purchaseRate = this.newItem.purchaseRate;
      payload.description = this.newItem.description;
      payload.usageUnit = this.newItem.usageUnit;
    }
  
    if (this.isEditMode) {
      this.customerService.updateItem(payload).subscribe({
        next: () => {
          console.log('Item updated successfully');
          this.getItems();
          this.closeModal();
        },
        error: (err) => console.error('Error updating item', err)
      });
    } else {
      this.customerService.createItem(payload).subscribe({
        next: () => {
          console.log('Item added successfully');
          this.getItems();
          this.closeModal();
        },
        error: (err) => console.error('Error creating item', err)
      });
    }
  }
  

  // deleteItem(item: Item): void {
  //   if (!item.id) {
  //     console.error('Item ID is undefined');
  //     return;
  //   }

  //   if (confirm('Are you sure you want to delete this item?')) {
  //     const itemId = item.id;
  //     const originalItems = [...this.items]; // Backup for rollback
  //     this.items = this.items.filter(i => i.id !== itemId);
  //     this.updateFilteredItems();

  //     const paginatedItems = this.getPaginatedItems();
  //     if (paginatedItems.length === 0 && this.currentPage > 1) {
  //       this.currentPage--;
  //     }

  //     this.customerService.deleteItem(itemId).subscribe({
  //       next: () => {
  //         this.updateFilteredItems(); // Ensure UI sync
  //       },
  //       error: (error) => {
  //         console.error('Error deleting item:', error);
  //         this.items = originalItems;
  //         this.updateFilteredItems();
  //         alert('Failed to delete item. Please try again.');
  //       }
  //     });
  //   }
  // }


  deleteItem(item: Item): void {
    if (!item.id) {
      console.error('Item ID is undefined');
      return;
    }
  
    if (confirm('Are you sure you want to delete this item?')) {
      this.customerService.deleteItem(item.id).subscribe({
        next: () => {
          console.log('Item deleted successfully');
          this.getItems(); // Refresh all items from backend
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          alert('Failed to delete item. Please try again.');
        }
      });
    }
  }
  

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  sortByName(): void {
    if (this.sortDirection === 'none' || this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }

    this.sortItems();
    this.updatePagination();
  }

  sortItems(): void {
    if (this.sortDirection === 'none') return;

    this.filteredItems.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return this.sortDirection === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  toggleDropdown(): void {
    console.log('Dropdown clicked');
  }

}

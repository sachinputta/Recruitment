import { Component } from '@angular/core';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent {
  application = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: ''
  };

  resumeError: string | null = null;
  submitting = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        this.resumeError = 'Please upload a PDF, DOC, or DOCX file.';
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.resumeError = 'File size exceeds 5MB limit.';
        return;
      }
      this.resumeError = null;
      console.log('Selected file:', file.name);
      // Handle file upload logic here (e.g., send to a server)
    }
  }

  onSubmit(): void {
    if (!this.resumeError) {
      this.submitting = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.application);
        alert('Application submitted successfully!');
        this.submitting = false;
        // Reset form if needed
        this.application = { firstName: '', lastName: '', email: '', phone: '', coverLetter: '' };
      }, 2000);
    }
  }
}

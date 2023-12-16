import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showUnits: true
    });

    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
  }

  onSubmit(): void {
    if(!this.formGroup.value.showUnits) {
      this.filteredResults = this.results.filter(filter => filter.opened === true);
    } else {
      this.filteredResults = this.results;
    }
  }

  onClean(): void {
    this.formGroup.reset();
    
  }
}

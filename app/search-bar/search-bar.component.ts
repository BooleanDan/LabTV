import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  public searchForm !: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService, private formBuilder: FormBuilder) { }

  cerca() {
    if (localStorage.getItem('token')) {
      const searchValue = this.searchForm.get('movieName')?.value;
      console.log(searchValue);
      this.searchService.changeSearchValue(searchValue);
      this.router.navigate(['/search', localStorage.getItem('token')]);

    }
  }
}

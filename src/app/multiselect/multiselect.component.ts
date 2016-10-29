import {ElementRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  query:string = '';
  classifications:any = [
    { desc: 'This is Awesome stuff', id: 1},
    { desc: 'John went to Chicago', id: 2},
    { desc: 'Zainab is super awesome', id: 3},
    { desc: 'There are no holidays left', id: 4},
    { desc: 'This Diwali was super', id: 5}
  ];

  filteredList: any = [];
  elementRef:any;
  selected:any = [];

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
  }

  //Show matching values based upon the entered search string
  filter() {
    if (this.query !== ""){
      //Get list of selected Ids
      let selectedIds = this.selected.map(function(el){ return el.id });

      //Filter out already selected items
      this.filteredList = this.classifications.filter(function(el) {
        if (selectedIds.indexOf(el.id) > -1) {
          return false;
        }

        return true;
      }.bind(this));


      //Search for matching string

      var terms = this.query.split(' '); //split query terms by space character
      var arrayToReturn = [];

      //Perform additional filtering only if filteredList has items
      if (!(this.filteredList.length > 0)){
        return false;
      }

      this.filteredList.filter(function(item){ // iterate through array of items
        debugger
        var passTest = true;
        terms.forEach(function(term){ // iterate through terms found in query box
          // if any terms aren't found, passTest is set to and remains false
          passTest = passTest && (item.desc.toLowerCase().indexOf(term.toLowerCase()) > -1);
        });
        // Add item to return array only if passTest is true -- all search terms were found in item
        if (passTest) { arrayToReturn.push(item); }
      });

      this.filteredList = arrayToReturn;

    }else{
      this.filteredList = [];
    }
  }

  remove(item){
    this.selected.splice(this.selected.indexOf(item),1);
  }

  select(itemId){
    var item = this.classifications.filter(function(el){
        if(el.id == itemId){
          return true;
        }
      }
    );
    this.selected.push(item[0]);
    this.query = '';
    this.filteredList = [];
  }

  //To hide dropdown when mouse is clicked outside of component
  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
      this.query = '';
    }
  }

}

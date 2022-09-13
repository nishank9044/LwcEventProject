import { LightningElement,track} from 'lwc';
import upComingEvents from '@salesforce/apex/UpcomingEventList.upComingEvents';
const columns = [
    { label: 'Name',
     fieldName: 'Name',
     cellAttributes:{
        iconName: "standard:event",
        iconPosition: "left"
     }
},
    { label: 'Event Organizer', fieldName: 'Eventorganizer', type: 'text' },
    { label: 'Location ', fieldName: 'Location', type: 'text' },
    { label: 'People Attending ', fieldName: 'PeopleAttending', type: 'number' }
];
export default class EventDataTable extends LightningElement {
    columnsList = columns
    @track upComingList 
    @track result
     keyword
    connectedCallback(){
       this.handleUpComingEvents()
    }

    handleUpComingEvents(){
        upComingEvents()
        .then((result) => {
            // alert(JSON.stringify(result))
            result.forEach(rec => {
               
                rec.Name = rec.Name__c
                rec.Eventorganizer = rec.Event_Organizer__r.Name
                rec.Location = rec.Location__r.Name
                rec.PeopleAttending = rec.PeopleAttending__c
            });
            this.result = result
            this.upComingList = result
            window.console.log('upcoming',result)
        }).catch((err) => {
            
        });
    }

    handleSearch(event){
         this.keyword = event.detail.value 
        let filteredEventList =  this.upComingList.filter(rec => {
            window.console.log(JSON.stringify(this.keyword))
            return rec.Name__c.toLowerCase().includes(this.keyword.toLowerCase());
           
        });

        if(this.keyword && this.keyword.length >= 1){
            this.upComingList = filteredEventList 
        } else if(this.template.querySelector('c-lwcsearchcomponent').value == '') {
            this.upComingList = this.result
        }
    }

}
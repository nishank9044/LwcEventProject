import { LightningElement,api,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import getEventSpeakers from '@salesforce/apex/EventSpeakerDetails.getEventSpeakers';
import getLocationDetails from '@salesforce/apex/EventSpeakerDetails.getLocationDetails';
import getAttendeeDetails from '@salesforce/apex/EventSpeakerDetails.getAttendeeDetails';
import deleteRecord from '@salesforce/apex/EventSpeakerDetails.deleteRecord';
import { refreshApex  } from '@salesforce/apex';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', type: 'url' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

const columnsAtt = [
    { label: 'Name', fieldName: 'attendeeName' },
    { label: 'Email', fieldName: 'attendeeEmail', type: 'url' },
    { label: 'Phone', fieldName: 'attendeePhone', type: 'phone' },
    { label: 'Phone', fieldName: 'attendeeLocation', type: 'phone' },
    {type: "button-icon", 
    typeAttributes: 
    {iconName: "utility:delete", name: "delete", iconClass: "slds-icon-text-error"},
     fixedWidth: 50}
];
export default class EventDetail extends NavigationMixin(LightningElement) {
    
    columnList = columns  
    attcolumnList = columnsAtt
@api recordId
@track speakerList 
@track error
@track eventLocation
@track attendeeList

handleActiveSpeaker(){
    getEventSpeakers({
        eventId:this.recordId
    })
    .then((result) => {
        result.forEach((speaker) => {
            speaker.Name = speaker.Speaker__r.Name;
            speaker.Email = speaker.Speaker__r.Email__c;
            speaker.Phone = speaker.Speaker__r.Phone__c;
            
          });
        this.speakerList = result
        this.error = undefined
        window.console.log('speaker List ',result)
    }).catch((err) => {
        this.error = err
        this.speakerList = undefined
    });
}
handleActiveLocation(){
    getLocationDetails({
        eventId:this.recordId
    })
    .then((result) => {
        if(result.Location__c){
            this.eventLocation = result
        } else {
            this.eventLocation = undefined
        }
       
    }).catch((err) => {
        
    });
}

handleActiveAttendee(){
    getAttendeeDetails({
        eventId:this.recordId
    })
    .then((result) => {
        window.console.log('attendee ',result)
        this.attendeeList = result
        
    }).catch((err) => {
        
    });
}

handleRowAction(event) {
    if (event.detail.action.name === "delete") 
     this.handleDelete();
     
}

handleDelete(){
    deleteRecord({
        eventId:this.recordId
    })
    alert('deleted clicked')
    .then((result) => {
        window.console.log('delete',result)
        if(result == 'yes'){
            return refreshApex(this.attendeeList);
        }
        alert('deleted')
    }).catch((err) => {
        
    });
   
}
// Git changes for this file
handleAddSpeaker(event){
 const defaultValues = encodeDefaultFieldValues({
    Event__c:this.recordId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'EventSpeakers__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
}

}
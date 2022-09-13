import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import EVT_OBJECT from '@salesforce/schema/Event__c';
import Name_F from '@salesforce/schema/Event__c.Name__c';
import Event_Organizer__c from '@salesforce/schema/Event__c.Event_Organizer__c';
import Start_DateTime__c from '@salesforce/schema/Event__c.Start_DateTime__c';
import End_Date_Time__c from '@salesforce/schema/Event__c.End_Date_Time__c';
import Max_Seats__c from '@salesforce/schema/Event__c.Max_Seats__c';
import Location__c from '@salesforce/schema/Event__c.Location__c';
import Event_Details__c from '@salesforce/schema/Event__c.Event_Details__c';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddEvent extends NavigationMixin(LightningElement) {

    @track errors 
    @track eventRecord = {
        Name__c: '',
        Event_Organizer__c: '',
        Start_DateTime__c: null,
        End_Date_Time__c: null,
        Max_Seats__c: null,
        Location__c: '',
        Event_Details__c: ''
    }

    @track errors;

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        this.eventRecord[name] = value;

    }
    handleLookup(event) {
        let selectedRecId = event.detail.selectedRecordId;
        let parentField = event.detail.parentfield;
        this.eventRecord[parentField] = selectedRecId;
        // selectedRecId = aiwue7836734834
        // Location__c
        // this.eventRecord[Location__c] = selectedRecId;
    }

    handleClick() {
        const fields = {};
        fields[Name_F.fieldApiName] = this.eventRecord.Name__c;
        fields[Event_Organizer__c.fieldApiName] = this.eventRecord.Event_Organizer__c;
        fields[Start_DateTime__c.fieldApiName] = this.eventRecord.Start_DateTime__c;
        fields[End_Date_Time__c.fieldApiName] = this.eventRecord.End_Date_Time__c;
        fields[Max_Seats__c.fieldApiName] = this.eventRecord.Max_Seats__c;
        fields[Location__c.fieldApiName] = this.eventRecord.Location__c;
        fields[Event_Details__c.fieldApiName] = this.eventRecord.Event_Details__c;

        const eventRecord = { apiName: EVT_OBJECT.objectApiName, fields };
        createRecord(eventRecord)
            .then((eventRec) => {
              this[NavigationMixin.Navigate]({
                  type: 'standard__recordPage',
                  attributes: {
                      actionName: "view",
                      recordId: eventRec.id,
                  }
              });
                 this.dispatchEvent(new ShowToastEvent({
                    title: 'Event record Creatted',
                    message: eventRec.id,
                    variant: 'success'
                }));
                })
             .catch((error)=>{
                this.errors = JSON.stringify(error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Oh oh Error occured',
                    message:  this.errors,
                    variant: 'error'
                }));
             })
    }

    handleCancel(event){
        this[NavigationMixin.Navigate]({
            "type": "standard__objectPage",
            "attributes": {
                "objectApiName": "Event__c",
                "actionName": "home"
            }
        });
    }
}
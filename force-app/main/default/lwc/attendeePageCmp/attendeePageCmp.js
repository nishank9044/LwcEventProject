import { LightningElement,api,track} from 'lwc';
import upComingList from '@salesforce/apex/AttendeePageCmp.upComingList';
const columns = [
    {
        label: "Event Name",
        fieldName: "detailsPage",
        type: "url",
        wrapText: "true",
        typeAttributes: {
          label: {
            fieldName: "Name"
          }
        }
      },

    { label: 'Location ', fieldName: 'Location', type: 'text' },
    {
        label: "Event Date",
        fieldName: "EventDate",
        type: "date",
        typeAttributes: {
          weekday: "long",
          year: "numeric",
          month: "long",
          day:"numeric"
        }
      }
];
export default class AttendeePageCmp extends LightningElement {
    columnsList = columns
@api recordId
@track dataList
error

connectedCallback(){
    this.upComingEvents()
}
    upComingEvents(){
        upComingList({
            attendeeId :this.recordId
        })
        .then((result) => {
            //window.console.log(" error ", result);
            result.forEach((record) => {
              record.Name = record.Event__r.Name__c;
              record.detailsPage =
                "https://" + window.location.host + "/" + record.Event__c;
              record.EventDate = record.Event__r.Start_DateTime__c;
              if (record.Event__r.Location__c) {
                record.Location = record.Event__r.Location__r.Name;
              } else {
                record.Location = "This is a virtual event";
              }
            });
            this.dataList = result;
            //window.console.log(" result ", result);
            this.errors = undefined;
          })
          .catch((error) => {
            this.dataList = undefined;
            this.errors = JSON.stringify(error);
          });
    }
}
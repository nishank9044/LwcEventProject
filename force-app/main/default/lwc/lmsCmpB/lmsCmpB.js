import { LightningElement,wire} from 'lwc';
import { APPLICATION_SCOPE,MessageContext,subscribe} from 'lightning/messageService';
import shipraChannelName from '@salesforce/messageChannel/shipraFirstlms__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class LmsCmpB extends LightningElement {
     comingValue 
    @wire(MessageContext)
    MessageContext

    connectedCallback(){
        this.handleSubscribe()
    }

    handleSubscribe(){
        subscribe(this.MessageContext,shipraChannelName,(message)=>{this.handleMessage(message)},{scope:APPLICATION_SCOPE})
    }

    handleMessage(message){
         this.comingValue = message.lmsField ? message.lmsField :'No Data '
    }

}
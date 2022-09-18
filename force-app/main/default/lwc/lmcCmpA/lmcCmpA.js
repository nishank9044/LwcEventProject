import { LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import shipraChannelName from '@salesforce/messageChannel/shipraFirstlms__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class LmcCmpA extends LightningElement {
    
    @wire(MessageContext)
    context
    keyword
    handleChange(event){
       this.keyword = event.target.value
    }

    handlePublish(event){
        const message = {
            lmsField :this.keyword
        }
        publish(this.context, shipraChannelName, message);
    }

}
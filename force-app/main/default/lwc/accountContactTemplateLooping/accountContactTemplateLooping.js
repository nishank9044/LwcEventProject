import { LightningElement,wire} from 'lwc';
import AccConList from '@salesforce/apex/AccountContacts.getAccountsContacts'
export default class AccountContactTemplateLooping extends LightningElement {
conList = []
error = []

@wire(AccConList)
wiredContacts({data,error}){
    if(data){
        this.conList = data
        console.log(this.conList)
        this.error = undefined
    } else if(error){
       this.error = error
       this.conList = undefined
    }
}


}
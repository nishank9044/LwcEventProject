import { LightningElement,track,wire} from 'lwc';
import CaseList from '@salesforce/apex/CaseWrapper.getCases';
import updateSelectedCases from '@salesforce/apex/CaseWrapper.updateSelectedCases';
export default class CloseCases extends LightningElement {
 caseList = []
error

@wire(CaseList)
getCaseList({data,error}){
    if(data){
        console.log(data)
    this.caseList = JSON.parse(JSON.stringify(data));
    this.error = undefined
    } if(error){
            this.error = error
            this.caseList = undefined
    }
}
handleClick(event){
    event.preventDefault
    updateSelectedCases({ caseList: JSON.stringify(this.caseList)})
      .then(result => {
        window.location.reload()
        console.log('Result', result);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}
handleCheckbox(event){
event.preventDefault
let name = event.target.name
let checked = event.target.checked
let index = event.target.dataset.id
this.caseList[index][name] = checked

}

}
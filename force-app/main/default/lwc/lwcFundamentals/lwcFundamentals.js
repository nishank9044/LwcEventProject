import { LightningElement } from 'lwc';

export default class LwcFundamentals extends LightningElement {
    nameList = ["Shipra","Nikita","Palak"]

    name = ''
    handleInput(event){
        this.name = event.target.value
    }

    get updateName(){
      return this.nameList[0]
    }
}
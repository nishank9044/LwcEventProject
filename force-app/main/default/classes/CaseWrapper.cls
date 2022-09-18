public with sharing class CaseWrapper {
  
@AuraEnabled(cacheable=true)
public static List<WrapperClass> getCases(){
    List<WrapperClass> caseList = new List<WrapperClass>();
    try {
        for(case caseRecord:[SELECT Id, CaseNumber, Status, Subject
                                FROM Case
                                WHERE status != 'closed']){
  WrapperClass wrapper = new WrapperClass(caseRecord);
  caseList.add(wrapper);                                                   
    }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
    return caseList ;
}
    public class WrapperClass {
        @AuraEnabled
        public case caseRecord {get;set;}
        @AuraEnabled
       public boolean isSelected {get;set;}

       public WrapperClass(case caseRecord){
          this.caseRecord = caseRecord ;
          this.isSelected =  false ;
       }
    }

    @AuraEnabled
    public static void updateSelectedCases(string caseList){
        try { 
            List<Case> updateCase = new List<Case>();
            List<WrapperClass> cases = (List<WrapperClass>)JSON.deserialize(caseList, List<WrapperClass>.class);
            for(WrapperClass wrapper:cases){
                if(wrapper.isSelected == true){
                    case caseRecord = wrapper.caseRecord ;
                    caserecord.Status = 'closed';
                    updateCase.add(caseRecord);
                }
            }
            update updateCase;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

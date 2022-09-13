public with sharing class AccountControllerLookUp {
    @AuraEnabled(cacheable=true)
   public static List<Account> getAccounts(string searchacc){
    List<Account> accList = new List<Account>();
        string accname = '%'+searchacc +'%';
        if(searchacc != ''){
            accList = [SELECT id,Name from ACCOUNT WHERE Name LIKE:searchacc];
            return accList;
        }
        return accList;
   }
}

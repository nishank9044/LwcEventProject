public with sharing class AccountContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccountsContacts(){
        List<Contact> conList = [SELECT ACCOUNT.Name ,Account.Rating ,LastName,
                                 AccountId from Contact WHERE AccountId != NULL];
        return conList ;
    }
}

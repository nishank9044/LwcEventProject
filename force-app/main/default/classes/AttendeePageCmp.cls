public with sharing class AttendeePageCmp {
    @AuraEnabled
    public static List<Event_Attendee__c> upComingList(string attendeeId){
         List<Event_Attendee__c> eventsToAttend = [SELECT Id, Name, Event__c, Attendee__c , 
         Event__r.Name__c,
         Event__r.Start_DateTime__c,
         Event__r.Location__r.Name
         FROM Event_Attendee__c WHERE Attendee__c =:attendeeId AND Event__r.Start_DateTime__c >= TODAY AND Event__r.Live__c = true];
         return eventsToAttend ;
    }
}

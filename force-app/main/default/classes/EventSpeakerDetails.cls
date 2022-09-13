public with sharing class EventSpeakerDetails {
    @AuraEnabled
    public static List<EventSpeakers__c> getEventSpeakers(string eventId){
       List<EventSpeakers__c> eventSpeakerList = [SELECT Id,Name,speaker__r.Name,speaker__r.Email__c,
                                                      speaker__r.Phone__c 
                                                      FROM EventSpeakers__c
                                                       WHERE Event__c =:eventId
                                                      WITH SECURITY_ENFORCED];
         return  eventSpeakerList;                                            
    }

    @AuraEnabled
    public static Event__c getLocationDetails(string eventId){
          Event__c locationDetail = [SELECT Id,Name,Location__c,Location__r.Name,
          Location__r.City__c,Location__r.State__c,Location__r.Country__c,Location__r.Postal_Code__c,
          Location__r.Land_Mark__c
          FROM EVENT__c WHERE ID =:eventId WITH SECURITY_ENFORCED
          ];
          return locationDetail ;
    }

    @AuraEnabled
   public static List<EventAttendee> getAttendeeDetails(string eventId){
     List<EventAttendee> eventAttendeeList = new List<EventAttendee>();
        List<Event_Attendee__c> attendeeList = [SELECT id,Event__c,Attendee__c, 
                                             Attendee__r.Name , Attendee__r.Email__c,Attendee__r.Phone__c,Attendee__r.Location__c,
                                             Attendee__r.Location__r.Name
                                             FROM 
                                             Event_Attendee__c WHERE Event__c =:eventId];
    for(Event_Attendee__c evAtt:attendeeList){
     EventAttendee obj1 = new EventAttendee();
     obj1.attendeeName = evAtt.Attendee__r.Name;
     obj1.attendeeEmail = evAtt.Attendee__r.Email__c;
     obj1.attendeePhone = evAtt.Attendee__r.Phone__c;
     obj1.attendeeLocation = evAtt.Attendee__r.Location__r.Name;
     eventAttendeeList.add(obj1);
    }                                       
       return eventAttendeeList;
   }

   public class EventAttendee {
@AuraEnabled
public  string attendeeName;
@AuraEnabled
public  string attendeeEmail;
@AuraEnabled
public  string attendeePhone;
@AuraEnabled
public  string attendeeLocation;


   }

   @AuraEnabled
   public static string deleteRecord(string eventId){ 
         string s = '' ;
      Event_Attendee__c ev = [SELECT id,event__c  from Event_Attendee__c WHERE event__c =:eventID LIMIT 1];
      delete  ev;
             s = 'yes' ;
       
       system.debug(s);
       return s;
   }
}
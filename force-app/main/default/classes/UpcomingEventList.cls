public   class UpcomingEventList {
   @AuraEnabled
  public static List<Event__c> upComingEvents(){
    List<Event__c> upComingEvents = [SELECT id,Name__c,Location__c,Event_Organizer__c,Event_Organizer__r.Name,
                                    Location__r.Name,PeopleAttending__c FROM Event__c
                                    WHERE Start_DateTime__c >= TODAY AND  Live__c = true
                                    ];
    return upComingEvents ;
  }
}
Sample delete index script
 
JavaScript
/*
*  Author: Daniel Nguyen*  
*  Update ICPInternalID due to wrong one was used (Entity TFN/ICPInternalID)
*  DEV execution: load("/home/<userid>@developer.atodnet.gov.au/mbr-directorid-dbscripts/releases/31-01-2024-Verne-1.18.x/1_persons_ICPInternalID_fix.js")
*/

var incNum = "INC003836146";
var tfsNum = "BUG 3777391 Release 31-01-2024 - ICPInternalID fix";
var scriptRef = incNum + " - " + tfsNum;
const startTime = new Date()
print("=========== " + scriptRef  + " Script start ===========");
print()


const accountList = {};
accountList["INC000001"] = {
    directorID: "5645848",      
    directorName: "Joshua sasa",    
    businessIdentifier: "", 
    identifier: "", 
    businessName: "",   
    incorrectICPInternalID:"2015151515",
    incorrectUserProfileExist:"",
    correctICPInternalID:"10256458485",
    correctDirectorIDExist:"",
    correctUserProfileExist:"",
    updateStatus:"",
    comment:""
};

accountList["INC000000"] = {
    directorID: "065458484848",     
    directorName: "Tinka test", 
    businessIdentifier: "", 
    identifier: "", 
    businessName: "",   
    incorrectICPInternalID:"1548484848",
    incorrectUserProfileExist:"",
    correctICPInternalID:"15454151",
    correctDirectorIDExist:"",
    correctUserProfileExist:"",
    updateStatus:"",
    comment:""
};

a
// Update
var updateCount = 0
var didUpdateCount = 0
Object.keys(accountList).forEach(id => {            
    const accountRow = accountList[id];     
    var incorrectPersonRec = db.registry_persons.findOne({appCode:"persons","domainTree.attributes.ICPInternalID": accountRow.incorrectICPInternalID,"domainTree.DirectorEntitlements.Identifiers.attributes.Identifier": accountRow.directorID,ghost:false,status:"activated",prevVersionId:null});            
    var incorrectUserProfileExist = (db.registry_security_users.countDocuments({appCode:"security","domainTree.attributes.ICPInternalID": accountRow.incorrectICPInternalID,ghost:false,status:"activated"}) > 0);          
    accountRow.incorrectUserProfileExist = incorrectUserProfileExist;   
    var correctPersonRecExist = (db.registry_persons.countDocuments({appCode:"persons","domainTree.attributes.ICPInternalID": accountRow.correctICPInternalID,ghost:false,status:"activated"}) > 0);            
    var correctUserProfileExist = (db.registry_security_users.countDocuments({appCode:"security","domainTree.attributes.ICPInternalID": accountRow.correctICPInternalID,ghost:false,status:"activated"}) > 0);          
    accountRow.correctDirectorIDExist = correctPersonRecExist;
    accountRow.correctUserProfileExist = correctUserProfileExist;   
    // print("=== Processing " + id + " DID: " + accountRow.directorID + " - incorrect ICPInternalID: " + accountRow.incorrectICPInternalID + " - correct ICPInternalID: " + accountRow.correctICPInternalID + " ===")  
    // print("Incorect record found: " + (incorrectPersonRec != null) + " - correct record found: " + correctPersonRecExist)    
    if (incorrectPersonRec != null){
        accountRow.identifier = incorrectPersonRec.identifier;
        accountRow.businessIdentifier = incorrectPersonRec.businessIdentifier;
        accountRow.businessName = incorrectPersonRec.businessName;
        accountRow.comment = "Incorrect ICPInternalID record found"     
        if (!correctPersonRecExist) {       
            // accountRow.updateStatus = "TO UPDATE - REPORT ONLY"                      
    
            //====================Release==========================
            // Uncomment below to send to release
    
            // Update all records current and historic              
            var result = db.registry_persons.updateMany(   
                {appCode:"persons",identifier: incorrectPersonRec.identifier},
                {
                    $set: {"domainTree.attributes.ICPInternalID": accountRow.correctICPInternalID,updatedByName: id, updatedBy: "system", updatedDate: new Date()}                                  
                },
                { "upsert": false}
            )               
            updateCount += result.modifiedCount
            didUpdateCount ++       
            accountRow.updateStatus = (result.modifiedCount > 0) ? "DONE" : "FAIL"                      
            
            accountRow.comment += ", and it has been updated to correct one";       
        } else {
            accountRow.updateStatus = "Not required"
            accountRow.comment += ", BUT correct ICPInternalID record has been created, manual remediation is required";        
        }
    } else {
        accountRow.updateStatus = "Not required"
        accountRow.comment = "Incorrect ICPInternalID record NOT found"     
    }   
});

print()
print("=========== Number of updated DID: " + didUpdateCount + " - Number of updated records: " + updateCount + " ===========");  

print()
print("=========== Report ===========");  
// Export - Header
print('Incident,DirectorID,DirectorName,Identifier,BusinessIdentifier,BusinessName,IncorrectICPInternalID,IncorrectUserProfilleExist,CorrectICPInternalID,CorrectDirectorIDExist,CorrectUserProfileExist,UpdateStatus,Comment');
Object.keys(accountList).forEach(id => {        
    const accountRow = accountList[id]; 
    // print(accountRow)
    var csv = '"' + id + '"';
    csv += ',"' + accountRow.directorID + '"';      
    csv += ',"' + accountRow.directorName + '"';        
    csv += ',"' + accountRow.identifier + '"';      
    csv += ',"' + accountRow.businessIdentifier + '"';      
    csv += ',"' + accountRow.businessName + '"';        
    csv += ',"' + accountRow.incorrectICPInternalID + '"';      
    csv += ',"' + accountRow.incorrectUserProfileExist + '"';           
    csv += ',"' + accountRow.correctICPInternalID + '"';            
    csv += ',"' + accountRow.correctDirectorIDExist + '"';          
    csv += ',"' + accountRow.correctUserProfileExist + '"';         
    csv += ',"' + accountRow.updateStatus + '"';            
    csv += ',"' + accountRow.comment + '"';         
    print(csv);         
});
print()
print("=========== End of Report ===========");  

print()
print("=========== " + scriptRef + " script finished successfully ===========");  

print()
const finishTime = new Date()   
print("Start time: " + startTime);  
print("Finish time: " + finishTime);    
print("Duration: " + (Math.floor((finishTime.getTime()-startTime.getTime())/1000)) + " sec \n" );
Expand (130 lines)
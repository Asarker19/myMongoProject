/*
 *  Author: Anup Sarker
 *  TFS: 3921216
 *  Update DID with dummy ICPInternalID provided by business: 9999003836146
 *  Note: Put find one outside the reportMode. --. find() if report mode just display else $set...................
 */

var tfsNum = "TFS3921216 ";
var incDesc = "Update DID with dummy ICPInternalID provided by business.";
var scriptRef = tfsNum + incDesc;
const startTime = new Date();

print("Script start: =========== " + scriptRef + "===========");

var dbName = "catalyst";
var dbCollection = "registry_persons";
var reportMode = true;

const accountList = {};
accountList["8d2f8d62329edbfff726b39ad47f9a1a"] = {
  directorId: "036853071943794",
  businessIdentifier: "NP-000010",
  expectedCount: "",
  upDatedCount: "",
  updateStatus: "",
  comment: "",
};
// accountList["49a4c29744ea8137e73b2d61c489c469"] = {
//   directorId: "036499998496959",
//   businessIdentifier: "NP-000004",
//   expectedCount: "",
//   upDatedCount: "",
//   updateStatus: "",
//   comment: "",
// };

var totalExpectedCount = 0;
var totalUpdatedCount=0;
var errorCount = 0;



Object.keys(accountList).forEach((id) => {
  const accountRow = accountList[id];
  var expectedCount = 0;
  var updateCount = 0;
  try {
    if (reportMode) {
      print("");
      print("Document ID for : " + id);
      var resultImpactedID = db.getCollection(dbCollection).find({
        appCode: "persons",
        identifier: id,
        status: "activated",
        "domainTree.attributes.ICPInternalID": null,
      });  
      
      print(resultImpactedID.sequence);


          // resultImpactedID returned an Array, running the array inside forEach for document _ID.
    //   resultImpactedID.forEach(function reportModeIterationFunc(value) {
    //     expectedCount++;
    //     print("_id: " + value._id);
    //   });
    //   accountRow.expectedCount += " ," + expectedCount;
    //   totalExpectedCount += expectedCount;

    //   var isImpactedIDFound = resultImpactedID != null;
    //   if (isImpactedIDFound) {
    //     accountRow.upDatedCount += ", 0 ";
    //     accountRow.comment +=", Report ONLY, update execution take place here!";
    //     accountRow.updateStatus += "Report ONLY: DONE";
    //   } else {
    //     accountRow.upDatedCount += ", 0 ";
    //     accountRow.comment += "Failed to update current null ICP Internal Id!";
    //     accountRow.updateStatus = "Report ONLY: FAILED";
    //   } // report mode finishes
    // }
    // else {
    //     var resultImpactedIDForUpdate = db.getCollection(dbCollection).find({
    //     appCode: "persons",
    //     identifier: id,
    //     status: "activated",
    //     "domainTree.attributes.ICPInternalID": null,
    //   });
      
    //     resultImpactedIDForUpdate.forEach(function (item) 
    //     {
    //     updateCount++;         
    //     var docID = item._id;
    //     print("Document ID: " + docID);   
    //     var currentNullICPIntIdUpdateResult = db.getCollection(dbCollection).updateMany(
    //         {
    //           _id: docID,
    //         },
    //         {
    //           $set: {
    //             "domainTree.attributes.ICPInternalID": "9999003836146",
    //             updatedByName: tfsNum,
    //             updatedBy: "system",
    //             updatedDate: new Date(),
    //           },
    //         }
    //       );
    //     accountRow.upDatedCount += " ," + updateCount;        
    //     totalUpdatedCount += updateCount;   
    //     print("Total updated ID " +id + ":" +totalUpdatedCount); 
    //     var isNullICPIntIdUpdated = currentNullICPIntIdUpdateResult != null;
    //     if (isNullICPIntIdUpdated) {
    //       accountRow.expectedCount += ", 0";
    //       accountRow.comment += ", Current null ICP Internal Id has been updated successfully!";
    //       accountRow.updateStatus = ", DONE";
    //     } else {
    //       accountRow.comment += ", Failed to update current null ICP Internal Id!";
    //       accountRow.updateStatus = ", FAILED";
    //     }

    //   });
         
     
    }
  } catch (error) {
    errorCount++;
    print("Error occured: " + error);
    accountRow.updateStatus += "FAILED";
    accountRow.comment += "FAILED to update record: " + error;
  }
  
});

/*
print("=========== Begining of Report ===========");
print();


print(
  "BugNumber,Identifier,DirectorID,BusinessIdentifier,ExpectedCount,UpDatedCount,UpdateStatus,Comment"
);
Object.keys(accountList).forEach((id) => {
  const accountRow = accountList[id];
  var csv = '"' + tfsNum + '"';
  csv += ',"' + id + '"';
  csv += ',"' + accountRow.directorId + '"';
  csv += ',"' + accountRow.businessIdentifier + '"';
  csv += ',"' + accountRow.expectedCount + '"';
  csv += ',"' + accountRow.upDatedCount + '"';
  csv += ',"' + accountRow.updateStatus + '"';
  csv += ',"' + accountRow.comment + '"';
  print(csv);
});

if (reportMode != false) {
  print();
  print("Total expected records to be modified accross all records: " + totalExpectedCount);
}

print();
print("=========== End of Report ===========");

print();
print("=========== " + scriptRef + " script finished successfully ===========");
print();

const finishTime = new Date();
print("Start time: " + startTime);
print("Finish time: " + finishTime);
print(
  "Duration: " +
    Math.floor((finishTime.getTime() - startTime.getTime()) / 1000) +
    " sec \n"
);

*/
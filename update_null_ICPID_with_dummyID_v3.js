/*
 *  Author: Anup Sarker
 *  TFS: 3921216
 *  Update DID with dummy ICPInternalID provided by business: 9999003836146
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

var totalExpectedCount = 0;
var totalUpdatedCount = 0;
var errorCount = 0;



Object.keys(accountList).forEach(function accountListIteration(id) {
  const accountRow = accountList[id];
  var expectedCount = 0;
  var updateCount = 0;

  try {
    if (reportMode) {
      print("");
      print("Business identifier : " + id);

      var resultImpactedDocID = db.getCollection(dbCollection).find({
        appCode: "persons",
        identifier: id,
        status: "activated",
        "domainTree.attributes.ICPInternalID": null,
      });

      resultImpactedDocID.forEach(function (item){
        expectedCount ++;
        print (" _id: " + item._id)
      });// Inner iteration 

    };//Report mode end      
    
    }//try secrion
   catch (error) { // catch starts
    errorCount++;
    print("Error occured: " + error);
    accountRow.updateStatus += "FAILED";
    accountRow.comment += "FAILED to update record: " + error;
  }
}); // for each accountList

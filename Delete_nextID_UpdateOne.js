var db = connect("localhost:27017/catalyst");

var incNum = "INC0000";
var tfsNum = "TFS_4000";
var scriptRef = incNum + " - " + tfsNum;
var dbName = "catalyst";
var dbCollection = "registry_persons";
var upsert = false;
var incDesc = "Test incident description";

try {
  var dryRun = false;
  var verbose = true;
  const startTime = new Date();
  print("===========  Script start ===========");
  if (typeof dryRun === "undefined") {
    var dryRun = true;
  }
  if (typeof verbose === "undefined") {
    var verbose = true;
  }
  var updatedCount = 0;
  if (verbose) {
    print(incDesc + "\n");
  }
  var session = db.getMongo().startSession();
  db = session.getDatabase(dbName);
  session.startTransaction();
  var result = db.getCollection(dbCollection).updateOne(
    {
      "identifier": "asayhiortnklnlkrt1541285sdsdffvastatgagagaaga",
      "businessIdentifier": "NP-012454",
      "businessName": "search2 user2 User2",
      "createdBy": "Anup Sarker",
      "domainTree.DirectorEntitlements.Identifiers.attributes.Identifier": "036555577788880",
      "domainTree.DirectorEntitlements.EntitlementStatuses.attributes.Status": "active",
      "domainTree.DirectorEntitlements.EntitlementStatuses.attributes.StartDate": 20231201,
      "filings.activatedServiceTransactionId": "asayhiortnklnlkrt1541285sdsdffvastatgagagaaga"
    },
    {
      $set: {
        "nextVersionId": null
      }
    },
    { "upsert": upsert }
  );

  const expectedCount = 1;

  updatedCount = result.modifiedCount + result.upsertedCount;

  var updateCheck = updatedCount == expectedCount;

  if (verbose) {
    if (upsert) {
      print("Updated documents: " + result.modifiedCount);
      print("Upserted documents: " + result.upsertedCount);
      print("Total updated documents: " + updatedCount);
    } else {
      print("Total updated documents: " + updatedCount);
    }

    if (!updateCheck) {
      print("WARNING: Did not find exactly " + expectedCount + " document as expected. Check and try again.\n");
    }

    print("");
  }

  if (!dryRun) {
    session.commitTransaction();
    print("Updated documents: " + updatedCount + "/" + expectedCount);

    if (!updateCheck) {
      print("WARNING: UPDATED DOCUMENT COUNT DOES NOT MATCH EXPECTED DOCUMENT COUNT! PLEASE CHECK AND TRY AGAIN");
    }
  } else {
    print("DRY RUN: " + dryRun + "UPDATED CHECK: " + updateCheck + " - ABORTING TRANSACTION");
    session.abortTransaction();
  }

  session.endSession();
  print("=========== " + scriptRef + " script finished successfully ===========");

  print();

  const finishTime = new Date();

  print("Start time: " + startTime);
  print("Finish time: " + finishTime);
  print("Duration: " + (Math.floor((finishTime.getTime() - startTime.getTime()) / 1000)) + " sec \n");
} catch (e) {
  print("=========== " + scriptRef + " script: error occurred: " + e + " ===========");
}

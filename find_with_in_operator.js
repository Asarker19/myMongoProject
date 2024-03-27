// Connect to the 'catalyst' database
var db = connect("localhost:27017/catalyst");
// Use the 'registry_persons' collection
var personsConnection = db.getCollection("registry_persons");
var updateItem = true;
var recordCount = 0;

var query = {
  identifier: {
    $in: [
      "arsdkadhkasdkaoasioasdodioasiodjoisjdioqwjoirt46464738939302020202hjdhnjjnjhnjhnjnjhjnsdws", 
      "asayhiortnklnlkrt1541285sdsdffvastatgagagaaga"
    ]
  }
};

// Find documents based on the query
var itemCollection = personsConnection.find(query);

// Iterate over the cursor and print the results
itemCollection.forEach(function (item) {
  print("Updating businessName : " + item.businessName);
  print("Updating prevVersionId : " + item.prevVersionId);
  print("Updating nextVersionId : " + item.nextVersionId);

  // Use a standard for loop to iterate over the specified fields
  var fieldsToUpdate = ['prevVersionId', 'nextVersionId'];
   
  fieldsToUpdate.forEach(function(field){
	  print("Processing " + field);	 
	   if (item.hasOwnProperty(field)) {
      delete item[field];
      print("Field " + field + " deleted successfully.");
    } else {
      print("Field " + field + " not found in the document.");
    } 
	  
  });
 if (updateItem) {
    recordCount++;
    try {
      print("Saving MongoDB Record. " + item._id);
      personsConnection.updateOne({ _id: item._id }, { "$set": item });
    } catch (rollerror) {
      print("Update Error: " + rollerror);
    }
  }
	  
  });  
  
print("Finished. " + recordCount + " Items Updated");
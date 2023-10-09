import pymongo

def requestDatas(dId=None, startDate=None, endDate=None):
    host = "app.blipconnection.com" 
    port = 27017  
    username = "admin"  
    password = "iotabserver"  
    database_name = "iotab" 
    client = pymongo.MongoClient(host, port, username=username, password=password)
    db = client[database_name]
    collection = db["datas"]
    if dId != None:
        allEntries = collection.find({"dId": dId})
    else:
        allEntries = collection.find()
    if startDate != None and endDate != None:
        result = [item for item in allEntries if item["time"] >= startDate and item["time"] <= endDate] 
    elif startDate != None and endDate == None:
        result = [item for item in allEntries if item["time"] >= startDate] 
    elif endDate != None and startDate == None:
        result = [item for item in allEntries if  item["time"] <= endDate] 
    else:
        result = allEntries
    return result


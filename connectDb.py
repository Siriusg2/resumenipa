import pymongo

def requestDatas(channel_id, dId=None, startDate=None, endDate=None):
    host = "app.blipconnection.com" 
    port = 27017  
    username = "admin"  
    password = "iotabserver"  
    database_name = "iotab" 
    client = pymongo.MongoClient(host, port, username=username, password=password)
    db = client[database_name]
    datas_collection = db["datas"]
    users_collection = db["users"]
    devices_collection = db["devices"]
    users_of_channel = users_collection.find({"channel": channel_id})
    user_ids = [str(user["_id"]) for user in users_of_channel]
    allEntries=[]
    if dId != None:
        allEntries = datas_collection.find({"dId": dId})
    else:
        allEntries = datas_collection.find({"userId": {"$in": user_ids}})
  

    if startDate != None and endDate != None:
        result = [item for item in allEntries if item["time"] >= startDate and item["time"] <= endDate] 
    elif startDate != None and endDate == None:
        result = [item for item in allEntries if item["time"] >= startDate] 
    elif endDate != None and startDate == None:
        result = [item for item in allEntries if  item["time"] <= endDate] 
    else:
        result = allEntries
    result= list(result)
    devices_ids = [device["dId"] for device in result]
    devices = devices_collection.find({"dId": {"$in": devices_ids}})
    device_names_dict = {device["dId"]: device["name"] for device in devices}

    for entry in result:  
       entry["device_name"] = device_names_dict.get(entry["dId"], "Nombre Desconocido")
   
    return result
requestDatas("6515cd2bf2295200154f579e")

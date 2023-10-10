from connectDb import requestDatas
import json


def alertsQuantityPerType(all_data, dId=None ):
    if dId != None:
        allEntries = [item for item in all_data if  item["dId"] == dId] 
    else:
        allEntries = all_data
    count = 0
    alarmsTypeCount = { 'battery': 0, 'alert_speed': 0, 'alert_fall': 0, 'alert_tilt': 0,  'power_off': 0, 'power_on': 0, 'no_motion': 0, 'alert_sos': 0}
    for entry in allEntries:
        data = json.loads(entry["data"])
        if len(data["alarm_status"]):
            if"geofence_status" in data["alarm_status"]:
                print(data["alarm_status"]["geofence_status"])
            for alarm, value in data["alarm_status"].items():
                if alarm in alarmsTypeCount and value != 0:
                    alarmsTypeCount[alarm] += 1
                    count += 1
    response = {
        "count": count,
        "alarmsTypeCount": alarmsTypeCount
    }        
    return response
all_data = requestDatas("6515cd2bf2295200154f579e")
response = {}
device_names_dict = {data["dId"]: data["device_name"] for data in all_data}
for key, value in device_names_dict.items():
    response[value] = alertsQuantityPerType(all_data, key)

print(response)
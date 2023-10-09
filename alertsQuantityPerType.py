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

print(alertsQuantityPerType(requestDatas()))
from connectDb import requestDatas
import json
import pandas as pd
from pandas import json_normalize

def alertsQuantityPerType(all_data, dId=None ):
    if dId != None:
        allEntries = [item for item in all_data if  item["dId"] == dId] 
    else:
        allEntries = all_data
    count = 0
    alarmsTypeCount = { 'battery': 0, 'alert_speed': 0, 'alert_fall': 0, 'geofences': 0,  'power_off': 0, 'power_on': 0, 'no_motion': 0, 'alert_sos': 0, "SOS_app":0}
    for entry in allEntries:
        data = json.loads(entry["data"])
        if len(data["alarm_status"]):
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
results_list = []

for key, value in device_names_dict.items():
    results_list.append ({"device_name": value, "device_id": key,"data":alertsQuantityPerType(all_data, key)
})
# print(results_list[0])
def create_excel_file(response):
    df = pd.DataFrame(response)

    df = pd.concat([df.drop(['data'], axis=1), df['data'].apply(pd.Series)], axis=1)

# Aplanar la columna 'alarmsTypeCount'
    df = pd.concat([df.drop(['alarmsTypeCount'], axis=1), df['alarmsTypeCount'].apply(pd.Series)], axis=1)
# Exporta el DataFrame a un archivo de Excel
    excel_file = 'excel_reports/alertsQuantityPerType.xlsx'
    df.to_excel(excel_file)
create_excel_file(results_list)
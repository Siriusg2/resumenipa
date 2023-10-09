from connectDb import requestDatas
import json
import datetime



def timeInAndOutHome(all_data, dId=None ):
    if dId != None:
        allEntries = [item for item in all_data if  item["dId"] == dId] 
    else:
        allEntries = all_data
    count_in_home = 0
    count_out_home = 0

    for entry in allEntries:
        data = json.loads(entry["data"])
        if len(data["gps"]) and len(data["wifi_location"]) ==0 :
            count_out_home+= entry["time"]
         
        elif len(data["wifi_location"]) and len(data["gps"]) ==0:
            count_in_home+= entry["time"]
           
    
  


    delta_time_in_home = datetime.timedelta(seconds=count_in_home)      
    delta_time_out_home = datetime.timedelta(seconds=count_out_home)
    result={
        "in_home": f"{delta_time_in_home.seconds//3600}:{(delta_time_in_home.seconds%3600)//60}:{delta_time_in_home.seconds%3600%60}",
        "out_home": f"{delta_time_out_home.seconds//3600}:{(delta_time_out_home.seconds%3600)//60}:{delta_time_out_home.seconds%3600%60}",
    }      
    return result
# fecha_start = "2023-10-09 23:59:59"
# fecha_end = "2023-10-08 00:00:00"
# fecha_obj_start = datetime.datetime.strptime(fecha_start, "%Y-%m-%d %H:%M:%S")
# fecha_obj_end = datetime.datetime.strptime(fecha_end, "%Y-%m-%d %H:%M:%S")
# timestamp_unix_start = fecha_obj_start.timestamp()
# timestamp_unix_end = fecha_obj_end.timestamp()
print(timeInAndOutHome(requestDatas("*862095056169599")))
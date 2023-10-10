from connectDb import requestDatas
# import json


def total_test_time(all_entrances):
    if len(all_entrances) == 0:
        return
    devices = {}
    for entrance in all_entrances:
        dId = entrance["dId"]
        if dId not in devices:
            devices[dId] = {
                "name": entrance["device_name"],
                "first_msg_time": entrance["time"],
                "last_msg_time": entrance["time"]
            }
        else:
            devices[dId]["last_msg_time"] = entrance["time"]

    # print(devices)

    final_response = {}
    total = 0
    for device in devices:
        time = devices[device]["last_msg_time"] - \
            devices[device]["first_msg_time"]
        total = total+time

        days = int(time/1000/60/60/24)
        final_response[device] = {
            "name": devices[device]["name"],
            "days": days
        }
    total = total/len(devices.keys())
    final_response["promedio"] = {
        "name": "todos",
        "days": int(total/1000/60/60/24)
    }

    return final_response


print(total_test_time(requestDatas("6515cd2bf2295200154f579e")))

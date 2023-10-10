from connectDb import requestDatas
import json


def time_on_off(all_entrance):
    full_response = {
        "total": {
            "on": 0,
            "off": 0
        }
    }
    for entrance in all_entrance:
        dId = entrance["dId"]
        if dId not in full_response:
            full_response[dId] = {
                "name": entrance["device_name"],
                "on": 0,
                "off": 0,
                "last_msg_time": entrance["time"]
            }
        else:
            time_interval = entrance["time"] - \
                full_response[dId]["last_msg_time"]

            full_response[dId]["last_msg_time"] = entrance["time"]
            alarm_status = json.loads(entrance["data"])["alarm_status"]

            if "power_on" in alarm_status and alarm_status["power_on"] != 0:
                full_response[dId]["off"] = full_response[dId]["off"] + \
                    time_interval
                full_response["total"]["off"] = full_response["total"]["off"] + \
                    time_interval
            else:
                full_response[dId]["on"] = full_response[dId]["on"] + \
                    time_interval
                full_response["total"]["on"] = full_response["total"]["on"] + \
                    time_interval

    for response in full_response:
        full_response[response] = {
            "name": full_response[response]["name"] if "name" in full_response[response] else "todos",
            "on": {
                "horas": int(full_response[response]["on"]/1000/60/60),
                "minutos": int((full_response[response]["on"]/1000/60/60) % 60),
                "segundos": int(((full_response[response]["on"]/1000/60/60) % 60) % 60)
            },
            "off": {
                "horas": int(full_response[response]["off"]/1000/60/60),
                "minutos": int((full_response[response]["off"]/1000/60/60) % 60),
                "segundos": int(((full_response[response]["off"]/1000/60/60) % 60) % 60)
            },
        }

    return full_response


print(time_on_off(requestDatas("6515cd2bf2295200154f579e")))
# , '*862095056372110'

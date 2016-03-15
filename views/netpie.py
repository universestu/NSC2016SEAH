import json
import microgear.client as client
import time

gearkey = "Djmh3H2yte6CIrW"
gearsecret =  "43J9u4sJmMe34omGvLdu51JF74prLT"
appid = "NSC2016SEAH"

client.create(gearkey,gearsecret,appid)

def connection():
    print "Now I am connected with netpie"

def subscription(topic,message):
    print topic+" "+message
    with open('data.json', 'w') as outfile:
    	data = '{\"value1\":" + float(message) +",\"value2\":300}'
    	json.dump(data, outfile)

client.setalias("server")
client.on_connect = connection
client.on_message = subscription
client.subscribe("/Value")

client.connect(True)

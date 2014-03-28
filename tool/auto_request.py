__author__ = 'phamvanhung'
from urlparse import urlparse
from threading import Thread
import httplib, sys
from Queue import Queue
from fabric.api import *
import json, requests
import pprint
import time
from pymongo import MongoClient

import uuid
import random
import string
from functools import wraps
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client.frienger_db

# SERVER = 'http://spider-app.jinsei-iroiro.com'
SERVER = "http://localhost"
APP_ID = '52fb0a4d6c76a309dcdb517f'
BASE_URL = SERVER


def timer_print(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        start = int(round(time.time() * 1000))
        print "start in " + f.__name__ + " " + str(start)
        result = f(*args, **kwds)
        end = int(round(time.time() * 1000))
        print "end in " + f.__name__ + " " + str(end)
        print "total in " + f.__name__ + " " + str(end - start)
        print "StatusCode:----   " + str(result.status_code)
        # print result
        return result

    return wrapper


@timer_print
def request(data):
    myurl = BASE_URL + '/report'
    print "URL:-----   " + myurl
    headers = {"Content-type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"}
    result = requests.post(myurl, data={'record':data},headers=headers)
    print result.text
    return result



filename = "test.csv"
csvfile = open(filename)
line = csvfile.readline()




while line:
    print line
    line = csvfile.readline()
    import time
    time.sleep(0.5)
    request(line)

csvfile.close



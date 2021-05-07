# -*- coding UTF-8 -*-

from pymongo import MongoClient
import datetime
import time
import json

#requests
import requests
from requests.auth import HTTPBasicAuth
from bs4 import BeautifulSoup
#color
from termcolor import colored
#str -> ObjectID
from bson import ObjectId

class CardRecords:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "post"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Card recording ...",'green'))			
			# print("data = \n")
			tmp = json.loads(tmp.decode('utf-8'))
			
			# print(tmp['StartTime'],tmp['EndTime'])
			starttime = int(tmp['StartTime'])
			endtime = int(tmp['EndTime'])
            #timezone = int(tmp['TimeZone'])
            #acsgroup = int(tmp['AcsGroup'])
			# print(starttime,endtime)

			StartTime_string = datetime.datetime.fromtimestamp(tmp['StartTime'])
			EndTime_string = datetime.datetime.fromtimestamp(tmp['EndTime'])

			cr = tmp['CardReader']
			cm_id = tmp['Campus_ID']
			
			dict_cr = Query_CardReader(cr)
			dict_cm_id = Query_User(cm_id)

            
			data = {
				'CardReader':dict_cr,
				'Person':dict_cm_id,
				'StartTime':starttime,
				'EndTime':endtime,
				'StartTime_string':StartTime_string.strftime("%Y-%m-%d %H:%M:%S"),
				'EndTime_string':EndTime_string.strftime("%Y-%m-%d %H:%M:%S"),
                'Status':tmp['Status'],
                'TimeZone':tmp['TimeZone'],
                'AcsGroup':tmp['AcsGroup'],
                'GroupNum':tmp['GroupNum'],
                'TimeZonestr':tmp['TimeZonestr']
			}

			#POST to DB
			POST(data,0)

			print("\n===========================================================")
			
		except Exception as e:
			resp.body = json.dumps({
				'message':'error for'+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			resp.body = json.dumps({
				'Person':cm_id,
				'Room':cr,
				'result':'Success!',
				'flag':bool(1)
			})

def Query_CardReader(Name):
    mongo_url = "mongodb://140.118.123.95:10003"
    conn = MongoClient(mongo_url)
    db = conn['SMR']
    coll = db['CardReader']
    _find = {"Name":Name}
    doc = coll.find_one(_find,{'_id':False})
	
    result = {
        'Name':doc['Name'],
        'CrAddress':doc['CrAddress'],
        'IP':doc['IP'],
        'Port':doc['Port']
    }

    return result

def Query_User(Campus_ID):
    mongo_url = "mongodb://140.118.123.95:10003"
    conn = MongoClient(mongo_url)
    db = conn['SMR']
    coll = db['User']
    _find = {"Campus_ID":Campus_ID}
    doc = coll.find_one(_find,{'_id':False})
    
    result = {
        'UserName':doc['UserName'],
		'Supervisor':doc['Supervisor'],
        'Campus_ID':doc['Campus_ID'],
        'CardNumber':doc['CardNumber']
    }

    return result

def Query_Supervisor(Supervisor):
	mongo_url = "mongodb://140.118.123.95:10003"
	conn = MongoClient(mongo_url)
	db = conn['SMR']
	coll = db['User']
	_find = {"Supervisor":Supervisor}
	doc = coll.find(_find,{'id':False})

	print(result)

#POST to mongoDB(smartcampus)
def POST(data, collect):
	try:
		# print(colored("SAVING Commmad to MongoDB ...",'green'))
		# print("Function Name : ")
		if collect == 0 :
			try:
				mongo_url = "mongodb://140.118.123.95:10003"
				conn = MongoClient(mongo_url)
				db = conn['SMR']

				coll = db['CardRecords']
			except Exception as err_post:
				print("Response Code :",colored(err_post.status_code,'red'))
				print(colored(err_post,'red'))
			else:
				coll.insert_one(data)
				print(colored("Card recording SUCCESS !!",'green'))
		elif collect == 1:		#remove
			try:
				mongo_url = "mongodb://140.118.123.95:10003"
				conn = MongoClient(mongo_url)
				db = conn['SMR']

				coll = db['CardRecords']
			except Exception as err_post:
				print("Response Code :",colored(err_post.status_code,'red'))   ###requests_post.status
				print(colored(err_post,'red'))
			else:
					#str_to_objectid = ObjectId(data['_id'])  # dict to string
					coll.remove({"_id" :  ObjectId(data['_id'])  })
					print(colored("Remove SUCCESS !!",'green'))
					return True
	except Exception as err_login:
		print(err_login)
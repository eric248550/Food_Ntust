# -*- coding UTF-8 -*-

import datetime
import time
import json

import pymysql
#requests
import requests
from requests.auth import HTTPBasicAuth
#from bs4 import BeautifulSoup
#color
from termcolor import colored
#str -> ObjectID
from bson import ObjectId

class OrderFood:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "Order_Food"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Food ordering ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))
			food_id = int(tmp["food_id"])
			order_name = tmp["name"]
			order_status = "cooking"
			print(food_id, order_name, order_status)
			#POST to SQL
			orderFood(food_id, order_name, order_status)

			print("\n===========================================================")
			
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for '+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			resp.text = json.dumps({
				'Person':order_name,
				'food_id':food_id,
				'result':'Success!',
				'flag':bool(1)
			})

def orderFood(id, name, status):
	food_id = id
	order_pname = name #person name
	order_status = status

	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_search = '''SELECT * FROM food_menu WHERE food_id = %s '''
	data = (food_id)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	order_fname = result[0][1] #food name
	food_restaurant = result[0][2]
	food_price = result[0][3]

	sql_search = '''SELECT * FROM member WHERE member_name = %s '''
	data = (order_pname)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	member_location = result[0][2]
	member_phone = result[0][4]

	sql_search = '''SELECT * FROM restaurant WHERE restaurant_name = %s '''
	data = (food_restaurant)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	restaurant_location = result[0][2]

	food_location = restaurant_location + ': ' + food_restaurant

	sql_insert = '''INSERT INTO food_order (order_pname, order_fname, food_location, deliver_location, order_phone, order_price, order_status) VALUES (%s, %s, %s, %s, %s, %s, %s);'''
	data = (order_pname, order_fname, food_location, member_location, member_phone, food_price, order_status)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()
'''
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
			resp.text = json.dumps({
				'message':'error for'+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			resp.text = json.dumps({
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
'''
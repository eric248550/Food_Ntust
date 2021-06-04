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

class CookFinish:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "CookFinish"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Cook finish ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			order_id = tmp["order_id"]
			print(order_id)
			#POST to SQL
			cookFinish(order_id)

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
				'result':'Success!',
				'flag':bool(1)
			})

def cookFinish(order_id):
	order_status = 'waiting for deliver'

	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	# change status
	sql_search = '''UPDATE food_order SET order_status = %s WHERE order_id = %s '''
	data = (order_status, order_id)
	cursor.execute(sql_search, data)
	conn.commit()
	
	cursor.close()
	conn.close()

class OrderFinish:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "OrderFinish"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Finish order ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			order_id = tmp["order_id"]
			print(order_id)
			#POST to SQL
			orderFinish(order_id)

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
				'result':'Success!',
				'flag':bool(1)
			})

def orderFinish(order_id):
	order_status = 'Finish'

	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	# change status
	sql_search = '''UPDATE food_order SET order_status = %s WHERE order_id = %s '''
	data = (order_status, order_id)
	cursor.execute(sql_search, data)
	conn.commit()
	
	cursor.close()
	conn.close()

class ToDeliver:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "ToDeliver"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Deliver taking ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			order_id = tmp["order_id"]
			deliver_email = tmp["deliver_email"]
			print(order_id, deliver_email)
			#POST to SQL
			toDeliver(order_id, deliver_email)

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
				'result':'Success!',
				'flag':bool(1)
			})

def toDeliver(order_id, deliver_email):
	order_status = 'delivering'

	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_search = '''UPDATE food_order SET food_deliver = %s, order_status = %s WHERE order_id = %s '''
	data = (deliver_email, order_status, order_id)
	cursor.execute(sql_search, data)
	conn.commit()
	
	cursor.close()
	conn.close()


class OrderFood:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "Order_Food"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Food ordering ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			order_id = str(int(time.time()))
			for i in range(len(tmp)):
				food_name = tmp[i]["name"]
				food_restaurant = tmp[i]["restaurant"]
				order_email = tmp[i]["email"]
				food_price = int(tmp[i]["price"])
				
				#POST to SQL
				orderFood(order_id, food_name, food_restaurant, order_email, food_price)

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
				'result':'Success!',
				'flag':bool(1)
			})

def orderFood(order_id, food_name, food_restaurant, order_email, food_price):
	order_status = 'preparing'

	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_search = '''SELECT * FROM member WHERE member_email = %s '''
	data = (order_email)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	member_name = result[0][1]
	member_location = result[0][2]
	member_phone = result[0][4]

	sql_search = '''SELECT * FROM restaurant WHERE restaurant_name = %s '''
	data = (food_restaurant)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	restaurant_location = result[0][2]

	food_location = restaurant_location + ': ' + food_restaurant

	sql_insert = '''INSERT INTO food_order (order_id, order_pname, order_email, order_fname, food_location, food_destination, order_phone, order_price, order_status,food_deliver, order_restaurant) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);'''
	data = (order_id, member_name, order_email, food_name, food_location, member_location, member_phone, food_price, order_status, pymysql.NULL, food_restaurant)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()

class Get_Deliver_Food:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "Get_Deliver_Food"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Get delivering food ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			email = tmp["email"]
			print(email)
			#POST to SQL
			data = getDeliverFood(email)

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
				'code':200,
				'result':'Success!',
				'flag':bool(1),
				'Data':data
			})

def getDeliverFood(email):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []

	sql_search = '''SELECT * FROM food_order WHERE food_deliver = %s AND order_status =%s '''
	data = (email, 'delivering')
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result

class Get_Customer_Food:
	def __init__(self):
		self.fun_Name = "Get_Customer_Food"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Get customer food ...",'green'))		

			tmp = json.loads(tmp.decode('utf-8'))

			email = tmp["email"]
			print(email)
			#POST to SQL
			data = getCustomerFood(email)

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
				'code':200,
				'result':'Success!',
				'flag':bool(1),
				'Data':data
			})

def getCustomerFood(email):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []

	sql_search = '''SELECT * FROM food_order WHERE order_email =%s '''
	data = (email)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result


# !/usr/bin/python
# coding:utf-8

import pymysql
import datetime
import time
import json
import base64
#requests
import requests
from requests.auth import HTTPBasicAuth
#from bs4 import BeautifulSoup
#color
from termcolor import colored

class Get_Order_Food_by_Restaurant:
	def __init__(self):
		self.fun_Name = "Get_Order_Food_by_Restaurant"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Get Order Food by Restaurant ...",'blue'))	

			tmp = json.loads(tmp.decode('utf-8'))
			restaurant = str(tmp["restaurant"])
			print(restaurant)
			data = getGetOrderFoodbyRestaurant(restaurant)

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
			}, ensure_ascii=False)

def getGetOrderFoodbyRestaurant(restaurant):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []
	sql_search = '''SELECT * FROM food_order WHERE order_restaurant = %s'''
	data = (restaurant)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result

class Get_Food_Menu:
	def __init__(self):
		self.fun_Name = "Get_Food_Menu"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Get food menu ...",'blue'))	

			tmp = json.loads(tmp.decode('utf-8'))
			restaurant = str(tmp["restaurant"])
			print(restaurant)
			data = getFoodMenu(restaurant)

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
			}, ensure_ascii=False)

def getFoodMenu(restaurant):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []
	sql_search = '''SELECT * FROM food_menu WHERE food_restaurant = %s'''
	data = (restaurant)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result


class Get_Restaurant:
	def __init__(self):
		self.fun_Name = "Get_Restaurant"

	def on_get(self,req,resp):
		try:
			print(colored("Get Restaurant ...",'blue'))

			data = getRestaurant()
			print("===========================================================")
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for'+str(e),
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
				}, ensure_ascii=False)

def getRestaurant():
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []
	sql_search = '''SELECT * FROM restaurant'''
	cursor.execute(sql_search)
	result = cursor.fetchall()
	conn.commit()
	'''
	# BLOB to String
	all_data = []
	data = []
	for i in range(len(result)):
		data.append(result[i][0])
		data.append(result[i][1])
		data.append(result[i][2])
		data.append(result[i][3])
		data.append(result[i][4].decode('UTF-8', errors='ignore'))
		all_data.append(data)
		data = []
	print(all_data)	
	'''
	cursor.close()
	conn.close()
	return result

class Get_Cooking_Food:
	def __init__(self):
		self.fun_Name = "Get_Cooking_Food"

	def on_get(self,req,resp):
		try:
			print(colored("Get cooking food  ...",'blue'))

			data = getOrderFood('waiting for deliver')
			print("===========================================================")
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for'+str(e),
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
				}, ensure_ascii=False)

class Get_Delivering_Food:
	def __init__(self):
		self.fun_Name = "Get_Delivering_Food"

	def on_get(self,req,resp):
		try:
			print(colored("Get delivering food  ...",'blue'))

			data = getOrderFood('delivering')
			print("===========================================================")
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for'+str(e),
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
				}, ensure_ascii=False)

class Get_Ordering_Food:
	def __init__(self):
		self.fun_Name = "Get_Ordering_Food"

	def on_get(self,req,resp):
		try:
			print(colored("Get ordering food  ...",'blue'))

			data = getOrderFood('ordering')
			print("===========================================================")
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for'+str(e),
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
				}, ensure_ascii=False)

class Get_Preparing_Food:
	def __init__(self):
		self.fun_Name = "Get_Preparing_Food"

	def on_get(self,req,resp):
		try:
			print(colored("Get preparing food  ...",'blue'))

			data = getOrderFood('preparing')
			print("===========================================================")
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for'+str(e),
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
				}, ensure_ascii=False)

def getOrderFood(status):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []
	sql_search = '''SELECT * FROM food_order WHERE order_status = %s'''
	data = (status)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result

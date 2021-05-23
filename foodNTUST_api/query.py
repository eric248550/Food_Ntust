# !/usr/bin/python
# coding:utf-8

import pymysql
import datetime
import time
import json

#requests
import requests
from requests.auth import HTTPBasicAuth
#from bs4 import BeautifulSoup
#color
from termcolor import colored

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
	for document in cursor:
		result.append(document)
	
	cursor.close()
	conn.close()
	return result

class Get_Cooking_Food:
	def __init__(self):
		self.fun_Name = "Get_Cooking_Food"

	def on_get(self,req,resp):
		try:
			print(colored("Get cooking food  ...",'blue'))

			data = getOrderFood('cooking')
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


from bson import ObjectId
import json

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
# !/usr/bin/python
# coding:utf-8

#到網路 沒功能
import pymysql
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

class Get_Food_Menu:
	def __init__(self):
		self.fun_Name = "Get_Food_Menu"

	def on_get(self,req,resp):
		try:
			print(colored("Get food menu ...",'blue'))

			data = getFoodMenu()
			print("===========================================================")
		except Exception as e:
			resp.body = json.dumps({
				'message':'error for'+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			resp.body = json.dumps({
				'code':200,
				'result':'Success!',
				'flag':bool(1),
				'Data':data
				}, ensure_ascii=False)

def getFoodMenu():
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()
	result = []
	sql_search = '''SELECT * FROM food_menu'''
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

			data = getCookingFood('cooking')
			print("===========================================================")
		except Exception as e:
			resp.body = json.dumps({
				'message':'error for'+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			resp.body = json.dumps({
				'code':200,
				'result':'Success!',
				'flag':bool(1),
				'Data':data
				}, ensure_ascii=False)

def getCookingFood(status):
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
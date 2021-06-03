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
# jwt token
import jwt

class DeleteFoodMenu:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "DeleteFoodMenu"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Delete Food Menu ...",'green'))

			tmp = json.loads(tmp.decode('utf-8'))

			type = tmp["type"]
			food_name = tmp["name"]

			#POST to SQL
			deleteFoodMenu(type, food_name)

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

def deleteFoodMenu(type, food_name):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	if type == 'delete':
		# delete food
		sql_search = '''DELETE FROM food_menu WHERE food_name = %s'''
		data = (food_name)
		cursor.execute(sql_search, data)
		conn.commit()
	
	cursor.close()
	conn.close()

class AlterFoodMenu:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "AlterFoodMenu"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Alter Food Menu ...",'green'))

			tmp = json.loads(tmp.decode('utf-8'))

			type = tmp["type"]
			restaurant = tmp["restaurant"]
			food_name = tmp["name"]
			price = tmp["price"]
			img = tmp["img"]
			description = tmp["description"]

			#POST to SQL
			alterFoodMenu(type, restaurant, food_name, price, img, description)

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

def alterFoodMenu(type, restaurant, food_name, price, img, description):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	if type == 'add':
		sql_insert = '''INSERT INTO food_menu (food_name, food_restaurant, food_price, food_img, food_description) VALUES (%s, %s, %s, %s, %s);'''
		data = (food_name, restaurant, price, img, description)
		cursor.execute(sql_insert, data)
		conn.commit()
	elif type == 'update':
		# update food
		sql_search = '''UPDATE food_menu SET food_price = %s, food_img = %s, food_description = %s  WHERE food_name = %s AND food_restaurant = %s'''
		data = (price, img, description, food_name, restaurant)
		cursor.execute(sql_search, data)
		conn.commit()
	elif type == 'delete':
		# update food
		sql_search = '''DELETE FROM food_menu WHERE food_name = %s AND food_restaurant = %s'''
		data = (price, img, description, food_name, restaurant)
		cursor.execute(sql_search, data)
		conn.commit()
	
	cursor.close()
	conn.close()

class Login:
	def __init__(self):
		self.fun_Name = "Login"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Login ...",'green'))

			tmp = json.loads(tmp.decode('utf-8'))
			email = tmp["email"]
			password = tmp["password"]

			#POST to SQL
			result = login(email, password)

			print("\n===========================================================")
			
		except Exception as e:
			resp.text = json.dumps({
				'message':'error for '+str(e),
				'flag':bool(0)
			})
			print("Exception = " + str(e))
			print("===========================================================")
		else:
			if result == bool(0):
				resp.text = json.dumps({
				'message':'Password Incorrect',
				'flag':bool(0)
				})
				print("Password Incorrect: " + email)
				print("===========================================================")
			else:
				token = jwt.encode({"name":result[0][1],"email": result[0][3], "type": result[0][6]}, "DatabaseDesign-secret-key", algorithm="HS256")
				resp.text = json.dumps({

					'token':token,
					'result':'Login Success!',
					'flag':bool(1)
				})
				print("Login Success: " + email)
				print("===========================================================")

def login(email, password):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_search = '''SELECT * FROM member WHERE member_email = %s'''
	data = (email)
	cursor.execute(sql_search, data)
	result = cursor.fetchall()
	conn.commit()
	print(result[0][5])

	cursor.close()
	conn.close()
	if password == result[0][5]:
		return result
	else:
		return bool(0)


class Register:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "Register"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Register ...",'green'))

			tmp = json.loads(tmp.decode('utf-8'))

			
			
			
			type = tmp["type"]
			name = tmp["name"]
			
			location = tmp["location"]
			email = tmp["email"]
			phone = tmp["phone"]
			password = tmp["password"]

			#POST to SQL
			if type == 'restaurant':
				restaurant_type = tmp["restaurant_type"]
				restaurant_img = tmp["restaurant_img"]
				register_restaurant(restaurant_type, restaurant_img, type, name, location, email, phone, password)
			else:
				register_other(type, name, location, email, phone, password)

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

def register_restaurant(restaurant_type, restaurant_img, type, name, location, email, phone, password):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	if type == 'restaurant':
		sql_insert = '''INSERT INTO restaurant (restaurant_name, restaurant_location, restaurant_type, restaurant_img) VALUES (%s, %s, %s, %s);'''
		data = (name, location, restaurant_type, restaurant_img)
		cursor.execute(sql_insert, data)
		conn.commit()

	sql_insert = '''INSERT INTO member (member_type, member_name, member_location, member_email, member_phone, member_password) VALUES (%s, %s, %s, %s, %s, %s);'''
	data = (type, name, location, email, phone, password)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()

def register_other(type, name, location, email, phone, password):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_insert = '''INSERT INTO member (member_type, member_name, member_location, member_email, member_phone, member_password) VALUES (%s, %s, %s, %s, %s, %s);'''
	data = (type, name, location, email, phone, password)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()
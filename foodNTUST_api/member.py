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
			register(type, name, location, email, phone, password)

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

def register(type, name, location, email, phone, password):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_insert = '''INSERT INTO member (member_type, member_name, member_location, member_email, member_phone, member_password) VALUES (%s, %s, %s, %s, %s, %s);'''
	data = (type, name, location, email, phone, password)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()
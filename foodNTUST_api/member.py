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
import pyjwt

class jwtTest:
	def __init__(self):
		self.fun_Name = "jwtTest"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("jwtTest ...",'green'))

			tmp = json.loads(tmp.decode('utf-8'))

			token = tmp["token"]
			if token:
				decode = jwt.decode(encoded_jwt, "secret", algorithms=["HS256"])
				print(decode)

			#POST to SQL


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

# decode jwt


class Register:
	"""docstring"""
	def __init__(self):
		self.fun_Name = "Register"

	def on_post(self,req,resp):
		try:
			tmp = req.stream.read()
			print(colored("Register ...",'green'))
			print(email)
			tmp = json.loads(tmp.decode('utf-8'))

			name = tmp["name"]
			location = tmp["location"]
			email = tmp["email"]
			phone = tmp["phone"]
			password = tmp["password"]

			#POST to SQL
			register(name,location, email, phone, password)

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

def register(name,location, email, phone, password):
	conn = pymysql.connect(host='localhost', user='eric', passwd='phpmyadmin',database='foodNTUST')
	cursor = conn.cursor()

	sql_insert = '''INSERT INTO member (member_name, member_location, member_email, member_phone, member_password) VALUES (%s, %s, %s, %s, %s);'''
	data = (name, location, email, phone, password)
	cursor.execute(sql_insert, data)
	conn.commit()
	
	cursor.close()
	conn.close()
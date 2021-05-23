import falcon

#
#       POST
#
from order import OrderFood

#
#       GET
#
from query import Get_Food_Menu
from query import Get_Cooking_Food
from query import Get_Restaurant



api = falcon.App(cors_enable=True)

# gunicorn -b 0.0.0.0:5000 app:api --timeout 60

### Post
api.add_route('/orderFood', OrderFood() )
api.add_route('/getFoodMenu', Get_Food_Menu() )  ##

# api.add_route('/muti',listen())

### Get
api.add_route('/getCookingFood', Get_Cooking_Food() )  ##
api.add_route('/getRestaurant', Get_Restaurant() )  ##

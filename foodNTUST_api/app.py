import falcon
from falcon_auth import FalconAuthMiddleware, BasicAuthBackend

#
#       POST
#
from query import Get_Food_Menu
from order import OrderFood
from member import Register
from member import Test

#
#       GET
#
from query import Get_Cooking_Food
from query import Get_Restaurant


api = falcon.App(cors_enable=True)

# gunicorn -b 0.0.0.0:5000 app:api --timeout 60

### Post
api.add_route('/orderFood', OrderFood() )
api.add_route('/getFoodMenu', Get_Food_Menu() )  ##
api.add_route('/register', Register() )  ##
api.add_route('/test', Test() )  ##

# api.add_route('/muti',listen())

### Get
api.add_route('/getCookingFood', Get_Cooking_Food() )  ##
api.add_route('/getRestaurant', Get_Restaurant() )  ##

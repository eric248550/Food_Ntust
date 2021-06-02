import falcon
#from falcon_auth import FalconAuthMiddleware, BasicAuthBackend

#
#       POST
#
from query import Get_Food_Menu
from query import Get_Order_Food_by_Restaurant
from order import OrderFood
from member import Register
from member import Login
from order import ToDeliver
from order import Get_Deliver_Food
from order import Get_Customer_Food
from order import OrderFinish
from order import CookFinish
#
#       GET
#
from query import Get_Cooking_Food
from query import Get_Restaurant
from query import Get_Delivering_Food
from query import Get_Ordering_Food
from query import Get_Preparing_Food

api = falcon.App(cors_enable=True)

# gunicorn -b 0.0.0.0:5000 app:api --timeout 60

### Post
api.add_route('/orderFood', OrderFood() )
api.add_route('/getFoodMenu', Get_Food_Menu() )  ##
api.add_route('/getGetOrderFoodbyRestaurant', Get_Order_Food_by_Restaurant() )  ##
api.add_route('/register', Register() )  ##
api.add_route('/login', Login() )  ##
api.add_route('/toDeliver', ToDeliver() )  ##
api.add_route('/getDeliverFood', Get_Deliver_Food() )  ##
api.add_route('/getCustomerFood', Get_Customer_Food() )  ##
api.add_route('/orderFinish', OrderFinish() )  ##
api.add_route('/cookFinish', CookFinish() )  ##

# api.add_route('/muti',listen())

### Get
api.add_route('/getCookingFood', Get_Cooking_Food() )  ##
api.add_route('/getDeliveringFood', Get_Delivering_Food() )  ##
api.add_route('/getRestaurant', Get_Restaurant() )  ##
api.add_route('/getOrderingFood', Get_Ordering_Food() )  ##
api.add_route('/getPreparingFood', Get_Preparing_Food() )  ##

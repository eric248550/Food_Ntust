import falcon

#
#       POST
#
from records import CardRecords

#
#       GET
#
from query import Get_Food_Menu



api = falcon.API()

# gunicorn -b 0.0.0.0:5000 app:api --timeout 60

### Post
api.add_route('/smr/cardreader/CardRecords', CardRecords() )##
# api.add_route('/muti',listen())

### Get
api.add_route('/getFoodMenu', Get_Food_Menu() )  ##

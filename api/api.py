import flask_restful
from flask import Flask

import api.data_api as data_api
import api.file_api as file_api

app = Flask(__name__)
api = flask_restful.Api(app)


class API:
    def __init__(self, data_container_):
        api.add_resource(data_api.Data, '/data',
                         resource_class_kwargs={'data_container': data_container_})
        api.add_resource(data_api.DataCSV, '/data/csv', resource_class_kwargs={'data_container': data_container_})
        app.register_blueprint(file_api.file_blueprint, url_prefix='/file')

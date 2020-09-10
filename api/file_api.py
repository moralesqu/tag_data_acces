from http import HTTPStatus

import flask
from flask_restful import Api, Resource

import data_manipulator.file_manipulation as file_manipulation

file_blueprint = flask.Blueprint('file_api', __name__)
file_api = Api(file_blueprint)


class List(Resource):
    def get(self):
        file_list = file_manipulation.get_file_list()
        return {
            'fileList': file_list
        }


class File(Resource):
    def get(self, name):
        result = file_manipulation.get_file_as_csv(name)
        if result[0]:
            return flask.Response(result[1], mimetype='text/csv')
        else:
            return {
                'status': HTTPStatus.BAD_REQUEST,
                'msg': result[1]
            }

    def delete(self, name):
        result = file_manipulation.remove_file(name)
        return {
            'status': HTTPStatus.OK if result[0] else HTTPStatus.BAD_REQUEST,
            'msg': result[1]
        }


file_api.add_resource(List, '/list')
file_api.add_resource(File, '/<string:name>')

from http import HTTPStatus

import flask
from flask_restful import Resource

import data_manipulator.file_manipulation as file_manipulation


class Data(Resource):
    def __init__(self, **kwargs):
        self.data_container = kwargs['data_container']

    def get(self):
        result = self.data_container.get_tag_data()
        if result is not None:
            ret = []
            for key, value in result.items():
                ret.append({
                    'id': key,
                    'timestamps': value
                })

            return {
                'data': ret
            }
        else:
            return {
                'status': HTTPStatus.BAD_REQUEST,
                'msg': 'Can not get tag data'
            }


class DataCSV(Resource):
    def __init__(self, **kwargs):
        self.data_container = kwargs['data_container']

    def get(self):
        # result = file_manipulation.get_file_as_csv(self.data_container.get_file_name())
        result = file_manipulation.get_file_as_csv('tag1.json')
        if result[0]:
            return flask.Response(result[1], mimetype='text/csv')
        else:
            return {
                'status': HTTPStatus.BAD_REQUEST,
                'msg': result[1]
            }

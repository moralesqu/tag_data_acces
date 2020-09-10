import datetime
import os.path
import json
import logging

import typing

import config


class DataContainer:
    def __init__(self, file_name: str = 'tags_{}.json'.format(datetime.datetime.now())):
        self.file_name: str = file_name
        self.tag_data:  typing.Dict[str, typing.List[int]] = {}
        self.logger = logging.getLogger('tag_data_access')

    def load_data_from_file(self, file_name: str) -> None:
        if not os.path.isfile(config.TAG_DATA_DIRECTORY + file_name):
            self.logger.debug("No file with name: '{}' to load data".format(file_name))
            return
        if os.stat(config.TAG_DATA_DIRECTORY + file_name).st_size == 0:
            self.logger.info("File: '{}' exist, but it is empty".format(file_name))
            return
        data_file = open(config.TAG_DATA_DIRECTORY + file_name)
        self.tag_data = json.load(data_file)
        data_file.close()

    def add_if_new(self, tag_id: str, timestamp: int) -> None:
        if tag_id not in self.tag_data:
            self.tag_data[tag_id] = [timestamp]
            self.logger.debug("Adding new tag id: {}".format(tag_id))
            return
        if max(self.tag_data[tag_id]) + config.TIME_TO_SET_MEASURE_AS_NEW > timestamp:
            self.logger.debug("Measure is not considered new")
            return
        self.tag_data[tag_id].append(timestamp)
        self.logger.debug("New measure for tag: {}".format(tag_id))

    def save_to_file(self) -> None:
        data_file = open(config.TAG_DATA_DIRECTORY + self.file_name, 'w')
        json.dump(self.tag_data, data_file)
        data_file.close()
        self.logger.debug("Data saved to file: {}".format(self.file_name))

    def get_tag_data(self) -> dict:
        return self.tag_data

    def get_file_name(self) -> str:
        return self.file_name



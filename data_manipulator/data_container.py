import os.path
import json
import logging
import config


class DataContainer:
    def __init__(self, file_name: str):
        self.file_name: str = file_name
        self.tag_data: dict[str, list[int]] = {}
        self.logger = logging.getLogger('tag_data_access')

        self.load_data_from_file(file_name)

    def load_data_from_file(self, file_name: str) -> None:
        if not os.path.isfile(config.TAG_DATA_DICTIONARY + file_name):
            self.logger.info("No file with name: '{}' to load data".format(file_name))
            return
        data_file = open(config.TAG_DATA_DICTIONARY + file_name)
        self.tag_data = json.load(data_file)

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

    def print_data(self):
        print(self.tag_data)

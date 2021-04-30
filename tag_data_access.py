import logging
from threading import Thread

from api.api import API, app
from data_manipulator.data_container import DataContainer
from tag_reader_handler.tag_reader import TagReader

data_container = None

if __name__ == '__main__':
    logger = logging.getLogger('tag_data_access')
    logger.setLevel(logging.DEBUG)
    logger_stream = logging.StreamHandler()
    logger.addHandler(logger_stream)
    data_container = DataContainer()
    # data_container.load_data_from_file('tag1.json')
    tag_reader = TagReader(data_container.add_if_new)
    api_app = API(data_container)

    api_thread = Thread(target=app.run, daemon=True)
    api_thread.start()
    tag_reader.start_inventory()

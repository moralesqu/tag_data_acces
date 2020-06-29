import pprint

import config
from data_manipulator.data_container import DataContainer
from data_manipulator import file_manipulation
from tag_reader_handler.tag_reader import TagReader
import logging


def callback(llrp_msg):
    print(llrp_msg)
    tags = llrp_msg.msgdict['RO_ACCESS_REPORT']['TagReportData']

    if len(tags):
        print('saw tag(s): %s', pprint.pformat(tags))
    else:
        print('no tags seen')


if __name__ == '__main__':
    logger = logging.getLogger('tag_data_access')
    logger.setLevel(logging.DEBUG)
    logger_stream = logging.StreamHandler()
    logger.addHandler(logger_stream)
    data_container = DataContainer('tag1.json')
    # test.add_if_new('2a650008', 1584376072147891)
    # test.add_if_new('2a650008', 1584376147777891)
    # test.save_to_file()
    # test.print_data()
    # result = file_manipulation.clear_file('tag1.json')
    # print(result)
    # print(file_manipulation.get_file_list())
    test = TagReader(data_container.add_if_new)
    # test.start_inventory()
    file = open(config.TAG_DATA_DIRECTORY + 'tags1.txt', 'r')
    for record in file:
        test.callback_with_conversion(record)
    data_container.save_to_file()

    print('end')

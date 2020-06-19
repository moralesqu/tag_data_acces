from data_manipulator.data_container import DataContainer
import logging
if __name__ == '__main__':
    logger = logging.getLogger('tag_data_access')
    logger.setLevel(logging.DEBUG)
    logger_stream = logging.StreamHandler()
    logger.addHandler(logger_stream)
    test = DataContainer('tag1.json')
    test.add_if_new('2a650008', 1584376072147891)
    test.add_if_new('2a650008', 1584376147777891)
    test.print_data()
    print('end')

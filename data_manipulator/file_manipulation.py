import csv
import glob
import json
import logging
import os
from io import StringIO

import config

logger = logging.getLogger('tag_data_access')


# def clear_file(file_name: str) -> (bool, str):
#     if not os.path.isfile(get_file_path(file_name)):
#         logger.debug('Can not clear file: {}. File doesnt exist'.format(file_name))
#         return False, 'Can not clear file: {}. File doesnt exist'.format(file_name)
#     open(get_file_path(file_name), "w").close()
#     logger.info('File: {} cleared'.format(file_name))
#     return True, 'File: {} cleared'.format(file_name)


def remove_file(file_name: str) -> (bool, str):
    if not os.path.isfile(get_file_path(file_name)):
        logger.debug('Can not delete file: {}. File doesnt exist'.format(file_name))
        return False, 'Can not delete file: {}. File doesnt exist'.format(file_name)
    os.remove(get_file_path(file_name))
    logger.info('File: {} deleted'.format(file_name))
    return True, 'File: {} deleted'.format(file_name)


def get_file_list() -> list:
    files = glob.glob1(config.TAG_DATA_DIRECTORY, '*.json')
    logger.debug('List of existing files: {}'.format(files))
    return files


def get_file_path(file_name: str) -> str:
    return config.TAG_DATA_DIRECTORY + file_name


def get_file_as_csv(file_name: str) -> (bool, str):
    if not os.path.isfile(get_file_path(file_name)):
        logger.debug('Can not return data from file: {}. File doesnt exist'.format(file_name))
        return False, 'Can not return data from file: {}. File doesnt exist'.format(file_name)
    data_file = open(config.TAG_DATA_DIRECTORY + file_name)
    tag_data = json.load(data_file)
    data_file.close()
    ret_data = StringIO()
    csv_writer = csv.writer(ret_data)
    max_lap = 0
    for values in tag_data.values():
        if len(values) > max_lap:
            max_lap = len(values)

    row = ['id']
    row.extend(['Lap {}'.format(x) for x in range(max_lap)])
    csv_writer.writerow(row)
    for key, value in tag_data.items():
        row = [key]
        row.extend(value)
        csv_writer.writerow(row)

    return True, ret_data.getvalue()

import logging
import config
import os
import glob

logger = logging.getLogger('tag_data_access')


def clear_file(file_name: str) -> (bool, str):
    if not os.path.isfile(config.TAG_DATA_DIRECTORY + file_name):
        logger.debug('Can not clear file: {}. File doesnt exist'.format(file_name))
        return False, 'Can not clear file: {}. File doesnt exist'.format(file_name)
    open(config.TAG_DATA_DIRECTORY + file_name, "w").close()
    logger.info('File: {} cleared'.format(file_name))
    return True, 'File: {} cleared'.format(file_name)


def remove_file(file_name: str) -> (bool, str):
    if not os.path.isfile(config.TAG_DATA_DIRECTORY + file_name):
        logger.debug('Can not delete file: {}. File doesnt exist'.format(file_name))
        return False, 'Can not delete file: {}. File doesnt exist'.format(file_name)
    os.remove(config.TAG_DATA_DIRECTORY + file_name)
    logger.info('File: {} deleted'.format(file_name))
    return True, 'File: {} deleted'.format(file_name)


def get_file_list() -> list:
    files = glob.glob1(config.TAG_DATA_DIRECTORY, '*.json')
    logger.debug('List of existing files: {}'.format(files))
    return files


def get_file_path(file_name: str) -> str:
    return config.TAG_DATA_DIRECTORY + file_name

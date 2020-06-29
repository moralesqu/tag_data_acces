import logging
import typing

from sllurp.llrp import LLRPClientFactory
from twisted.internet import reactor, defer

import config


class TagReader:

    def __init__(self, callback_function: typing.Callable, callback_with_conversion=True):
        self.callback_function = callback_function
        self.logger = logging.getLogger('tag_data_access')
        if not config.TAG_READER_IP:
            self.logger.error('Tag reader ip is missing')
            return
        self.reader_ip: str = config.TAG_READER_IP
        if not config.TAG_READER_PORT:
            self.logger.error('Tag reader port is missing')
            return
        self.reader_port: str = config.TAG_READER_PORT
        if not config.TAG_POPULATION:
            self.logger.error('Tag population parameter is missing')
            return
        self.tag_population = config.TAG_POPULATION
        if not config.TAG_READER_ANTENNAS:
            self.logger.error('Tag antennas parameter is missing')
            return
        self.enabled_antennas = config.TAG_READER_ANTENNAS
        self.reader_factory = None
        self.prepare_reader_factory(
            self.callback_with_conversion if callback_with_conversion else self.callback_function)

    def prepare_reader_factory(self, callback_function: typing.Callable) -> None:
        antennas_map = {
            self.reader_ip: {
                str(ant): 'Antenna {}'.format(ant) for ant in self.enabled_antennas
            }
        }
        d = defer.Deferred()
        d.addCallback(self.stop_inventory)

        factory_args = dict(
            onFinish=d,
            duration=10,
            report_every_n_tags=1,
            antenna_dict=antennas_map,
            tx_power=0,
            tari=0,
            session=2,
            mode_identifier=None,
            tag_population=self.tag_population,
            start_inventory=True,
            disconnect_when_done=False,
            reconnect=True,
            tag_filter_mask=None,
            tag_content_selector={
                'EnableROSpecID': False,
                'EnableSpecIndex': False,
                'EnableInventoryParameterSpecID': False,
                'EnableAntennaID': False,
                'EnableChannelIndex': False,
                'EnablePeakRSSI': False,
                'EnableFirstSeenTimestamp': None,
                'EnableLastSeenTimestamp': True,
                'EnableTagSeenCount': None,
                'EnableAccessSpecID': False
            },
            impinj_extended_configuration=False,
            impinj_search_mode=None,
            impinj_tag_content_selector=None,
        )
        self.reader_factory = LLRPClientFactory(**factory_args)
        self.reader_factory.addTagReportCallback(callback_function)

        reactor.connectTCP(self.reader_ip, self.reader_port, self.reader_factory, timeout=10)
        reactor.addSystemEventTrigger('before', 'shutdown', self.shutdown, self.reader_factory)

    def shutdown(self, factory) -> defer.DeferredList:
        self.logger.debug('Shutting down tag reader factory')
        return factory.politeShutdown()

    def start_inventory(self) -> None:
        self.logger.info('Starting tag reader factory')
        reactor.run()

    def stop_inventory(self) -> None:
        if reactor.running:
            reactor.stop()
        self.logger.info('Stopping tag reader factory')

    def callback_with_conversion(self, llrp_msg) -> None:
        converted_data = self.convert_form_llrp_msg(llrp_msg)
        self.callback_function(converted_data[0], converted_data[1])

    @staticmethod
    def convert_form_llrp_msg(llrp_msg) -> (str, int):
        tag_id = llrp_msg[23:31]
        timestamp = llrp_msg[83:99]
        # tag_id = llrp_msg.msgdict['RO_ACCESS_REPORT']['TagReportData']['EPCData']['EPC']
        # timestamp = llrp_msg.msgdict['RO_ACCESS_REPORT']['TagReportData']['LastSeenTimestampUTC'][0]
        return tag_id, int(timestamp)

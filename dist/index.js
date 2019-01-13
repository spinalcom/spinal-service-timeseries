"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinal_model_timeseries_1 = require("spinal-model-timeseries");
exports.SpinalTimeSeries = spinal_model_timeseries_1.SpinalTimeSeries;
class SpinalServiceTimeseries {
    constructor() {
        this.timeSeriesDictionnary = new Map();
    }
    pushFromEndpoint(endpointNodeId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timeseries = yield this.getOrCreateTimeSeries(endpointNodeId);
                let valueToPush = value;
                if (typeof value === 'boolean') {
                    valueToPush = value ? 1 : 0;
                }
                timeseries.push(valueToPush);
            }
            catch (error) {
                return false;
            }
            return true;
        });
    }
    hasTimeSeries(endpointNodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.timeSeriesDictionnary.has(endpointNodeId)) {
                return true;
            }
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(endpointNodeId, [spinal_model_timeseries_1.SpinalTimeSeries.relationName]);
            if (children.length === 0) {
                return false;
            }
            return true;
        });
    }
    getOrCreateTimeSeries(endpointNodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.timeSeriesDictionnary.has(endpointNodeId)) {
                return this.timeSeriesDictionnary.get(endpointNodeId);
            }
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(endpointNodeId, [spinal_model_timeseries_1.SpinalTimeSeries.relationName]);
            let timeSeriesProm;
            if (children.length === 0) {
                // create element
                const timeSeries = new spinal_model_timeseries_1.SpinalTimeSeries();
                timeSeriesProm = Promise.resolve(timeSeries);
                // create node
                const node = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({ timeSeriesId: timeSeries.id.get() }, timeSeries);
                // push node to parent
                yield spinal_env_viewer_graph_service_1.SpinalGraphService.addChild(endpointNodeId, node, spinal_model_timeseries_1.SpinalTimeSeries.relationName, spinal_env_viewer_graph_service_1.SPINAL_RELATION_PTR_LST_TYPE);
            }
            else {
                timeSeriesProm = children[0].element.load();
            }
            this.timeSeriesDictionnary.set(endpointNodeId, timeSeriesProm);
            return timeSeriesProm;
        });
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @returns {Promise<SpinalDateValue>}
     * @memberof SpinalServiceTimeseries
     */
    getCurrent(timeseries) {
        return timeseries.getCurrent();
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @returns {Promise<AsyncIterableIterator<SpinalDateValue>>}
     * @memberof SpinalServiceTimeseries
     */
    getDataFromLast24Hours(timeseries) {
        return timeseries.getDataFromLast24Hours();
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @param {number} [numberOfHours=1]
     * @returns {Promise<AsyncIterableIterator<SpinalDateValue>>}
     * @memberof SpinalServiceTimeseries
     */
    getDataFromLastHours(timeseries, numberOfHours = 1) {
        return timeseries.getDataFromLastHours(numberOfHours);
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @returns {Promise<AsyncIterableIterator<SpinalDateValue>>}
     * @memberof SpinalServiceTimeseries
     */
    getDataFromYesterday(timeseries) {
        return timeseries.getDataFromYesterday();
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @param {(string|number|Date)} [start=0]
     * @param {(string|number|Date)} [end=Date.now()]
     * @returns {Promise<SpinalDateValue[]>}
     * @memberof SpinalServiceTimeseries
     */
    getFromIntervalTime(timeseries, start = 0, end = Date.now()) {
        return timeseries.getFromIntervalTime(start, end);
    }
    /**
     * @param {SpinalTimeSeries} timeseries
     * @param {(string|number|Date)} [start=0]
     * @param {(string|number|Date)} [end=Date.now()]
     * @returns {Promise<AsyncIterableIterator<SpinalDateValue>>}
     * @memberof SpinalServiceTimeseries
     */
    getFromIntervalTimeGen(timeseries, start = 0, end = Date.now()) {
        return timeseries.getFromIntervalTimeGen(start, end);
    }
}
exports.SpinalServiceTimeseries = SpinalServiceTimeseries;
exports.default = SpinalServiceTimeseries;
//# sourceMappingURL=index.js.map
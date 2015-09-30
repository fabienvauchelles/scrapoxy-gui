(function (global) {
    'use strict';

    global.timeWindowHelper = (global.module || {}).exports = {
        TimeWindow: TimeWindow,
    };


    ////////////

    function TimeWindow(retention, maxTick, avg1, avg2) {
        this._retention = retention;
        this._maxTick = maxTick;
        this._samplingTick = Math.floor(this._retention / this._maxTick / 1000);
        this._avg1 = avg1;
        this._avg2 = avg2;

        this._buffer = void 0;
        this._bufferCount = 0;

        this._items = [];
    }


    TimeWindow.prototype.add = function addFn(item) {
        if (!item) {
            return;
        }

        if (!item.ts) {
            item.ts = new Date().getTime();
        }

        if (!this._buffer) {
            this._buffer = item;
            this._bufferCount = 1;
        }
        else {
            if (this._bufferCount < this._samplingTick) {
                this._buffer.label1 += item.label1;
                this._buffer.label2 += item.label2;

                ++this._bufferCount
            }
            else {
                if (this._avg1) {
                    this._buffer.label1 /= this._bufferCount;
                }

                if (this._avg2) {
                    this._buffer.label2 /= this._bufferCount;
                }

                this._items.push({
                    ts: this._buffer.ts,
                    label1: this._buffer.label1,
                    label2: this._buffer.label2,
                });

                this._buffer = item;
                this._bufferCount = 1;
            }
        }

        this._refresh();
    };


    TimeWindow.prototype.getItems = function getItemsFn() {
        this._refresh();

        return this._items;
    };


    TimeWindow.prototype.clear = function clearFn(retention) {
        this._retention = retention;
        this._samplingTick = Math.floor(this._retention / this._maxTick / 1000);

        this._buffer = void 0;
        this._bufferCount = 0;

        this._items.length = 0;
    };


    TimeWindow.prototype._refresh = function refreshFn() {
        var limit = new Date().getTime() - this._retention;

        this._items = _.filter(this._items, function (item) {
            return item.ts > limit;
        });
    };

})(this);

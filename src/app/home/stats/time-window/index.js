export default class TimeWindow {
    constructor(retention, maxTick, avg1, avg2) {
        this._retention = retention;
        this._maxTick = maxTick;
        this._samplingTick = Math.floor(this._retention / this._maxTick / 1000);
        this._avg1 = avg1;
        this._avg2 = avg2;

        this._buffer = void 0;
        this._bufferCount = 0;

        this._items = [];
    }


    add(item) {
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
        else if (this._bufferCount < this._samplingTick) {
            this._buffer.label1 += item.label1;
            this._buffer.label2 += item.label2;

            ++this._bufferCount;
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

        this._refresh();
    }


    getItems() {
        this._refresh();

        return this._items;
    }


    clear(retention) {
        this._retention = retention;
        this._samplingTick = Math.floor(this._retention / this._maxTick / 1000);

        this._buffer = void 0;
        this._bufferCount = 0;

        this._items.length = 0;
    }


    _refresh() {
        const limit = new Date().getTime() - this._retention;

        this._items = _.filter(this._items, (item) => item.ts > limit);
    }
}



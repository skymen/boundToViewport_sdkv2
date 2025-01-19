import e from "cors";
import { id } from "../../config.caw.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();

      this.mode = 0;
      this._enabled = false;
      if (properties) {
        this.mode = properties[0];
        this.enabled = properties[1];
      }
    }

    get enabled() {
      return this._enabled;
    }

    set enabled(val) {
      if (this._enabled === !!val) return;
      this._enabled = !!val;
      this._setTicking2(this._enabled);
    }

    _trigger(method) {
      super._trigger(self.C3.Plugins[id].Cnds[method]);
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return { m: this.mode, e: this._enabled };
    }

    _loadFromJson(o) {
      this.mode = o["m"];
      this.enabled = o["e"];
    }

    _tick2() {
      const wi = this.instance;
      const layer = wi.layer;
      const viewport = layer.getViewport();
      if (this.mode === 0) {
        wi.x = Math.max(Math.min(wi.x, viewport.right), viewport.left);
        wi.y = Math.max(Math.min(wi.y, viewport.bottom), viewport.top);
      } else {
        const bbox = wi.getBoundingBox();
        let offX = 0;
        let offY = 0;
        if (bbox.left < viewport.left) {
          offX = -(bbox.left - viewport.left);
        }
        if (bbox.top < viewport.top) {
          offY = -(bbox.top - viewport.top);
        }
        if (bbox.right > viewport.right) {
          offX = -(bbox.right - viewport.right);
        }
        if (bbox.bottom > viewport.bottom) {
          offY = -(bbox.bottom - viewport.bottom);
        }
        wi.offsetPosition(offX, offY);
      }
    }
  };
}

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
        this.mode = properties[MODE];
        this.enabled = properties[ENABLED];
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
        wi.x = Math.max(
          Math.min(wi.x, viewport.getRight()),
          viewport.getLeft()
        );
        wi.y = Math.max(
          Math.min(wi.y, viewport.getBottom()),
          viewport.getTop()
        );
      } else {
        const bbox = wi.getBoundingBox();
        let offX = 0;
        let offY = 0;
        if (bbox.getLeft() < viewport.getLeft()) {
          offX = -(bbox.getLeft() - viewport.getLeft());
        }
        if (bbox.getTop() < viewport.getTop()) {
          offY = -(bbox.getTop() - viewport.getTop());
        }
        if (bbox.getRight() > viewport.getRight()) {
          offX = -(bbox.getRight() - viewport.getRight());
        }
        if (bbox.getBottom() > viewport.getBottom()) {
          offY = -(bbox.getBottom() - viewport.getBottom());
        }
        wi.offsetPosition(offX, offY);
      }
    }
  };
}

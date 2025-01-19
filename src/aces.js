import { action, condition, expression } from "../template/aceDefine.js";

const category = "general";

action(
  category,
  "SetEnabled",
  {
    id: "set-enabled",
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set Enabled",
    displayText: "{my}: Set [b]{0}[/b]",
    description: "Enable or disable the behavior",
    params: [
      {
        id: "enabled",
        name: "Enabled",
        desc: "Enabled or disabled",
        type: "combo",
        initialValue: "disabled",
        options: {
          items: [{ enabled: "Enabled" }, { disabled: "Disabled" }],
        },
      },
    ],
  },
  function (enabled) {
    this.enabled = enabled === 0;
  },
  false
);

action(
  category,
  "SetMode",
  {
    id: "set-mode",
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set Mode",
    displayText: "{my}: Set Mode to [b]{0}[/b]",
    description: "Set the mode",
    params: [
      {
        id: "mode",
        name: "Mode",
        desc: "The mode to set",
        type: "combo",
        initialValue: "origin",
        options: {
          items: [{ origin: "Origin" }, { edge: "Edge" }],
        },
      },
    ],
  },
  function (mode) {
    this.mode = mode;
  },
  true
);

condition(
  category,
  "IsEnabled",
  {
    id: "is-enabled",
    highlight: false,
    deprecated: false,
    listName: "Is Enabled",
    displayText: "{my}: Is Enabled",
    description: "Whether the behavior is enabled",
    params: [],
  },
  function () {
    return this.enabled;
  },
  false
);

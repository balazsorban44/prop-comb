import React from "react";

const generate = (Component, children, prop = {}) =>
  new Proxy(function() {}, {
    apply: (...args) => <Component {...prop} {...args[2][0]} />,
    get: (obj, selfPropValue) => {
      const selfPropRow = Object.entries(children).find(([_, propValues]) =>
        propValues.includes(selfPropValue)
      );
      if (!selfPropRow) return obj[selfPropValue];
      const selfPropType = selfPropRow[0];
      const selfProp = { [selfPropType]: selfPropValue, ...prop };
      let selfChildren = { ...children };
      selfChildren[selfPropType] = selfChildren[selfPropType].filter(
        p => p !== selfPropValue
      );
      return generate(Component, children, selfProp);
    }
  });

export default generate;
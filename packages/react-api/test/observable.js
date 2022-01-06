// Copyright 2017-2021 @godechain/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0

const createObservable = require('@godechain/api-rx/observable');

module.exports = function observable (method) {
  const fn = () => Promise.resolve(12345);

  fn.unsubscribe = () => Promise.resolve(true);

  return createObservable(`section_${method}`, method, {
    [method]: fn
  })();
};
/**
* @fileoverview QiitaStockerのDispatcherです。
* @author takayuki-ochiai
*/

import React from 'react';
import { Dispatcher } from 'flux';
import assign from 'object-assign';

var AppDispatcher = assign(new Dispatcher(), {

  /**
  * 命令に合わせたStoreへデータを配送するための
  * EventEmitterです。
  * @prams type イベントの種類。app_constantsの持つ定数が入る。
  * @params action 渡されるデータ。
  */
  handleViewAction(type, action) {
    this.dispatch({
      actionType: type,
      action: action
    });
  }
});


module.exports = AppDispatcher;

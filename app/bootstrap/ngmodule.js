/**
 * 根模块
 */
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

// 子模块
import GLOBAL_MODULE from '../global/global.module';
import MAIN_MODULE from '../main/main.module';

angular.module('ngmodule', [
    uiRouter,
    GLOBAL_MODULE,
    MAIN_MODULE
]);
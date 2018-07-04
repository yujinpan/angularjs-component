/**
 * 主体模块
 */
import angular from 'angular';

import './style.less';

const MAIN_MODULE = angular.module('main', []);

export default MAIN_MODULE.name;

// import components
import {app} from './app.component';
import {btnswitch} from './btnswitch.component';
import {dragsort} from './dragsort.directive';
import {treemenu} from './treemenu.directive';

MAIN_MODULE.component('app', app);
MAIN_MODULE.component('btnswitch', btnswitch);
MAIN_MODULE.directive('dragsort', dragsort);
MAIN_MODULE.directive('treemenu', treemenu);
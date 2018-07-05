/**
 * 主体模块
 */
import angular from 'angular';

import './style.less';

const MAIN_MODULE = angular.module('main', []);

export default MAIN_MODULE.name;

// import components
import { app } from './main.component';
import { btnswitch } from './components/btnswitch/btnswitch.component';
import { dragsort } from './components/dragsort/dragsort.directive';
import { treemenu } from './components/treemenu/treemenu.directive';
import { textcopy } from './components/textcopy/textcopy.directive';

MAIN_MODULE.component('app', app);
MAIN_MODULE.component('btnswitch', btnswitch);
MAIN_MODULE.directive('dragsort', dragsort);
MAIN_MODULE.directive('treemenu', treemenu);
MAIN_MODULE.directive('textcopy', textcopy);
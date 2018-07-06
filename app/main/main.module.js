/**
 * 主体模块
 */
import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';

import './style.less';

const MAIN_MODULE = angular.module('main', [uiBootstrap]);

export default MAIN_MODULE.name;

// import components
import { app } from './main.component';
import { btnswitch } from './components/btnswitch/btnswitch';
import { dragsort } from './components/dragsort/dragsort';
import { treemenu } from './components/treemenu/treemenu';
import { textcopy } from './components/textcopy/textcopy';
import { previewMenu } from './components/preview_menu/preview_menu';

MAIN_MODULE.component('app', app);
MAIN_MODULE.component('btnswitch', btnswitch);
MAIN_MODULE.directive('dragsort', dragsort);
MAIN_MODULE.directive('treemenu', treemenu);
MAIN_MODULE.directive('textcopy', textcopy);
MAIN_MODULE.directive('previewMenu', previewMenu);
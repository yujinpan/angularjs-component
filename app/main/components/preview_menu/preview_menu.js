/**
 * 用于预览的下拉菜单
 */
import './preview_menu.less';

previewMenu.$inject = ['$uibPosition', '$document', '$compile'];
export function previewMenu($position, $document, $compile) {
    return {
        strict: 'A',
        scope: {
            data: '=',
            onselect: '&',
            placement: '@',
        },
        compile: function(tEle, tAttr, transcludeFn) {
            var previewMenuLinker = $compile(
                '<div class="preview-menu-wrap"><div ng-click="remove()" class="preview-menu-background"></div>' +
                '<ul class="preview-menu-list">' +
                '<li ng-repeat="item in data" ng-click="select(item)" ng-bind="item.name"></li>' +
                '</ul></div>'
            );

            return function link(scope, ele, attr) {

                // 销毁事件绑定
                scope.$on('$destroy', function() {
                    remove();
                    unBind();
                });

                // 移除
                scope.remove = remove;

                // 选取
                scope.select = function(item) {
                    scope.onselect({
                        result: item
                    });
                    remove();
                };

                // init
                bind();

                var previewMenuEle = null;
                var previewMenuScope = null;

                // 设置position - 引用了ui-bootstrap的$position服务
                var positionSet = function() {
                    if (!previewMenuEle) return;

                    var ttPosition = $position.positionElements(ele, previewMenuEle, scope.placement || 'bottom', true);
                    ttPosition.top += 'px';
                    ttPosition.left += 'px';

                    previewMenuEle.css(ttPosition);
                };

                function create() {
                    if (!scope.data || !scope.data.length) return;
                    if (previewMenuEle) remove();

                    // 创建子作用域
                    previewMenuScope = scope.$new(false);
                    previewMenuEle = previewMenuLinker(previewMenuScope, function(previewMenuEle) {
                        $document.find('body').append(previewMenuEle);
                    });
                    previewMenuScope.$digest();
                    positionSet();
                }

                function remove() {
                    if (previewMenuEle) {
                        previewMenuEle.remove();
                        previewMenuEle = null;
                    }
                    if (previewMenuScope) {
                        previewMenuScope.$destroy();
                        previewMenuScope = null;
                    }
                }

                function unBind() {
                    ele.unbind('click', create);
                }

                function bind() {
                    ele.bind('click', create);
                }
            };
        }
    };
}
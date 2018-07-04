/**
 * 树形菜单
 * 
 * 策略：
 * 1. 在compile阶段获取字符串模板
 * 2. 在link阶段根据子集渲染子集模板
 * 
 * example: 
 * <treemenu item="item" ng-repeat="item in data">
 *     <h3 ng-bind="item.name">123</h3>
 * </treemenu>
 */
treemenu.$inject = ['$compile'];
export function treemenu($compile) {
    return {
        strict: 'E',
        scope: {
            item: '=',
        },
        compile: (tElement, tAttr, transcludeFn) => {

            // 获取模板内容（未编译的，用于递归子集）
            // 正则将ng-repeat的参数统一为data
            var template = tElement[0].outerHTML.replace(/\s+in\s+[\w\.]+/i, ' in data');

            return function link(scope, element, attr) {

                // 是否有子集，编译子集模板
                if (scope.item.children && scope.item.children.length) {

                    // 这里将ng-repeat='item in data'中的data赋值为item.chilren进行递归
                    scope.data = scope.item.children;

                    // 渲染子集
                    element.append($compile(template)(scope));
                }
            };
        }
    };
}
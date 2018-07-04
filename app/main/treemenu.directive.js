/**
 * 树形菜单
 * 
 * 策略：
 * 1. 在compile阶段获取字符串模板
 * 2. 在link阶段根据子集渲染子集模板
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
            var template = tElement[0].outerHTML;

            return function link(scope, element, attr) {

                // 是否有子集，编译子集模板
                if (scope.item.children && scope.item.children.length) {

                    // 这里将ng-repeat='item in data'中的data赋值为item.chilren进行递归
                    scope.data = scope.item.children;

                    // 渲染子集
                    var templateEle = $compile(template)(scope);
                    element.append(templateEle);
                }
            };
        }
    };
}
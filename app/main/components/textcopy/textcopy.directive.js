/**
 * 用于复制文本
 * 
 * @example
 * 1.引入'/assets/cloud/ui/text_copy/text_copy.js'
 * 2.<div text-copy="{{text}}"></div>
 */
textcopy.$inject = ['$compile'];
export function textcopy($compile) {
    return {
        strict: 'A',
        scope: {
            textcopy: '='
        },
        compile: (tElement, tAttr, transcludeFn) => {
            // 生成Linker
            var templateLinker = $compile('<input style="position:absolute;opacity:0;">');

            // link fn
            return function(scope, ele, attr) {
                var templateEle = templateLinker(scope);
                
                // 绑定事件
                ele.bind('click', copy);
                
                // 指令销毁时移除事件
                scope.$on('$destroy', function() {
                    ele.unbind('click', copy);
                });
                
                function copy(e) {
                    e.stopPropagation();
                    templateEle.val(scope.textcopy);
                    ele.append(templateEle);
                    try {
                        templateEle[0].select();
                        document.execCommand('copy');
                        templateEle.remove();
                    } catch (err) {
                        alert('浏览器不支持，请使用ctrl+c复制。');
                    }
                }
            };
        }
    };
}
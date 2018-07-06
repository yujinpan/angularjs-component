/**
 * 用于多行列表拖动排序。
 */
import './dragsort.less';
import angular from 'angular';

dragsort.$inject = ['$timeout'];
export function dragsort($timeout) {
    return {
        strict: 'E',
        template: `
            <div class="drag-list-wrap">
                <ul>
                    <li ng-repeat="item in data" class="drag-wrap">
                        <div class="drag-list-remove transition3s"></div>
                        {{item.name}}
                    </li>
                </ul>
            </div>
        `,
        scope: {
            data: '=?',
            onchange: '&'
        },
        link: function (scope, ele, attr, ctrl) {
            scope.onchange = scope.onchange || angular.loop;

            scope.$watch('data', () => {
                // 重新计算范围
                getRange();
            }, true);

            /**
             * 配置常数
             * 拖动元素之间的margin值。
             */
            var MARGIN = 10;

            /**
             * 拖动元素本身，拖动元素克隆，拖动开始index，拖动开始行，拖动后的index，
             * 拖动元素的宽，高，拖动状态，拖动的位置信息，拖动范围。
             */
            var targetEle = null;
            var startEle = null;
            var startIndex = 0;
            var lineIndex = 0;
            var changeIndex = 0;
            var startEleWidth = 0;
            var startEleHeight = 0;
            var startState = false;
            var startPosition = {};
            var listEle = $(ele.children()[0]);
            var eleCurrentPosition = null;
            var dragRange = null;

            /**
             * 绑定事件，按下，移动，放开事件。
             * 策略：
             * 1.移动的元素实际上是目标的克隆体，所以不影响原始列表。
             * 2.移动时排序列表采用dom移除与插入操作，所以只需计算开始与结束的index。
             * 3.最后更新scope下的数据，将列表重新渲染。
             */
            ele.on('mousedown', (e) => {
                var target = e.target;
                targetEle = $(target);
                
                // 是否为移除 
                if (targetEle.hasClass('drag-list-remove')) {
                    return removeItem();
                }
                if (!targetEle.hasClass('drag-wrap')) return;

                // 将拖动目标克隆一份至容器的最后面
                startEle = $(target).clone();
                startEle.addClass('drag-active');
                listEle.append(startEle);

                // 初始化内容
                if (!startEleWidth) {
                    startEleWidth = startEle.width();
                    startEleHeight = startEle.height();
                    getRange();
                }

                // 添加目标拖动状态
                targetEle.addClass('drag-holder');

                // 添加目标的相对容器的定位
                eleCurrentPosition = {
                    left: target.offsetLeft,
                    top: target.offsetTop
                };

                // 添加拖动开始状态
                startState = true;

                // 保存拖动开始的index，行的index
                startIndex = changeIndex = targetEle.index();
                lineIndex = Math.floor(startIndex / dragRange.lineCount);

                // 保存开始移动的定位
                startPosition = {
                    pageX: e.pageX,
                    pageY: e.pageY
                };

                // 渲染移动
                moveHandle(e);

                console.log('按下');
            });
            ele.on('mousemove', (e) => {
                if (!startState) return;

                // 计算移动后的index
                changeIndex = getChangeIndex();

                // 渲染列表
                renderList();

                // 开始移动
                moveHandle(e);
            });
            ele.on('mouseup mouseleave', (e) => {
                if (!startState) return;

                // 结束拖动状态
                startState = false;

                // 结束拖动，清除引用
                targetEle.removeClass('drag-holder');
                startEle.remove();
                targetEle = null;
                startEle = null;

                // 更新scope
                updateScope();

                console.log('放开');
            });

            /**
             * 渲染移动效果
             */
            function moveHandle(e) {
                startPosition.moveX = e.pageX - startPosition.pageX;
                startPosition.moveY = e.pageY - startPosition.pageY;
                startEle.css({
                    top: startPosition.moveY + eleCurrentPosition.top + 'px',
                    left: startPosition.moveX + eleCurrentPosition.left + 'px'
                });
            }

            /**
             * 计算移动后的index
             * 包括上下移动与左右移动的结果。
             */
            function getChangeIndex() {
                // 计算index值
                var lanIndex = Math.round(startPosition.moveX / (startEleWidth + MARGIN));
                var rowIndex = lineIndex + Math.round(startPosition.moveY / (startEleHeight + MARGIN));
                var indentIndex = startIndex % dragRange.lineCount;

                // 向左移动超出范围
                if (lanIndex < -indentIndex) {
                    lanIndex = -indentIndex;
                }
                // 向右移动超出范围
                else if (lanIndex > (dragRange.lineCount - indentIndex)) {
                    lanIndex = dragRange.lineCount - indentIndex;
                }
                // 向上移动超出范围
                if (rowIndex < 0) {
                    rowIndex = indentIndex;
                }
                // 向下移动超出范围
                else if (rowIndex > dragRange.lineTotal - 1) {
                    rowIndex =
                        indentIndex +
                        (dragRange.lineTotal - 1) * dragRange.lineCount;
                }
                // 没有超出范围
                else {
                    rowIndex =
                        indentIndex +
                        rowIndex * dragRange.lineCount;
                }
                return Math.min(rowIndex + lanIndex, scope.data.length - 1);
            }

            /**
             * 渲染列表
             * insertBefore在最后一个时需要处理为insertAfter。
             */
            function renderList() {
                var length = scope.data.length;
                // 只有一个时
                if(length === 1) return;
                // 移除插入
                if (changeIndex === length - 1) {
                    targetEle = targetEle.remove().insertAfter(listEle.find('ul>li').eq(changeIndex - 1));
                } else {
                    targetEle = targetEle.remove().insertBefore(listEle.find('ul>li').eq(changeIndex));
                }
            }

            /**
             * 列表项移除
             */
            function removeItem() {
                var index = targetEle.closest('li').index();
                scope.$apply(function () {
                    scope.data.splice(index, 1);
                    scope.onchange({ result: scope.data });
                });
            }

            /**
             * 更新scope
             */
            function updateScope() {
                if (startIndex === changeIndex) return;
                $timeout(function () {
                    var item = scope.data[startIndex];
                    scope.data.splice(startIndex, 1);
                    scope.data.splice(changeIndex, 0, item);
                    scope.onchange({ result: scope.data });
                }, 0);
            }

            /**
             * 计算拖动范围，判断拖动范围（拖动范围目前不限制）
             * （统计拖动列表的行数与列数。）
             */
            function getRange() {
                if (!startEleWidth) return;
                var offset = listEle.offset();
                dragRange = {
                    lineTotal: Math.floor(listEle.height() / (startEleHeight + MARGIN)),
                    lineCount: Math.floor(listEle.width() / (startEleWidth + MARGIN)),
                    leftMin: offset.left - startEleWidth,
                    leftMax: offset.left + listEle.width() - MARGIN,
                    topMin: offset.top - startEleHeight,
                    topMax: offset.top + listEle.height() - MARGIN
                };
            }
            /*
            function checkRange() {
                var offset = startEle.offset();
                if (
                    offset.left >= dragRange.leftMin &&
                    offset.left <= dragRange.leftMax &&
                    offset.top >= dragRange.topMin &&
                    offset.top <= dragRange.topMax
                ) {
                    return true;
                }
            }
            */
        }
    };
}
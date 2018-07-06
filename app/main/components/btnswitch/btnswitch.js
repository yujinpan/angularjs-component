import './btnswitch.less';

class BtnSwitchController {
    constructor() {
        // 先初始化change事件，后面就不用判断了
        this.btnchange = this.btnchange || angular.noop;
        // 防止在初始化的时候有一段动画效果
        this.action = true;
    }
    change() {
        this.action = null;
        this.change = () => {
            this.btnstate = !this.btnstate;
            this.btnchange(this.btnstate);
        };
        this.change();
    }
}

export const btnswitch = {
    bindings: {
        // 使用：如果是即时的请求，判断请求是否成功，请求失败就把按钮的状态切换回来;
        btnstate: '=?',
        // 说明：change为按钮切换状态，参数直接返回按钮的状态(1:'0');
        btnchange: '=?'
    },
    controller: BtnSwitchController,
    template: `
        <div id="btnswitch" ng-class="{'open':$ctrl.btnstate,'action':!$ctrl.action}" ng-click="$ctrl.change()">
            <div class="btnswitch-ball">
                <span></span>
            </div>
            <div class="btnswitch-draw-wrap"></div>
        </div>
    `
};
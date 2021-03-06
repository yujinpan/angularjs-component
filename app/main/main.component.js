class AppController {
    constructor($scope) {
        // title
        this.appName = 'Conponents List';

        /**
         * iosswitch example
         */
        this.btnstate = this.get();
        // 点击事件，用箭头函数绑定this
        this.btnchange = (state) => {
            this.save(state);
        };

        /**
         * dragsort example
         */
        this.sortList = [{
                name: 0
            },
            {
                name: 1
            },
            {
                name: 2
            },
            {
                name: 3
            },
            {
                name: 4
            },
            {
                name: 5
            },
            {
                name: 6
            },
            {
                name: 7
            }
        ];
        this.sortNumber = (result = this.sortList) => {
            this.sortNumberStr = result.reduce((pre, cur, index) => {
                return (typeof pre === 'object' ? pre.name : pre) + '-' + cur.name;
            });
        };
        this.sortNumber(this.sortList);

        /**
         * treemenu example
         */
        this.treemenuData = [{
            name: 'home',
            children: [{
                    name: 'home-child1'
                },
                {
                    name: 'home-child2',
                    children: [{
                        name: 'child2-child2'
                    }, {
                        name: 'child2-child2'
                    }]
                },
            ],
        }, {
            name: 'home2',
        }, {
            name: 'home3'
        }];
        this.treemenuChange = (item) => {
            alert(item.name);
        };

        /**
         * preview_menu
         */
        this.previewMenu = {
            data: [
                { id: 1, name: 'home' },
                { id: 2, name: 'home2' },
                { id: 3, name: 'home3' },
            ],
            select: function(result) {
                alert(result.name);
            }
        };
    }

    save(val) {
        localStorage.setItem('btnstate', JSON.stringify(val));
    }
    get() {
        return JSON.parse(localStorage.getItem('btnstate'));
    }
}

export const app = {
    controller: AppController,
    controllerAs: 'app',
    template: `
        <h1>{{app.appName}}</h1>
        
        <h4>1. ios switch
            <span>(state: {{app.btnstate}})<span>.
        </h4>
        <btnswitch btnchange="app.btnchange" btnstate="app.btnstate"></btnswitch>

        <h4>2. dragsort
            <span>(sort: {{app.sortNumberStr}})</span>.
        </h4>
        <div class="drag-list-example">
            <dragsort data="app.sortList" onchange="app.sortNumber(result)"></dragsort>
        </div>
        <button class="btn btn-default" ng-click="app.sortList.push({name: 'new'});app.sortNumber();">add</button>

        <h4>3. treemenu</h4>
        <div class="treemenu-example">
            <treemenu class="treemenu-content" item="item" ng-repeat="item in app.treemenuData">
                <h4 ng-click="app.treemenuChange(item)" ng-bind="item.name"></h4>
            </treemenu>
        </div>

        <h4>4. textcopy</h4>
        <input ng-model="textcopy">
        <button textcopy="textcopy">复制</button>

        <h4>5. previewMenu</h4>
        <button preview-menu placement="top" data="app.previewMenu.data" onselect="app.previewMenu.select(result)">点击查看</button>
    `
};
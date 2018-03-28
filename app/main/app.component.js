class AppController {
    constructor() {
        this.appName = 'Conponents List';
        this.btnstate = this.get();

        // 点击事件，用箭头函数绑定this
        this.btnchange = (state) => {
            this.save(state);
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
        <h4>1. ios switch(state: {{app.btnstate}}).</h4>
        <btnswitch btnchange="app.btnchange" btnstate="app.btnstate"></btnswitch>
    `
};
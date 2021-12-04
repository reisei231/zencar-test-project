import { makeObservable, observable, action } from "mobx";

class Store {
    @observable stage = 1;
    @observable subcategoryId = 1;
    @observable subcategoryType = 'wizardWorks';
    @observable item = 0;
    constructor() {
        makeObservable(this);
    }

    @action
    nextStage = () => {
        this.stage++;
    }

    @action
    prevStage = () => {
        this.stage--;
    }

    @action
    setStage = (id) => {
        this.stage = id;
    }

    @action
    setSubcategory = (id, type) => {
        if(id == -1) {
            this.stage = 1;
            this.subcategoryType = type;
        } else {
            this.subcategoryId = id;
            this.subcategoryType = type;
            this.stage = 2;
        }
        
    }
}

const store = new Store();

export default store;
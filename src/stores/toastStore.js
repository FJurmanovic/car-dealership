import {observable} from "mobx";


class ToastStore {
    @observable toasts = [];

    push = (toast, color) => {
        const clr = color || "#000000";
        this.toasts.push({"text": toast, "color": clr})
        const interval = setInterval(() => {
            if(this.toasts.length) {
                this.toasts.splice(this.toasts.length - 1, 1);
            }
            clearInterval(interval);
        }, 3000);
    }

}

export default new ToastStore();
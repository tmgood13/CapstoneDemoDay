export class Menu {
    
    display: string;
    link: string;
    tip: string;

    constructor(display: string, link: string, tip: string = "") {
        this.display = display;
        this.link = link;
        this.tip = tip;
    }
}
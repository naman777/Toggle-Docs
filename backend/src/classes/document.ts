export class Document {
    private content : string;
    private title : string;

    constructor () {
        this.content = '';
        this.title = '';
    }

    addTitle(title: string){
        this.title = title;
    }

    setContent(content: string){
        this.content = content;
        return content;
    }
    
}
export class Document {
    private content : string;
    public documentTitle : string;

    constructor (documentTitle:string) {
        this.content = '';
        this.documentTitle = documentTitle;
        this.addTitle(documentTitle);

        console.log(documentTitle);
    }

    addTitle(documentTitle: string){
        this.documentTitle = documentTitle;
        return documentTitle;
    }

    setContent(content: string){
        this.content = content;
        return content;
    }
    
}
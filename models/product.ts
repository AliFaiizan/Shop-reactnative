class Product{
    
    id:string;
    ownerid:string;
    title:string;
    imageUrl:string;
    description:string;
    price:number

    constructor(
        id:string,ownerid:string,title:string,
        imageUrl:string,description:string,price:number){
            this.id = id;
            this.ownerid=ownerid;
            this.title=title;
            this.imageUrl=imageUrl;
            this.description=description;
            this.price=price;
        }


    
}
export default Product;

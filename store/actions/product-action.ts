
export const DELETE_PRODUCT='DELETE_PRODUCT';

export const deleteProduct=(prodId:string) => { 
    return {type:DELETE_PRODUCT,prodId}
 }
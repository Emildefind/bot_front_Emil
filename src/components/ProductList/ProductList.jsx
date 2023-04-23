 
import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
   {id: '1', title: 'Пепперони', price: 900, description: '40 см', img: 'https://static.pizzasushiwok.ru/images/menu_new/6-1300.jpg'},
   {id: '2', title: '4 сыра', price: 700, description: '40см', img: 'https://roosters-pizza.ru/wa-data/public/shop/products/17/00/17/images/946/946.970@2x.jpg'},
   {id: '3', title: 'Солянка', price: 800, description: '40см', img: 'https://eva-krim.ru/wp-content/uploads/2022/10/piczcza-solyanka.jpg'},
   {id: '4', title: 'Барбекю', price: 1000, description: '45см', img: 'https://shaurmaotdushi.ru/wp-content/uploads/2022/02/%D0%91%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D1%8E.png'},
   {id: '5', title: 'Маргарита', price: 800, description: '40см', img: 'https://storage.yandexcloud.net/ecb/1601565141583_392x320.jpeg'},
   {id: '6', title: 'Маленькая сырная', price: 500, description: '30см', img: 'https://cdn-irec.r-99.com/sites/default/files/imagecache/300o/product-images/238168/qbwB861hSpkBNnu5EDLMwA.jpg'},
   {id: '7', title: 'С ананасами', price: 300, description: '30см', img: 'https://xn--24-mlcaas9bch7e.xn--p1ai/wa-data/public/shop/products/79/00/79/images/72/72.970.jpg'},
   {id: '8', title: 'Пепперони', price: 5000, description: '100см', img: 'https://menu2go.ru/images/food/116/116_20210505113006_4605.jpg'}
]


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};
 
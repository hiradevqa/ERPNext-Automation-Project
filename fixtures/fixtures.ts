import{test as base} from '@playwright/test';
import{Login} from '../pages/login';
import{Customer} from '../pages/customer';
import{Item} from '../pages/items'
import {Page} from '@playwright/test';
export{expect} from '@playwright/test';
import{Stock} from '../pages/stock';

type MyFixtures={
    loginPage:Login;
    customerPage:Customer;
    itemPage:Item;
    stockPage:Stock;
};
export const test = base.extend<MyFixtures>({
    loginPage:async({page},use)=>{
        const loginPage=new Login(page);
        await use(loginPage);
    },
customerPage:async({page},use)=>{
        const customerPage=new Customer(page);
        await use(customerPage);
    },
itemPage:async({page},use)=>{
        const itemPage=new Item(page);
        await use(itemPage);
    },
stockPage:async({page},use)=>{
        const stockPage=new Stock(page);
        await use(stockPage);
    }

});
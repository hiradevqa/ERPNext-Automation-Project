import{test as base} from '@playwright/test';
import{Login} from '../pages/login';
import{Customer} from '../pages/customer';
import{Item} from '../pages/items'
import {Page} from '@playwright/test';
export{expect} from '@playwright/test';
import{Stock} from '../pages/stock';
import{Sales} from '../pages/sales';
import{DeliveryNote} from '../pages/deliverynote';
import { SalesInvoice } from '../pages/salesInvoice';
import{Payment} from '../pages/payment.ts';

type MyFixtures={
    loginPage:Login;
    customerPage:Customer;
    itemPage:Item;
    stockPage:Stock;
    salesPage:Sales;
    deliveryNotePage: DeliveryNote;
    salesInvoicePage:SalesInvoice;
    paymentPage:Payment;
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
    },
salesPage:async({page},use)=>{
        const salesPage=new Sales(page);
        await use(salesPage);   
    },
deliveryNotePage:async({page},use)=>{
        const deliveryNotePage=new DeliveryNote(page);
        await use(deliveryNotePage);   
    },
salesInvoicePage:async({page},use)=>{
        const salesInvoicePage=new SalesInvoice(page);
        await use(salesInvoicePage);   
    },
paymentPage:async({page},use)=>{
        const paymentPage=new Payment(page);
        await use(paymentPage);   
    }

});
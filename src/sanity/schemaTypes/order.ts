import { title } from "process";


export default {
    name: 'order',
    type:'document',
    title:'Order',
    fields:[
        {
            name:'firstName',
            type:'string',
            title:'FirstName'
        },
        {
            name:'lastName',
            type:'string',
            title:'LastName'   
        },
        {
            name:'address',
            type:'string',
            title:'Address'
        },
        {
            name:'city',
            type:'string',
            title:'City'
        },
        {
            name:'zipCode',
            type:'string',
            title:'ZipCode'
        },
        {
            name:'phoneNumber',
            type:'string',
            title:'PhoneNumber'
        },
        {
            name:'email',
            type:'string',
            title:'Email'
        },
        {
            name:'cartItems',
            type:'array',
            title:'CartItems',
            of:[{
                type:'reference',
                to:{
                    type:'product'
                }
            }]
        },
        {
            name:'total',
            type:'number',
            title:'Total'
        },
        {
            name:'status',
            type:'string',
            title:'OrderStatus',
            options:{
                list:[
                    {title:'Pending', value:'pending'},
                    {title:'Success', value:'success'},
                    {title:'Dispatch', value:'dispatch'}
                ],
                layout:'radio'
            },
            initialValue:'pending'
        },
    ]
}
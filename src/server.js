import { Server, Response } from 'miragejs'
import clients from './data/clients'
import contactsForA from './data/contactsForA'
import contactsForB from './data/contactsForB'
import deliveryType from './data/delivery-type'
import products from './data/products'
import sellers from './data/sellers'

export function makeServer({ environment = 'development' } = {}) {

  let server = new Server({
    environment,

    routes() {

      this.namespace = 'api';

      this.get('/client', schema => {
        return new Response(200, {}, clients);
      })
      this.get('/client/:clientId/contact', (schema, request) => {
        if (request.params.clientId == 1) {
          return new Response(200, {}, contactsForA);
        } else {
          return new Response(200, {}, contactsForB);
        }
      })
      this.get('/delivery-type', schema => {
        return new Response(200, {}, deliveryType);
      })
      this.get('/product', schema => {
        return new Response(200, {}, products);
      })
      this.get('/seller', schema => {
        return new Response(200, {}, sellers);
      })
      this.post('/order', (schema, request) => {
        const orderId = Math.floor(Math.random() * 10) + 1;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': orderId });
      })
      this.put('/order/:orderId', (schema, request) => {
        const orderId = request.params.orderId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': orderId });
      })
      this.put('/order/:orderId/finalize', (schema, request) => {
        const orderId = request.params.orderId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': orderId });
      })
      this.put('/order/:orderId/seller', (schema, request) => {
        const orderId = request.params.orderId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': orderId });
      })
      this.post('/order/:orderId/item', (schema, request) => {
        const orderId = request.params.orderId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': orderId });
      })
      this.put('/order/:orderId/item/:itemId', (schema, request) => {
        const orderId = request.params.orderId;
        const itemId = request.params.itemId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': itemId });
      })
      this.delete('/order/:orderId/item/:itemId', (schema, request) => {
        const orderId = request.params.orderId;
        const itemId = request.params.itemId;
        const args = JSON.parse(request.requestBody);
        return new Response(200, {}, { 'success' : true, 'id': itemId });
      })
    },
  })

  return server;
}
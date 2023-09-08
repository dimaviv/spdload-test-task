import * as request from "supertest";
import {CreateProductDto} from "../dist/products/dto/create-product.dto";
import {HttpStatus} from "@nestjs/common";
import generateRandomString from "../src/helpers/generateRandomString";


describe('ProductsController (e2e)', () => {
    const productsUrl = `http://localhost:5000/products`

    const mockProduct: CreateProductDto = {
        name: generateRandomString(12),
        typeId: 3,
        priceRetail: 35,
        priceTrade: 24,
        quantity: 90,
        price: 20,
    }
    const mockPatchedProduct: CreateProductDto = {
        name: mockProduct.name + '(PATCHED)',
        typeId: 4,
        priceRetail: 55,
        priceTrade: 45,
        quantity: 120,
        price: 30
    }
    let ID;

    it('/products (POST)', () => {
        return request(productsUrl)
            .post('')
            .send(mockProduct)
            .expect((response: request.Response) => {
                const {
                    id, name, typeId, priceRetail,
                    priceTrade, quantity, price
                } = response.body;
                expect(typeof id).toBe('number'),
                expect(name).toEqual(mockProduct.name),
                expect(typeId).toEqual(mockProduct.typeId),
                expect(priceRetail).toEqual(mockProduct.priceRetail.toString()),
                expect(priceTrade).toEqual(mockProduct.priceTrade.toString()),
                expect(quantity).toEqual(mockProduct.quantity),
                expect(price).toEqual(mockProduct.price.toString())
                ID = id;
            })
            .expect(HttpStatus.CREATED)
    });

    it('/products (GET)', () => {
        return request(productsUrl)
            .get('?limit=5&page=1')
            .expect(HttpStatus.OK)
    });

    it('/products/{id} (GET)', () => {
        return request(productsUrl)
            .get(`/${ID}`)
            .expect((response: request.Response) => {
                const {
                    id, name, typeId, priceRetail,
                    priceTrade, quantity, price, available
                } = response.body;
                expect(id).toEqual(ID),
                expect(name).toEqual(mockProduct.name),
                expect(typeId).toEqual(mockProduct.typeId),
                expect(priceRetail).toEqual(mockProduct.priceRetail.toString()),
                expect(priceTrade).toEqual(mockProduct.priceTrade.toString()),
                expect(quantity).toEqual(mockProduct.quantity),
                expect(price).toEqual(mockProduct.price.toString())
                expect(available).toEqual(true)
            })
            .expect(HttpStatus.OK)
    });

    it('/products/{id} (PATCH)', () => {
        return request(productsUrl)
            .patch(`/${ID}`)
            .send(mockPatchedProduct)
            .expect((response: request.Response) => {
                const {
                    id, name, typeId, priceRetail,
                    priceTrade, quantity, price, available
                } = response.body;
                expect(id).toEqual(ID),
                expect(name).toEqual(mockPatchedProduct.name),
                expect(typeId).toEqual(mockPatchedProduct.typeId),
                expect(priceRetail).toEqual(mockPatchedProduct.priceRetail),
                expect(priceTrade).toEqual(mockPatchedProduct.priceTrade),
                expect(quantity).toEqual(mockPatchedProduct.quantity),
                expect(price).toEqual(mockPatchedProduct.price)
                expect(available).toEqual(true)
            })
            .expect(HttpStatus.OK)
    });

    it('/products/{id} (DELETE)', () => {
        return request(productsUrl)
            .delete(`/${ID}`)
            .expect(HttpStatus.OK)
    });
})
import { ProductModel } from "../models/product";
import { Product } from "../models/interface";
import e from "express";

describe("ProductModel", () => {
  const productModel = new ProductModel();
  let testProduct: Product;

  beforeAll(async () => {
    testProduct = {
      id: 5,
      name: "Test Product",
      price: 100.0,
      description: "This is a test product",
    };
    await productModel.create(testProduct);
  });

  it("should have an index method", () => {
    expect(productModel.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(productModel.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(productModel.create).toBeDefined();
  });

  it("should have an update method", () => {
    expect(productModel.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(productModel.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const newProduct: Product = {
      id: 1,
      name: "New Product",
      price: 200.0,
      description: "This is a new product",
    };
    const result = await productModel.create(newProduct);
    expect(result.name).toEqual(newProduct.name);
    expect(Number(result.price)).toEqual(newProduct.price);
  });

  it("index method should return a list of products", async () => {
    const result = await productModel.index();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it("show method should return the correct product", async () => {
    const result = await productModel.show(6);
    expect(result.id).toEqual(6);
  });

  it("update method should modify the product", async () => {
    const updatedProduct: Product = {
      id: 3,
      name: "Updated Product",
      price: 170.0,
      description: "This is an updated product",
    };
    const result = await productModel.update(testProduct.id, updatedProduct);
    expect(result.name).toEqual(updatedProduct.name);
    expect(Number(result.price)).toEqual(updatedProduct.price);
  });

  it("delete method should remove the product", async () => {
    const result = await productModel.delete(3);
  });

  afterAll(async () => {
    await productModel.delete(testProduct.id);
    await productModel.delete(1); // Assuming the id of the new product created in the test is 1
  });
});

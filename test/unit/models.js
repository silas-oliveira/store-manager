const sinon = require('sinon');
const { expect } = require('chai');
const productRegistration = require('../../models/productRegistration');
const connection = require('../../models/connection');

describe('Cadastro de produtos', () => {
  describe('Verifica se possui o campo "name" existe, na requisição', () => {

    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }])
    });

    after(() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const response = await productRegistration.create('Matheus Bolado', 1);

      expect(response).to.be.equal(1)
    });
  });
  describe('Verifica se o campo name está presente na requisição', () => {
    const payload = { name: 'Vitao' }
    before(() => {
      sinon.stub(connection, "execute").resolves(payload)
    });

    after(async() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const [response] = await productRegistration.productsName('Vitao');
      console.log(response);

      expect(response).to.be.equal(payload);
    });
  });

  describe('Verifica se é possivel fazer uma busca pelo id', () => {
    const payload = 1
    before(() => {
      sinon.stub(connection, "execute").resolves([payload])
    });

    after(async() => {
      connection.execute.restore();
    });
    it('é possivel buscar pelo id', async () => {
      const response = await productRegistration.getById([payload]);
      console.log(response);
      expect(response).to.be.equal(payload);
    });
  });

  describe('Verifica se é possivel buscar todos os produtos', () => {
    // const payload 
    before(() => {
      sinon.stub(connection, "execute").resolves()
    });

    after(async() => {
      connection.execute.restore();
    });
    it('é possivel buscar pelo id', async () => {
      const response = await productRegistration.getAllProducts();
      console.log(response);

      expect(response).to.be.equal();
    });
  });
});



